// engine.js — Apple-grade Tinder Spaced Repetition Engine for Denis
(function () {
  const STORAGE_KEY = "english_tinder_trainer_v1";

  // State
  let state = {
    activeTopic: "all",
    queue: [],
    currentIndex: 0,
    isRevealed: false,
    streak: 0,
    history: [] // [{ cardId, topic, isCorrect, timestamp }]
  };

  // --- Sound & Haptics (Chitopus-inspired Web Audio synthesis) ---
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx && typeof window !== "undefined") {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
        if (navigator.audioSession) {
          try { navigator.audioSession.type = "ambient"; } catch (e) {}
        }
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "tap") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      } else if (type === "reveal") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.06); // A5
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "wrong") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.09);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch (e) {}

    // Haptic pulse if supported
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      if (type === "success") navigator.vibrate(15);
      else if (type === "wrong") navigator.vibrate([25, 40, 25]);
      else navigator.vibrate(8);
    }
  }

  // --- Persistence ---
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.history) state.history = parsed.history;
        if (parsed.streak) state.streak = parsed.streak;
      }
    } catch (e) {
      console.warn("Could not load trainer state:", e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          history: state.history,
          streak: state.streak
        })
      );
    } catch (e) {
      console.warn("Could not save trainer state:", e);
    }
  }

  function getCardStats() {
    const stats = {};
    state.history.forEach(item => {
      if (!stats[item.cardId]) {
        stats[item.cardId] = { correct: 0, wrong: 0, lastResult: null };
      }
      if (item.isCorrect) stats[item.cardId].correct++;
      else stats[item.cardId].wrong++;
      stats[item.cardId].lastResult = item.isCorrect;
    });
    return stats;
  }

  function buildQueue(topicFilter = "all") {
    state.activeTopic = topicFilter;
    const allCards = window.ENGLISH_CARDS_DATA || [];
    const cardStats = getCardStats();

    let filtered = [];
    if (topicFilter === "all") {
      filtered = [...allCards];
    } else if (topicFilter === "errors") {
      filtered = allCards.filter(c => {
        const s = cardStats[c.id];
        return s && (s.wrong > 0 || s.lastResult === false);
      });
      if (filtered.length === 0) {
        filtered = [...allCards];
      }
    } else {
      filtered = allCards.filter(c => c.topic === topicFilter);
    }

    // Adaptive Sort: failed cards surface first
    filtered.sort((a, b) => {
      const wa = (cardStats[a.id]?.wrong || 0) - (cardStats[a.id]?.correct || 0);
      const wb = (cardStats[b.id]?.wrong || 0) - (cardStats[b.id]?.correct || 0);
      return wb - wa + (Math.random() * 0.3 - 0.15);
    });

    state.queue = filtered;
    state.currentIndex = 0;
    state.isRevealed = false;
  }

  // --- UI Elements & Events ---
  let arenaEl, streakEl, progressFillEl, statsModalEl;

  function initUI() {
    arenaEl = document.getElementById("card-arena");
    streakEl = document.getElementById("streak-counter");
    progressFillEl = document.getElementById("progress-fill");
    statsModalEl = document.getElementById("stats-modal");

    // Dock Buttons
    const btnWrong = document.getElementById("btn-wrong");
    const btnReveal = document.getElementById("btn-reveal");
    const btnRight = document.getElementById("btn-right");

    btnWrong.addEventListener("click", () => handleAnswer(false));
    btnRight.addEventListener("click", () => handleAnswer(true));
    btnReveal.addEventListener("click", () => {
      playSound("reveal");
      toggleReveal();
    });

    // Topic filter chips
    document.querySelectorAll(".filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        playSound("tap");
        document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        buildQueue(chip.dataset.topic);
        renderCurrentCards();
      });
    });

    // Stats modal
    document.getElementById("open-stats-btn").addEventListener("click", () => {
      playSound("tap");
      openStatsModal();
    });
    document.getElementById("close-stats-btn").addEventListener("click", () => {
      playSound("tap");
      closeStatsModal();
    });
    statsModalEl.addEventListener("click", (e) => {
      if (e.target === statsModalEl) {
        playSound("tap");
        closeStatsModal();
      }
    });

    document.getElementById("export-ai-btn").addEventListener("click", () => {
      playSound("tap");
      copyAiReport();
    });
    document.getElementById("reset-btn").addEventListener("click", () => {
      playSound("wrong");
      resetProgress();
    });

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      if (statsModalEl.classList.contains("open")) return;
      if (e.key === "ArrowLeft" || e.key === "1") {
        handleAnswer(false);
      } else if (e.key === "ArrowRight" || e.key === "2") {
        handleAnswer(true);
      } else if (e.key === " " || e.key === "Enter" || e.key === "ArrowUp") {
        e.preventDefault();
        playSound("reveal");
        toggleReveal();
      }
    });

    renderCurrentCards();
  }

  function renderCurrentCards() {
    arenaEl.innerHTML = "";
    updateHeaderStats();

    if (state.currentIndex >= state.queue.length) {
      renderEmptyState();
      return;
    }

    const currentCardData = state.queue[state.currentIndex];
    const nextCardData = state.queue[state.currentIndex + 1];

    if (nextCardData) {
      const nextCard = createCardElement(nextCardData, false, state.currentIndex + 1);
      nextCard.classList.add("card-next");
      arenaEl.appendChild(nextCard);
    }

    const topCard = createCardElement(currentCardData, true, state.currentIndex);
    topCard.classList.add("card-current");
    arenaEl.appendChild(topCard);

    // Tokenize text for instant tap-to-translate
    if (window.DenisTranslator && typeof window.DenisTranslator.tokenizeAllText === "function") {
      window.DenisTranslator.tokenizeAllText(topCard);
    }

    setupDrag(topCard);

    // Update Dock Reveal Button label
    const btnReveal = document.getElementById("btn-reveal");
    if (btnReveal) {
      btnReveal.querySelector(".sublabel").textContent = state.isRevealed ? "Скрыть" : "Нажми";
    }
  }

  function createCardElement(data, isTop, index) {
    const card = document.createElement("div");
    card.className = "tinder-card";
    card.dataset.cardId = data.id;

    const total = state.queue.length;
    const currentNum = index + 1;

    card.innerHTML = `
      <div class="stamp-badge stamp-right">ЗНАЮ ✓</div>
      <div class="stamp-badge stamp-left">ОШИБКА ✕</div>

      <div class="card-header">
        <span class="card-topic-tag">${escapeHtml(data.topicTitle)}</span>
        <span class="card-index">${currentNum} / ${total}</span>
      </div>

      <div class="card-body">
        <div class="card-prompt">Задание</div>
        <div class="card-sentence">${escapeHtml(data.front)}</div>
        <div class="card-hint">💡 ${escapeHtml(data.hint)}</div>

        <div class="card-reveal-hint" id="card-tap-hint">
          <span>👆 Тапни по карточке, чтобы открыть ответ</span>
        </div>

        <div class="answer-section ${isTop && state.isRevealed ? "revealed" : ""}">
          <div class="correct-line">${formatCorrectAnswer(data.answer, data.keyPart)}</div>
          <div class="answer-translation">🇷🇺 ${escapeHtml(data.translation)}</div>

          <div class="breakdown-box">
            ${data.breakdown.steps.map(s => `<div class="step-item"><span style="color:var(--accent-cyan)">•</span> ${escapeHtml(s)}</div>`).join("")}
            ${data.breakdown.trap ? `<div class="trap-alert">⚠️ ${escapeHtml(data.breakdown.trap)}</div>` : ""}
            ${data.breakdown.rule ? `<div class="rule-pill">📌 ${escapeHtml(data.breakdown.rule)}</div>` : ""}
          </div>
        </div>
      </div>
    `;

    // Click on card body to reveal (unless clicking an interactive word)
    card.addEventListener("click", (e) => {
      if (e.target.closest(".tr-w") || e.target.closest("button") || e.target.closest("#tr-popup")) {
        return;
      }
      playSound("reveal");
      toggleReveal();
    });

    return card;
  }

  function formatCorrectAnswer(fullAnswer, keyPart) {
    if (!keyPart) return escapeHtml(fullAnswer);
    const regex = new RegExp(`(${keyPart})`, "i");
    return fullAnswer.replace(regex, `<span class="highlight">$1</span>`);
  }

  function toggleReveal() {
    state.isRevealed = !state.isRevealed;
    const topCard = arenaEl.querySelector(".card-current");
    if (!topCard) return;

    const answerSection = topCard.querySelector(".answer-section");
    const tapHint = topCard.querySelector("#card-tap-hint");

    if (answerSection) {
      answerSection.classList.toggle("revealed", state.isRevealed);
    }
    if (tapHint) {
      tapHint.style.display = state.isRevealed ? "none" : "flex";
    }

    const btnReveal = document.getElementById("btn-reveal");
    if (btnReveal) {
      btnReveal.querySelector(".sublabel").textContent = state.isRevealed ? "Скрыть" : "Нажми";
    }
  }

  function handleAnswer(isCorrect) {
    if (state.currentIndex >= state.queue.length) return;

    playSound(isCorrect ? "success" : "wrong");

    const cardData = state.queue[state.currentIndex];
    const topCard = arenaEl.querySelector(".card-current");

    state.history.push({
      cardId: cardData.id,
      topic: cardData.topic,
      isCorrect: isCorrect,
      timestamp: Date.now()
    });

    if (isCorrect) {
      state.streak++;
    } else {
      state.streak = 0;
      // Adaptive repeat: reinsert 2-3 cards later
      const reinsertIndex = Math.min(state.queue.length, state.currentIndex + 3);
      state.queue.splice(reinsertIndex, 0, cardData);
    }

    saveState();

    if (topCard) {
      topCard.style.transition = "transform 0.32s var(--ease-apple), opacity 0.28s ease";
      const exitX = isCorrect ? window.innerWidth * 1.3 : -window.innerWidth * 1.3;
      const rotate = isCorrect ? 24 : -24;
      topCard.style.transform = `translateX(${exitX}px) rotate(${rotate}deg)`;
      topCard.style.opacity = "0";

      const stamp = topCard.querySelector(isCorrect ? ".stamp-right" : ".stamp-left");
      if (stamp) stamp.style.opacity = "1";
    }

    setTimeout(() => {
      state.currentIndex++;
      state.isRevealed = false;
      renderCurrentCards();
    }, 220);
  }

  function setupDrag(card) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;

    const stampRight = card.querySelector(".stamp-right");
    const stampLeft = card.querySelector(".stamp-left");

    function onPointerDown(e) {
      if (e.target.closest(".tr-w") || e.target.closest("button") || e.target.closest("#tr-popup")) {
        return;
      }
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      currentX = 0;
      currentY = 0;
      card.style.transition = "none";
      card.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      const rotate = currentX * 0.07;
      card.style.transform = `translateX(${currentX}px) translateY(${currentY * 0.22}px) rotate(${rotate}deg)`;

      if (currentX > 20) {
        stampRight.style.opacity = Math.min(1, (currentX - 20) / 70);
        stampLeft.style.opacity = 0;
      } else if (currentX < -20) {
        stampLeft.style.opacity = Math.min(1, (-currentX - 20) / 70);
        stampRight.style.opacity = 0;
      } else {
        stampRight.style.opacity = 0;
        stampLeft.style.opacity = 0;
      }
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      try { card.releasePointerCapture(e.pointerId); } catch (err) {}

      const threshold = window.innerWidth * 0.26;
      if (currentX > threshold) {
        handleAnswer(true);
      } else if (currentX < -threshold) {
        handleAnswer(false);
      } else {
        card.style.transition = "transform 0.28s var(--ease-spring)";
        card.style.transform = "translateX(0px) translateY(0px) rotate(0deg)";
        stampRight.style.opacity = 0;
        stampLeft.style.opacity = 0;
      }
    }

    card.addEventListener("pointerdown", onPointerDown);
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerup", onPointerUp);
    card.addEventListener("pointercancel", onPointerUp);
  }

  function updateHeaderStats() {
    if (streakEl) streakEl.textContent = `🔥 ${state.streak}`;
    if (progressFillEl) {
      const total = state.queue.length || 1;
      const pct = Math.min(100, Math.round((state.currentIndex / total) * 100));
      progressFillEl.style.width = `${pct}%`;
    }
  }

  function renderEmptyState() {
    arenaEl.innerHTML = `
      <div class="deck-empty-state">
        <div class="deck-empty-icon">✨</div>
        <div class="deck-empty-title">Колода завершена!</div>
        <div class="deck-empty-desc">
          Отличная серия! Все запланированные карточки отработаны.
        </div>
        <button class="export-btn" id="restart-deck-btn" style="max-width:240px">
          🔄 Начать заново
        </button>
      </div>
    `;

    document.getElementById("restart-deck-btn").addEventListener("click", () => {
      playSound("tap");
      buildQueue(state.activeTopic);
      renderCurrentCards();
    });
  }

  function openStatsModal() {
    renderStatsContent();
    statsModalEl.classList.add("open");
  }

  function closeStatsModal() {
    statsModalEl.classList.remove("open");
  }

  function renderStatsContent() {
    const total = state.history.length;
    let correct = 0;
    const topicStats = {};

    state.history.forEach(item => {
      if (item.isCorrect) correct++;
      if (!topicStats[item.topic]) topicStats[item.topic] = { c: 0, w: 0 };
      if (item.isCorrect) topicStats[item.topic].c++;
      else topicStats[item.topic].w++;
    });

    const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

    document.getElementById("stat-total-reviews").textContent = total;
    document.getElementById("stat-accuracy").textContent = `${acc}%`;

    const topicsContainer = document.getElementById("topics-accuracy-list");
    if (topicsContainer) {
      topicsContainer.innerHTML = Object.entries(topicStats).map(([topic, s]) => {
        const sum = s.c + s.w;
        const pct = sum > 0 ? Math.round((s.c / sum) * 100) : 0;
        const color = pct >= 80 ? "var(--accent-emerald)" : pct >= 50 ? "var(--accent-amber)" : "var(--accent-ruby)";
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--hairline-soft);font-family:var(--font-mono);font-size:12.5px">
            <span style="color:var(--text)">${escapeHtml(topic)}</span>
            <span style="color:${color};font-weight:700">${pct}% (${s.c}/${sum})</span>
          </div>
        `;
      }).join("") || `<div style="color:var(--text-3);padding:12px 0;font-size:13px">Пока нет истории ответов</div>`;
    }
  }

  function copyAiReport() {
    const total = state.history.length;
    let correct = 0;
    const topicStats = {};
    const cardFails = {};

    state.history.forEach(item => {
      if (item.isCorrect) correct++;
      if (!topicStats[item.topic]) topicStats[item.topic] = { correct: 0, wrong: 0 };
      if (item.isCorrect) topicStats[item.topic].correct++;
      else {
        topicStats[item.topic].wrong++;
        cardFails[item.cardId] = (cardFails[item.cardId] || 0) + 1;
      }
    });

    const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

    let text = `# Отчет по тренировке английского (Денис)\n`;
    text += `- Дата: ${new Date().toLocaleDateString("ru-RU")} ${new Date().toLocaleTimeString("ru-RU")}\n`;
    text += `- Всего ответов: ${total}\n`;
    text += `- Общая точность: ${acc}%\n`;
    text += `- Текущая серия: ${state.streak}\n\n`;

    text += `### Точность по темам:\n`;
    for (const [topic, s] of Object.entries(topicStats)) {
      const sum = s.correct + s.wrong;
      const pct = Math.round((s.correct / sum) * 100);
      text += `- **${topic}**: ${pct}% (верно ${s.correct} из ${sum})\n`;
    }

    text += `\n### Самые частые ошибки по карточкам:\n`;
    const sortedFails = Object.entries(cardFails).sort((a, b) => b[1] - a[1]).slice(0, 7);
    if (sortedFails.length === 0) {
      text += `Ошибок не зафиксировано!\n`;
    } else {
      const allCards = window.ENGLISH_CARDS_DATA || [];
      sortedFails.forEach(([id, fails]) => {
        const card = allCards.find(c => c.id === id);
        if (card) {
          text += `- [${fails}x ош.] "${card.front}" -> Ответ: **${card.answer}** (ловушка: ${card.breakdown.trap || "грамматика"})\n`;
        }
      });
    }

    text += `\nПожалуйста, разбери мои слабые места и дай рекомендации, на что обратить внимание!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById("export-ai-btn");
        const orig = btn.innerHTML;
        btn.innerHTML = `✓ Скопировано в буфер обмена!`;
        setTimeout(() => btn.innerHTML = orig, 2000);
      });
    }
  }

  function resetProgress() {
    if (confirm("Точно сбросить всю историю ответов и статистику?")) {
      state.history = [];
      state.streak = 0;
      saveState();
      buildQueue(state.activeTopic);
      renderCurrentCards();
      renderStatsContent();
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  loadState();
  buildQueue("all");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUI);
  } else {
    initUI();
  }
})();
