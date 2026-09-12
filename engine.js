// engine.js — Движок карточек в стиле GamePass (Chitopus / BurpiOpus)
(function () {
  const STORAGE_KEY = "english_tinder_trainer_v1";

  let state = {
    activeTopic: "all",
    queue: [],
    currentIndex: 0,
    isRevealed: false,
    streak: 0,
    history: []
  };

  // --- Звуки действий (Chitopus sound engine) ---
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
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "wrong") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch (e) {}

    // Виброотклик
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      if (type === "success") navigator.vibrate(15);
      else if (type === "wrong") navigator.vibrate([25, 40, 25]);
      else navigator.vibrate(8);
    }
  }

  // --- Хранилище (надежная память навсегда) ---
  const BACKUP_KEY = "english_tinder_trainer_backup_v1";

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(BACKUP_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.history)) state.history = parsed.history;
        if (typeof parsed.streak === "number") state.streak = parsed.streak;
        if (parsed.activeTopic) state.activeTopic = parsed.activeTopic;
      }
    } catch (e) {
      console.warn("Error loading state:", e);
    }
  }

  function saveState() {
    try {
      const payload = JSON.stringify({
        history: state.history,
        streak: state.streak,
        activeTopic: state.activeTopic,
        updatedAt: Date.now()
      });
      localStorage.setItem(STORAGE_KEY, payload);
      localStorage.setItem(BACKUP_KEY, payload);
    } catch (e) {
      console.warn("Error saving state:", e);
    }
  }

  function getCardStats() {
    const stats = {};
    state.history.forEach(item => {
      if (!stats[item.cardId]) {
        stats[item.cardId] = { correct: 0, wrong: 0, lastResult: null, lastTimestamp: item.timestamp };
      }
      if (item.isCorrect) stats[item.cardId].correct++;
      else stats[item.cardId].wrong++;
      stats[item.cardId].lastResult = item.isCorrect;
      stats[item.cardId].lastTimestamp = item.timestamp;
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
      if (filtered.length === 0) filtered = [...allCards];
    } else if (topicFilter === "unseen") {
      filtered = allCards.filter(c => !cardStats[c.id]);
      if (filtered.length === 0) filtered = [...allCards];
    } else if (topicFilter === "mastered") {
      filtered = allCards.filter(c => {
        const s = cardStats[c.id];
        return s && s.correct >= 1 && s.lastResult === true;
      });
      if (filtered.length === 0) filtered = [...allCards];
    } else {
      filtered = allCards.filter(c => c.topic === topicFilter);
    }

    // Умная приоритизация очереди:
    // 1. Сначала карточки с недавними ошибками (требуют повторения прямо сейчас)
    // 2. Затем новые карточки, которые Денис еще ни разу не видел
    // 3. Затем карточки в процессе изучения
    // 4. В конце — уже освоенные карточки
    filtered.sort((a, b) => {
      const sa = cardStats[a.id];
      const sb = cardStats[b.id];

      const errA = (sa && sa.lastResult === false) ? 3 : (sa && sa.wrong > 0) ? 2 : 0;
      const errB = (sb && sb.lastResult === false) ? 3 : (sb && sb.wrong > 0) ? 2 : 0;
      if (errA !== errB) return errB - errA;

      const unseenA = !sa ? 1 : 0;
      const unseenB = !sb ? 1 : 0;
      if (unseenA !== unseenB) return unseenB - unseenA;

      const wa = (sa?.wrong || 0) - (sa?.correct || 0);
      const wb = (sb?.wrong || 0) - (sb?.correct || 0);
      return wb - wa;
    });

    state.queue = filtered;
    state.currentIndex = 0;
    state.isRevealed = false;
  }

  // --- UI ---
  let arenaEl, streakNumEl, progressBarEl, statsSheetEl;

  function initUI() {
    arenaEl = document.getElementById("card-arena");
    streakNumEl = document.getElementById("streak-num");
    progressBarEl = document.getElementById("progress-bar");
    statsSheetEl = document.getElementById("stats-sheet");

    const btnWrong = document.getElementById("btn-wrong");
    if (btnWrong) btnWrong.addEventListener("click", () => handleAnswer(false));
    const btnRight = document.getElementById("btn-right");
    if (btnRight) btnRight.addEventListener("click", () => handleAnswer(true));
    const btnReveal = document.getElementById("btn-reveal");
    if (btnReveal) {
      btnReveal.addEventListener("click", () => {
        playSound("reveal");
        toggleReveal();
      });
    }

    document.querySelectorAll(".set-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        playSound("tap");
        document.querySelectorAll(".set-chip").forEach(c => c.classList.remove("is-current"));
        chip.classList.add("is-current");
        buildQueue(chip.dataset.topic);
        renderCurrentCards();
      });
    });

    document.getElementById("open-stats-btn").addEventListener("click", () => {
      playSound("tap");
      openStatsSheet();
    });
    statsSheetEl.addEventListener("click", (e) => {
      if (e.target === statsSheetEl || e.target.classList.contains("sheet-grip")) {
        playSound("tap");
        closeStatsSheet();
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

    document.addEventListener("keydown", (e) => {
      if (statsSheetEl.classList.contains("open")) return;
      const topCard = arenaEl.querySelector(".card-current");
      if (!topCard) return;

      const isAnswered = topCard.dataset.answered === "true";

      // Если карточка уже отвечена, пробел / Enter / стрелки переходят к следующей
      if (isAnswered) {
        if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
          e.preventDefault();
          playSound("tap");
          advanceCard(topCard.dataset.lastAnswer !== "false");
          return;
        }
      }

      // Горячие клавиши 1, 2, 3, 4 для выбора вариантов A, B, C, D
      const optionBtns = topCard.querySelectorAll(".option-btn");
      if (!isAnswered && optionBtns.length > 0) {
        if (e.key === "1" || e.key.toLowerCase() === "a") {
          e.preventDefault();
          if (optionBtns[0]) optionBtns[0].click();
          return;
        }
        if (e.key === "2" || e.key.toLowerCase() === "b") {
          e.preventDefault();
          if (optionBtns[1]) optionBtns[1].click();
          return;
        }
        if (e.key === "3" || e.key.toLowerCase() === "c") {
          e.preventDefault();
          if (optionBtns[2]) optionBtns[2].click();
          return;
        }
        if (e.key === "4" || e.key.toLowerCase() === "d") {
          e.preventDefault();
          if (optionBtns[3]) optionBtns[3].click();
          return;
        }
      }

      if (e.key === "ArrowLeft") {
        handleAnswer(false);
      } else if (e.key === "ArrowRight") {
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

    if (window.DenisTranslator && typeof window.DenisTranslator.tokenizeAllText === "function") {
      window.DenisTranslator.tokenizeAllText(topCard);
    }

    setupDrag(topCard);

    const revealLabel = document.getElementById("reveal-btn-label");
    if (revealLabel) {
      revealLabel.textContent = state.isRevealed ? "Скрыть" : "👁️ Ответ";
    }
  }

  function createCardElement(data, isTop, index) {
    const card = document.createElement("div");
    card.className = "tinder-card";
    card.dataset.cardId = data.id;

    const total = state.queue.length;
    const currentNum = index + 1;

    // Слот пропуска подсвечивается акцентным цветом
    const formattedSentence = escapeHtml(data.front).replace(/___/g, `<span class="slot">___</span>`);

    // Генерация кнопок вариантов ответов
    const options = data.options || [data.keyPart];
    const isSingleCol = options.some(o => o.length > 13);
    const letters = ["A", "B", "C", "D"];
    const optionsHtml = options.map((opt, i) => `
      <button class="option-btn" type="button" data-val="${escapeHtml(opt)}" data-index="${i}">
        <span class="option-key-badge">${letters[i] || (i + 1)}</span>
        <span class="option-text">${escapeHtml(opt)}</span>
      </button>
    `).join("");

    // Статус карточки в памяти
    const cardStatsMap = getCardStats();
    const cs = cardStatsMap[data.id];
    let tagHtml = `<span class="memory-tag is-new">🆕 Новая</span>`;
    if (cs) {
      if (cs.wrong > 0 && cs.lastResult === false) {
        tagHtml = `<span class="memory-tag is-learning">🔥 Повторить (${cs.wrong} ош.)</span>`;
      } else if (cs.correct >= 2 && cs.wrong === 0) {
        tagHtml = `<span class="memory-tag is-mastered">⭐ Освоено (${cs.correct}✓)</span>`;
      } else if (cs.correct >= 1) {
        tagHtml = `<span class="memory-tag is-practicing">✓ Изучено (${cs.correct}✓)</span>`;
      } else {
        tagHtml = `<span class="memory-tag is-learning">🔥 Ошибка (${cs.wrong})</span>`;
      }
    }

    card.innerHTML = `
      <div class="stamp-badge stamp-right">ВЕРНО ✓</div>
      <div class="stamp-badge stamp-left">НЕВЕРНО ✕</div>

      <div class="card-title-row">
        <div style="display:flex;align-items:center;gap:8px;min-width:0">
          <h3 class="card-title" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(data.topicTitle)}</h3>
          ${tagHtml}
        </div>
        <span class="card-counter">${currentNum} / ${total}</span>
      </div>

      <div class="card-body">
        <div class="card-sentence">${formattedSentence}</div>
        <div class="hint-caption">💡 ${escapeHtml(data.hint)}</div>

        <div class="card-options ${isSingleCol ? "is-single-col" : ""}" id="card-options">
          ${optionsHtml}
        </div>

        <div class="answer-panel ${isTop && state.isRevealed ? "revealed" : ""}">
          <div class="correct-phrase">${formatCorrectAnswer(data.answer, data.keyPart)}</div>
          <div class="answer-translation">🇷🇺 ${escapeHtml(data.translation)}</div>

          <div class="breakdown-strip">
            ${data.breakdown.steps.map(s => `<div class="breakdown-item">• ${escapeHtml(s)}</div>`).join("")}
            ${data.breakdown.trap ? `<div class="breakdown-trap">⚠️ ${escapeHtml(data.breakdown.trap)}</div>` : ""}
            ${data.breakdown.rule ? `<div class="breakdown-rule">📌 ${escapeHtml(data.breakdown.rule)}</div>` : ""}
          </div>

          <div class="btn-next-wrap ${isTop && state.isRevealed ? "show" : ""}" id="btn-next-wrap">
            <button class="btn-next-card" id="btn-next-card" type="button">
              <span>Следующая карточка</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Обработка клика по вариантам ответов
    card.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (card.dataset.answered === "true") return;
        card.dataset.answered = "true";

        const chosenVal = btn.dataset.val.trim();
        const correctVal = (data.keyPart || "").trim();
        const isCorrect = chosenVal.toLowerCase() === correctVal.toLowerCase();

        // Подсветка кнопок
        if (isCorrect) {
          btn.classList.add("is-correct");
        } else {
          btn.classList.add("is-wrong");
          card.querySelectorAll(".option-btn").forEach(b => {
            if (b.dataset.val.trim().toLowerCase() === correctVal.toLowerCase()) {
              b.classList.add("is-correct");
            } else if (b !== btn) {
              b.classList.add("is-dimmed");
            }
          });
        }

        if (isCorrect) {
          card.querySelectorAll(".option-btn").forEach(b => {
            if (b !== btn) b.classList.add("is-dimmed");
          });
        }

        // Заполнение слота в предложении
        const slotEl = card.querySelector(".slot");
        if (slotEl) {
          slotEl.textContent = isCorrect ? chosenVal : `${chosenVal} ✕ → ${correctVal} ✓`;
          slotEl.style.color = isCorrect ? "var(--color-success)" : "var(--color-danger)";
          slotEl.style.borderColor = isCorrect ? "var(--color-success)" : "var(--color-danger)";
        }

        // Запись в статистику и интервальное повторение
        recordAnswer(isCorrect, data);

        // Раскрытие разбора
        state.isRevealed = true;
        const answerPanel = card.querySelector(".answer-panel");
        if (answerPanel) answerPanel.classList.add("revealed");

        const tapCue = card.querySelector("#card-tap-cue");
        if (tapCue) tapCue.style.display = "none";

        const nextWrap = card.querySelector(".btn-next-wrap");
        if (nextWrap) nextWrap.classList.add("show");

        const revealLabel = document.getElementById("reveal-btn-label");
        if (revealLabel) revealLabel.textContent = "Скрыть";

        // Токенизация для переводчика
        if (window.DenisTranslator && typeof window.DenisTranslator.tokenizeAllText === "function") {
          window.DenisTranslator.tokenizeAllText(answerPanel);
        }
      });
    });

    // Кнопка «Следующая карточка»
    const nextBtn = card.querySelector(".btn-next-card");
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playSound("tap");
        advanceCard(card.dataset.lastAnswer !== "false");
      });
    }

    card.addEventListener("click", (e) => {
      if (e.target.closest(".tr-w") || e.target.closest("button") || e.target.closest("#tr-popup") || e.target.closest(".option-btn")) {
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
    return fullAnswer.replace(regex, `<span class="target-highlight">$1</span>`);
  }

  function toggleReveal() {
    state.isRevealed = !state.isRevealed;
    const topCard = arenaEl.querySelector(".card-current");
    if (!topCard) return;

    const answerPanel = topCard.querySelector(".answer-panel");
    const tapCue = topCard.querySelector("#card-tap-cue");
    const nextWrap = topCard.querySelector(".btn-next-wrap");

    if (answerPanel) answerPanel.classList.toggle("revealed", state.isRevealed);
    if (tapCue) tapCue.style.display = state.isRevealed ? "none" : "flex";
    if (nextWrap) nextWrap.classList.toggle("show", state.isRevealed);

    const revealLabel = document.getElementById("reveal-btn-label");
    if (revealLabel) {
      revealLabel.textContent = state.isRevealed ? "Скрыть" : "👁️ Ответ";
    }
  }

  function recordAnswer(isCorrect, cardData) {
    playSound(isCorrect ? "success" : "wrong");

    const topCard = arenaEl.querySelector(".card-current");
    if (topCard) {
      topCard.dataset.lastAnswer = isCorrect ? "true" : "false";
    }

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
      const reinsertIndex = Math.min(state.queue.length, state.currentIndex + 3);
      state.queue.splice(reinsertIndex, 0, cardData);
    }

    saveState();
    updateHeaderStats();
  }

  function advanceCard(isCorrect) {
    if (state.currentIndex >= state.queue.length) return;

    const topCard = arenaEl.querySelector(".card-current");
    if (topCard) {
      topCard.style.transition = "transform 260ms var(--ease), opacity 220ms ease";
      const exitX = isCorrect ? window.innerWidth * 1.25 : -window.innerWidth * 1.25;
      const rotate = isCorrect ? 20 : -20;
      topCard.style.transform = `translateX(${exitX}px) rotate(${rotate}deg)`;
      topCard.style.opacity = "0";

      const stamp = topCard.querySelector(isCorrect ? ".stamp-right" : ".stamp-left");
      if (stamp) stamp.style.opacity = "1";
    }

    setTimeout(() => {
      state.currentIndex++;
      state.isRevealed = false;
      renderCurrentCards();
    }, 200);
  }

  function handleAnswer(isCorrect) {
    if (state.currentIndex >= state.queue.length) return;

    const cardData = state.queue[state.currentIndex];
    const topCard = arenaEl.querySelector(".card-current");
    if (!topCard) return;

    // Если карточка еще не отвечена, отмечаем правильный/неправильный ответ и раскрываем разбор
    if (topCard.dataset.answered !== "true") {
      topCard.dataset.answered = "true";
      recordAnswer(isCorrect, cardData);

      const correctVal = (cardData.keyPart || "").trim().toLowerCase();
      topCard.querySelectorAll(".option-btn").forEach(b => {
        if (b.dataset.val.trim().toLowerCase() === correctVal) {
          b.classList.add("is-correct");
        } else if (!isCorrect) {
          b.classList.add("is-dimmed");
        }
      });

      state.isRevealed = true;
      const answerPanel = topCard.querySelector(".answer-panel");
      if (answerPanel) answerPanel.classList.add("revealed");

      const tapCue = topCard.querySelector("#card-tap-cue");
      if (tapCue) tapCue.style.display = "none";

      const nextWrap = topCard.querySelector(".btn-next-wrap");
      if (nextWrap) nextWrap.classList.add("show");

      const revealLabel = document.getElementById("reveal-btn-label");
      if (revealLabel) revealLabel.textContent = "Скрыть";

      return;
    }

    // Если карточка уже была отвечена — свайпаем и идем к следующей
    advanceCard(topCard.dataset.lastAnswer !== "false");
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

      const rotate = currentX * 0.06;
      card.style.transform = `translateX(${currentX}px) translateY(${currentY * 0.2}px) rotate(${rotate}deg)`;

      if (currentX > 20) {
        stampRight.style.opacity = Math.min(1, (currentX - 20) / 60);
        stampLeft.style.opacity = 0;
      } else if (currentX < -20) {
        stampLeft.style.opacity = Math.min(1, (-currentX - 20) / 60);
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

      const threshold = window.innerWidth * 0.25;
      if (currentX > threshold) {
        handleAnswer(true);
      } else if (currentX < -threshold) {
        handleAnswer(false);
      } else {
        card.style.transition = "transform 260ms var(--ease)";
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
    if (streakNumEl) streakNumEl.textContent = state.streak;
    if (progressBarEl) {
      const total = state.queue.length || 1;
      const pct = Math.min(100, Math.round((state.currentIndex / total) * 100));
      progressBarEl.style.width = `${pct}%`;
    }
  }

  function renderEmptyState() {
    arenaEl.innerHTML = `
      <div class="finish-wrap">
        <div class="finish-icon">✨</div>
        <h2 class="finish-title">Колода пройдена!</h2>
        <p class="finish-desc">
          Все карточки отработаны. Ошибки были повторены интервальным алгоритмом.
        </p>
        <button class="btn btn-primary" id="restart-deck-btn" style="min-width:200px;margin-top:8px">
          Начать заново
        </button>
      </div>
    `;

    document.getElementById("restart-deck-btn").addEventListener("click", () => {
      playSound("tap");
      buildQueue(state.activeTopic);
      renderCurrentCards();
    });
  }

  function openStatsSheet() {
    renderStatsContent();
    statsSheetEl.classList.add("open");
  }

  function closeStatsSheet() {
    statsSheetEl.classList.remove("open");
  }

  function renderStatsContent() {
    const total = state.history.length;
    let correct = 0;
    const topicStats = {};
    const allCards = window.ENGLISH_CARDS_DATA || [];
    const cardStats = getCardStats();

    let masteredCount = 0;
    allCards.forEach(c => {
      const s = cardStats[c.id];
      if (s && s.correct >= 1 && s.lastResult === true) masteredCount++;
    });

    state.history.forEach(item => {
      if (item.isCorrect) correct++;
      if (!topicStats[item.topic]) topicStats[item.topic] = { c: 0, w: 0 };
      if (item.isCorrect) topicStats[item.topic].c++;
      else topicStats[item.topic].w++;
    });

    const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

    const totalEl = document.getElementById("stat-total-reviews");
    if (totalEl) totalEl.textContent = total;
    const accEl = document.getElementById("stat-accuracy");
    if (accEl) accEl.textContent = `${acc}%`;
    const mastEl = document.getElementById("stat-mastered");
    if (mastEl) mastEl.textContent = `${masteredCount} / ${allCards.length}`;

    const topicsContainer = document.getElementById("topics-accuracy-list");
    if (topicsContainer) {
      topicsContainer.innerHTML = Object.entries(topicStats).map(([topic, s]) => {
        const sum = s.c + s.w;
        const pct = sum > 0 ? Math.round((s.c / sum) * 100) : 0;
        const color = pct >= 80 ? "var(--color-success)" : pct >= 50 ? "var(--accent-1)" : "var(--color-danger)";
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--hairline-soft);font-size:13.5px">
            <span style="color:var(--text);font-weight:550">${escapeHtml(topic)}</span>
            <span style="color:${color};font-weight:700;font-variant-numeric:tabular-nums">${pct}% (${s.c}/${sum})</span>
          </div>
        `;
      }).join("") || `<div style="color:var(--text-3);padding:10px 0;font-size:13.5px">Пока нет истории ответов</div>`;
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
