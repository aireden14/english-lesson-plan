// engine.js — Движок карточек в стиле GamePass (Chitopus / BurpiOpus)
(function () {
  const STORAGE_KEY = "english_tinder_trainer_v1";

  let state = {
    mode: "rules", // "rules" (Вопросы по правилам) | "examples" (Примеры в речи)
    activeTopic: "all",
    queue: [],
    currentIndex: 0,
    isRevealed: false,
    streak: 0,
    history: []
  };

  function getCurrentDataset() {
    if (state.mode === "examples") {
      return window.ENGLISH_CARDS_DATA || [];
    }
    return window.ENGLISH_RULES_DATA || [];
  }

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
        if (parsed.mode === "rules" || parsed.mode === "examples") state.mode = parsed.mode;
      }
    } catch (e) {
      console.warn("Error loading state:", e);
    }
  }

  function saveState() {
    try {
      const payload = JSON.stringify({
        mode: state.mode,
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
    const allCards = getCurrentDataset();
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
  let stageEl, streakNumEl, counterNumEl, progressBarEl, statsSheetEl;

  function updateModeUI() {
    document.querySelectorAll("[data-mode]").forEach(btn => {
      const isActive = btn.dataset.mode === state.mode;
      btn.classList.toggle("is-active", isActive);
      if (btn.hasAttribute("aria-selected")) {
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
      }
    });
  }

  function setTrainerMode(newMode) {
    if (state.mode === newMode) return;
    state.mode = newMode;
    saveState();
    updateModeUI();
    buildQueue(state.activeTopic);
    renderCurrentCard();
  }

  function initUI() {
    stageEl = document.getElementById("quiz-stage");
    streakNumEl = document.getElementById("streak-num");
    counterNumEl = document.getElementById("counter-num");
    progressBarEl = document.getElementById("progress-bar");
    statsSheetEl = document.getElementById("stats-sheet");

    document.querySelectorAll("[data-mode]").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("tap");
        setTrainerMode(btn.dataset.mode);
      });
    });
    updateModeUI();

    document.querySelectorAll(".set-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        playSound("tap");
        document.querySelectorAll(".set-chip").forEach(c => c.classList.remove("is-current"));
        chip.classList.add("is-current");
        buildQueue(chip.dataset.topic);
        renderCurrentCard();
        closeStatsSheet();
      });
    });

    const sheetCloseBtn = document.getElementById("sheet-close-btn");
    if (sheetCloseBtn) {
      sheetCloseBtn.addEventListener("click", () => {
        playSound("tap");
        closeStatsSheet();
      });
    }

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

    // Горячие клавиши (1, 2, 3, 4, A, B, C, D для вариантов; Space / Enter для перехода дальше)
    document.addEventListener("keydown", (e) => {
      if (statsSheetEl && statsSheetEl.classList.contains("open")) {
        if (e.key === "Escape") closeStatsSheet();
        return;
      }
      const activeCard = stageEl ? stageEl.querySelector(".quiz-card") : null;
      if (!activeCard) return;

      const isAnswered = activeCard.dataset.answered === "true";

      if (isAnswered) {
        if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight") {
          e.preventDefault();
          advanceNextCard();
          return;
        }
      } else {
        const optionBtns = activeCard.querySelectorAll(".option-btn");
        if (optionBtns.length > 0) {
          const keyLower = e.key.toLowerCase();
          let idx = -1;
          if (e.key === "1" || keyLower === "a") idx = 0;
          else if (e.key === "2" || keyLower === "b") idx = 1;
          else if (e.key === "3" || keyLower === "c") idx = 2;
          else if (e.key === "4" || keyLower === "d") idx = 3;

          if (idx >= 0 && optionBtns[idx]) {
            e.preventDefault();
            optionBtns[idx].click();
            return;
          }
        }
      }
    });

    renderCurrentCard();
  }

  // Перемешивание массива (Fisher-Yates) для случайного порядка вариантов ответов
  function shuffleArray(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Генератор детального контекстного промпта для ChatGPT / Claude / DeepSeek
  function buildChatGptPrompt(cardData, chosenOption, isCorrect) {
    const correctOption = (cardData.keyPart || "").trim();
    const chosen = (chosenOption || "").trim();
    const topic = cardData.topicTitle || cardData.topic || "Грамматика английского";
    const hint = cardData.hint || "";
    const isSentence = cardData.front && cardData.front.includes("___");

    let prompt = `Привет! Я изучаю практический разговорный английский язык (уровень A2–B1). Разбери, пожалуйста, вопрос из моего тренажёра по грамматике и логике языка.\n\n`;
    prompt += `📌 Тема: ${topic}\n`;

    if (isSentence) {
      const sentenceBlank = (cardData.front || "").replace(/___/g, "[ ___ ]");
      const sentenceCorrect = (cardData.front || "").replace(/___/g, correctOption);
      const sentenceChosen = (cardData.front || "").replace(/___/g, chosen);
      prompt += `📝 Предложение с пропуском: ${sentenceBlank}\n`;
      if (hint) prompt += `💡 Контекст / подсказка: ${hint}\n`;
      if (cardData.translation) prompt += `🇷🇺 Перевод предложения: «${cardData.translation}»\n\n`;
      prompt += `👉 Мой выбор: «${chosen}» (получилось: ${sentenceChosen})\n`;
      prompt += `✅ Правильный ответ: «${correctOption}» (правильно: ${sentenceCorrect})\n\n`;
    } else {
      prompt += `❓ Вопрос по правилу / ситуации: «${cardData.front}»\n`;
      if (hint) prompt += `💡 Подсказка: ${hint}\n`;
      if (cardData.translation) prompt += `📖 Суть правила: ${cardData.translation}\n\n`;
      prompt += `👉 Мой выбор: «${chosen}»\n`;
      prompt += `✅ Правильный ответ: «${correctOption}»\n\n`;
    }

    if (isCorrect) {
      prompt += `Я ответил верно, но хочу разложить эту конструкцию по полочкам и глубже закрепить:\n`;
      prompt += `1. Почему именно вариант «${correctOption}» здесь правильный? Какая глубинная логика у носителей языка?\n`;
      prompt += `2. В каких похожих жизненных ситуациях русскоговорящие чаще всего путаются и ошибаются?\n`;
      prompt += `3. Приведи 3–4 живых примера из реального разговорного английского (с переводом на русский).\n`;
      prompt += `4. Дай одну простую мнемонику или ориентир, чтобы мгновенно выбирать правильный вариант без раздумий.`;
    } else {
      prompt += `Я допустил ошибку, выбрав вариант «${chosen}». Разбери, пожалуйста, подробно:\n`;
      prompt += `1. ПОЧЕМУ вариант «${correctOption}» здесь правильный, а мой выбор «${chosen}» — ошибка? В чём грамматическая логика языка?\n`;
      prompt += `2. КОГДА и в каких жизненных ситуациях НА САМОМ ДЕЛЕ применяется мой вариант «${chosen}»? Приведи 2–3 наглядных примера с переводом, где «${chosen}» был бы абсолютно уместен.\n`;
      prompt += `3. Почему мозг русскоговорящего человека подталкивает сказать именно «${chosen}» (в чём заключается языковая ловушка / интерференция с русским)?\n`;
      prompt += `4. Приведи 3–4 практических примера использования правильного варианта «${correctOption}» в реальных диалогах.\n`;
      prompt += `5. Сформулируй одно простое правило (в 1 предложение), чтобы я больше никогда не путал «${chosen}» и «${correctOption}».`;
    }

    prompt += `\n\nОтветь простым, живым русским языком, понятно, наглядно и без занудства, как топовый личный ментор по английскому.`;
    return prompt;
  }

  // Безопасное копирование текста в буфер обмена
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) resolve();
        else reject(new Error("Copy command failed"));
      } catch (err) {
        reject(err);
      }
    });
  }

  function renderCurrentCard() {
    if (!stageEl) return;
    stageEl.innerHTML = "";
    updateHeaderStats();

    if (state.currentIndex >= state.queue.length) {
      renderEmptyState();
      return;
    }

    const data = state.queue[state.currentIndex];
    const card = document.createElement("div");
    card.className = "quiz-card";
    card.dataset.cardId = data.id;

    // Вопрос или предложение со слотом пропуска
    const isSentenceWithBlank = data.front && data.front.includes("___");
    const formattedSentence = isSentenceWithBlank
      ? escapeHtml(data.front).replace(/___/g, `<span class="slot">___</span>`)
      : escapeHtml(data.front);

    // Статус в памяти
    const cardStatsMap = getCardStats();
    const cs = cardStatsMap[data.id];
    let tagHtml = `<span class="memory-tag is-new">🆕 Новая</span>`;
    if (cs) {
      if (cs.wrong > 0 && cs.lastResult === false) {
        tagHtml = `<span class="memory-tag is-learning">🔥 Повторить (${cs.wrong})</span>`;
      } else if (cs.correct >= 2 && cs.wrong === 0) {
        tagHtml = `<span class="memory-tag is-mastered">⭐ Освоено (${cs.correct}✓)</span>`;
      } else if (cs.correct >= 1) {
        tagHtml = `<span class="memory-tag is-practicing">✓ Изучено (${cs.correct}✓)</span>`;
      } else {
        tagHtml = `<span class="memory-tag is-learning">🔥 Ошибка (${cs.wrong})</span>`;
      }
    }

    // Варианты ответов (перемешиваем случайно, чтобы правильный ответ не был всегда первым)
    const rawOptions = (data.options && data.options.length) ? data.options.slice() : [data.keyPart];
    const options = shuffleArray(rawOptions);
    const isSingleCol = options.some(o => o.length > 14);
    const letters = ["A", "B", "C", "D"];
    const optionsHtml = options.map((opt, i) => `
      <button class="option-btn" type="button" data-val="${escapeHtml(opt)}" data-index="${i}">
        <span class="option-key-badge">${letters[i] || (i + 1)}</span>
        <span class="option-text">${escapeHtml(opt)}</span>
      </button>
    `).join("");

    card.innerHTML = `
      <div class="quiz-card-meta">
        <div style="display:flex;align-items:center;gap:8px;min-width:0">
          <h3 class="quiz-topic-title">${escapeHtml(data.topicTitle)}</h3>
          ${tagHtml}
        </div>
      </div>

      <div class="quiz-card-hero">
        <div class="quiz-sentence ${isSentenceWithBlank ? "" : "is-rule-question"}" id="quiz-sentence">${formattedSentence}</div>
        ${data.hint ? `
          <div class="quiz-hint-wrap">
            <button type="button" class="quiz-hint-btn" id="hint-toggle-btn" title="Показать подсказку к заданию">
              <span class="hint-icon">💡</span>
              <span class="hint-label">Подсказка</span>
            </button>
            <div class="quiz-hint-text" id="quiz-hint-text">
              💡 ${escapeHtml(data.hint)}
            </div>
          </div>
        ` : ""}
      </div>

      <div class="quiz-options-grid ${isSingleCol ? "is-single-col" : ""}" id="quiz-options-grid">
        ${optionsHtml}
      </div>

      <div class="quiz-feedback-drawer" id="quiz-feedback-drawer">
        <div class="feedback-ai-actions" id="feedback-ai-actions">
          <a class="btn-chatgpt" id="chatgpt-btn" href="#" target="_blank" rel="noopener noreferrer">
            <svg class="chatgpt-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Пояснить мне это в ChatGPT</span>
            <span class="btn-chatgpt-arrow">↗</span>
          </a>
          <button type="button" class="btn-copy-prompt" id="copy-prompt-btn" title="Скопировать готовый промпт для Claude / DeepSeek">
            <span class="copy-icon">📋</span>
          </button>
        </div>

        <button class="feedback-btn-next" id="feedback-btn-next" type="button">
          <span>Следующий вопрос</span>
          <span>→</span>
        </button>
      </div>
    `;

    // Логика кнопки-лампочки для скрытия/раскрытия подсказки
    const hintBtn = card.querySelector("#hint-toggle-btn");
    const hintText = card.querySelector("#quiz-hint-text");
    if (hintBtn && hintText) {
      hintBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playSound("tap");
        const isShown = hintText.classList.toggle("is-visible");
        hintBtn.classList.toggle("is-active", isShown);
        const label = hintBtn.querySelector(".hint-label");
        if (label) {
          label.textContent = isShown ? "Скрыть подсказку" : "Подсказка";
        }
        if (isShown && window.DenisTranslator && typeof window.DenisTranslator.tokenizeAllText === "function") {
          window.DenisTranslator.tokenizeAllText(hintText);
        }
      });
    }

    // Клики по вариантам ответов
    card.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (card.dataset.answered === "true") return;
        card.dataset.answered = "true";

        const chosenVal = btn.dataset.val.trim();
        const correctVal = (data.keyPart || "").trim();
        const isCorrect = chosenVal.toLowerCase() === correctVal.toLowerCase();

        // Подсветка вариантов
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

        // Запись ответа в историю и постоянную память
        recordAnswer(isCorrect, data);

        // Формирование ссылки и промпта для ChatGPT
        const promptText = buildChatGptPrompt(data, chosenVal, isCorrect);
        const chatGptLink = card.querySelector("#chatgpt-btn");
        if (chatGptLink) {
          chatGptLink.href = "https://chatgpt.com/?q=" + encodeURIComponent(promptText);
        }

        const copyBtn = card.querySelector("#copy-prompt-btn");
        if (copyBtn) {
          copyBtn.onclick = (ev) => {
            ev.stopPropagation();
            copyToClipboard(promptText).then(() => {
              copyBtn.innerHTML = `<span>✓</span>`;
              copyBtn.classList.add("is-copied");
              setTimeout(() => {
                copyBtn.innerHTML = `<span class="copy-icon">📋</span>`;
                copyBtn.classList.remove("is-copied");
              }, 2000);
            }).catch(() => {
              copyBtn.innerHTML = `<span>✕</span>`;
            });
          };
        }

        // Показ кнопок действий
        const drawer = card.querySelector(".quiz-feedback-drawer");
        if (drawer) {
          drawer.classList.add("show");
        }
      });
    });

    // Кнопка перехода к следующему вопросу
    const nextBtn = card.querySelector("#feedback-btn-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        playSound("tap");
        advanceNextCard();
      });
    }

    stageEl.appendChild(card);

    // Токенизация слов предложения для словаря
    if (window.DenisTranslator && typeof window.DenisTranslator.tokenizeAllText === "function") {
      window.DenisTranslator.tokenizeAllText(card.querySelector(".quiz-card-hero"));
    }
  }

  function recordAnswer(isCorrect, cardData) {
    playSound(isCorrect ? "success" : "wrong");

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
      // При ошибке карточка вернётся через 3 шага для повторения
      const reinsertIndex = Math.min(state.queue.length, state.currentIndex + 3);
      state.queue.splice(reinsertIndex, 0, cardData);
    }

    saveState();
    updateHeaderStats();
  }

  function advanceNextCard() {
    if (state.currentIndex >= state.queue.length) return;
    playSound("tap");
    state.currentIndex++;
    renderCurrentCard();
  }

  function updateHeaderStats() {
    if (streakNumEl) streakNumEl.textContent = state.streak;
    const total = state.queue.length || 1;
    const currentNum = Math.min(state.currentIndex + 1, total);
    if (counterNumEl) counterNumEl.textContent = `${currentNum} / ${total}`;
    if (progressBarEl) {
      const pct = Math.min(100, Math.round((state.currentIndex / total) * 100));
      progressBarEl.style.width = `${pct}%`;
    }
  }

  function renderEmptyState() {
    if (counterNumEl) counterNumEl.textContent = `${state.queue.length} / ${state.queue.length}`;
    if (progressBarEl) progressBarEl.style.width = `100%`;
    if (!stageEl) return;
    stageEl.innerHTML = `
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
      renderCurrentCard();
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
    const allCards = getCurrentDataset();
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
      const allCards = [...(window.ENGLISH_RULES_DATA || []), ...(window.ENGLISH_CARDS_DATA || [])];
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
      renderCurrentCard();
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
