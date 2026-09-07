// translator.js — Universal click-to-translate & phrase translator for Denis
(function () {
  const DICT = {
    // Lesson 4 Sentences & QA
    "my best friend is valery and he is in cyprus right now": "Мой лучший друг — Валерий, и он сейчас на Кипре.",
    "my laptop is fast and reliable for complex ui design": "Мой ноутбук быстрый и надежный для сложного UI-дизайна.",
    "the weather in cyprus is warm and sunny today": "Погода на Кипре сегодня теплая и солнечная.",
    "these two developers are very talented and professional": "Эти двое разработчиков очень талантливые и профессиональные.",
    "my parents are in kazakhstan and they are doing well": "Мои родители в Казахстане, и у них всё хорошо.",
    "bali is an indonesian island with a vibrant digital nomad community": "Бали — это индонезийский остров с ярким сообществом цифровых кочевников.",
    "our clients are from europe and the united states": "Наши клиенты из Европы и Соединенных Штатов.",
    "my apartment is spacious and the rooms are very bright": "Моя квартира просторная, и комнаты очень светлые.",
    "i am not a beginner in design i am an experienced art director": "Я не новичок в дизайне; я опытный арт-директор.",
    "cyprus isnt cheap but it is safe and comfortable": "Кипр не дешевый, но он безопасный и комфортный.",
    "my friends arent in bali yet but they are planning to visit": "Мои друзья еще не на Бали, но они планируют приехать в гости.",
    "the gym isnt far from my house it is only five minutes away": "Спортзал недалеко от моего дома; он всего в пяти минутах ходьбы.",
    "we arent tired we are ready to continue practicing": "Мы не устали; мы готовы продолжать тренироваться!",
    "who is your best friend and what is he like": "Кто твой лучший друг и какой он человек?",
    "what is your daily work as a designer": "В чем заключается твоя ежедневная работа как дизайнера?",
    "why is bali attractive for your lifestyle": "Почему Бали привлекателен для твоего образа жизни?",
    "where are your favorite places in cyprus": "Где твои любимые места на Кипре?",
    "what is your favorite story game and why": "Какая твоя любимая сюжетная игра и почему?",
    "the beaches are wonderful and the mountain villages are very peaceful on weekends": "Пляжи прекрасны, а горные деревушки очень спокойны по выходным.",
    "my job is digital product design my responsibilities are creating user interfaces mobile apps and brand assets": "Моя работа — дизайн цифровых продуктов. Мои обязанности — создание интерфейсов, мобильных приложений и брендинга.",
    "bali is attractive because the ocean is close the lifestyle is calm and there are many creative people": "Бали привлекателен тем, что океан близко, ритм жизни спокойный и вокруг много творческих людей.",

    // Homework 20 Sentences
    "two men in our team are senior product designers": "Двое мужчин в нашей команде — ведущие продуктовые дизайнеры.",
    "three women work on the new user interface project": "Три женщины работают над новым проектом пользовательского интерфейса.",
    "my friends have two children a boy and a girl": "У моих друзей двое детей: мальчик и девочка.",
    "there are many creative people living and working in bali": "На Бали живет и работает много творческих людей.",
    "i always brush my teeth in the morning and before sleep": "Я всегда чищу зубы утром и перед сном.",
    "my feet hurt after walking ten kilometers in the city": "У меня болят ноги после десяти километров ходьбы по городу.",
    "i dont like mice but our cat loves chasing them": "Я не люблю мышей, но наша кошка обожает за ними гоняться.",
    "people say that cats have nine lives": "Говорят, что у кошек девять жизней.",
    "when i traveled to the mountains i saw a lot of white sheep": "Когда я путешествовал в горы, я видел много белых овец.",
    "there are thousands of colorful fish near the coral reef": "Возле кораллового рифа тысячи разноцветных рыб.",
    "could you please give me two sharp knives for cooking": "Не могли бы вы дать мне два острых ножа для готовки?",
    "i have three wooden shelves on the wall for my books and equipment": "У меня на стене три деревянные полки для книг и оборудования.",
    "in bali you can see huge green palm leaves everywhere": "На Бали повсюду можно увидеть огромные зеленые пальмовые листья.",
    "please cut the pizza into two equal halves": "Пожалуйста, разрежьте пиццу на две равные половинки.",
    "the security camera recorded two thieves at night": "Камера наблюдения зафиксировала двух воров ночью.",
    "a flock of wild geese flew across the sky": "Стая диких гусей пролетела по небу.",
    "i watched two great detective series on netflix recently": "Недавно я посмотрел два отличных детективных сериала на Netflix.",
    "several commercial aircraft landed at the international airport": "Несколько коммерческих самолетов приземлились в международном аэропорту.",
    "farmers in traditional villages still work with oxen": "Фермеры в традиционных деревнях до сих пор работают с волами.",
    "strong businesses know how to navigate global economic crises": "Сильные компании знают, как преодолевать мировые экономические кризисы.",

    // Core Nouns & Irregular pairs
    "man": "мужчина", "men": "мужчины (мн. ч.)",
    "woman": "женщина", "women": "женщины (мн. ч., произносится [вúмин])",
    "child": "ребенок", "children": "дети (мн. ч.)",
    "person": "человек", "people": "люди / народ (мн. ч.)",
    "tooth": "зуб", "teeth": "зубы (мн. ч.)",
    "foot": "нога / ступня / фут", "feet": "ступни / ноги / футы (мн. ч.)",
    "mouse": "мышь", "mice": "мыши (мн. ч.)",
    "life": "жизнь", "lives": "жизни (мн. ч., f меняется на ves)",
    "sheep": "овца / овцы (не меняется во мн. ч.)",
    "fish": "рыба / рыбы (в обычной речи не меняется)",
    "knife": "нож", "knives": "ножи (мн. ч., f меняется на ves)",
    "shelf": "полка", "shelves": "полки (мн. ч., f меняется на ves)",
    "leaf": "лист растения", "leaves": "листья (мн. ч., f меняется на ves)",
    "half": "половина", "halves": "половинки (мн. ч., f меняется на ves)",
    "thief": "вор", "thieves": "воры (мн. ч., f меняется на ves)",
    "goose": "гусь", "geese": "гуси (мн. ч., oo меняется на ee)",
    "series": "сериал / сериалы (всегда оканчивается на s, не меняется)",
    "aircraft": "самолет / авиация (не меняется во мн. ч.)",
    "ox": "бык / вол", "oxen": "быки / волы (древнее окончание -en)",
    "crisis": "кризис", "crises": "кризисы (мн. ч., произносится [крайсиз])",

    // Grammar & Instructions Vocabulary
    "homework": "домашняя работа", "assignment": "задание", "instructions": "инструкции",
    "instruction": "инструкция", "singular": "единственное число", "plural": "множественное число",
    "irregular": "неправильный / форма-исключение", "noun": "существительное", "nouns": "существительные",
    "verb": "глагол", "verbs": "глаголы", "pronoun": "местоимение", "pronouns": "местоимения",
    "subject": "подлежащее / субъект", "sentence": "предложение", "sentences": "предложения",
    "rule": "правило", "rules": "правила", "drill": "упражнение / отработка", "drills": "упражнения",
    "accuracy": "точность речи", "fluency": "беглость речи", "correction": "исправление ошибок",
    "mistake": "ошибка", "mistakes": "ошибки", "speaking": "говорение / устная речь",
    "listening": "аудирование / понимание на слух", "interview": "интервью / диалог",
    "practice": "практика", "blitz": "быстрый опрос / блиц", "block": "блок урока",
    "stage": "этап урока", "cockpit": "пульт управления", "curriculum": "программа обучения",
    "routine": "распорядок дня / рутина", "interrupt": "перебивать", "interruption": "перебивание",
    "praise": "похвала", "fossilize": "закреплять ошибку", "model": "образец / пример ответа",
    "question": "вопрос", "questions": "вопросы", "answer": "ответ", "answers": "ответы",
    "immediately": "немедленно / сразу", "eliminated": "устранен", "eliminating": "устранение",
    "reliable": "надежный", "complex": "сложный", "developers": "разработчики",
    "spacious": "просторный", "bright": "светлый / яркий", "beginner": "новичок / начинающий",
    "experienced": "опытный", "director": "директор", "comfortable": "удобный / комфортный",
    "gym": "спортзал", "tired": "уставший", "responsibilities": "обязанности",
    "peaceful": "мирный / спокойный", "storylines": "сюжетные линии", "exciting": "захватывающий",
    "details": "детали", "attractive": "привлекательный", "lifestyle": "образ жизни",
    "nomad": "кочевник", "community": "сообщество", "beaches": "пляжи",
    "wonderful": "прекрасные / чудесные", "weekends": "выходные", "team": "команда",
    "product": "продукт / продуктовый", "designers": "дизайнеры", "work": "работать / работа",
    "user": "пользователь", "interface": "интерфейс", "project": "проект",
    "friends": "друзья", "boy": "мальчик", "girl": "девочка", "creative": "творческий",
    "living": "живущие", "working": "работающие", "bali": "Бали", "brush": "чистить",
    "morning": "утро", "sleep": "сон / спать", "hurt": "болеть", "walking": "ходьба",
    "kilometers": "километры", "city": "город", "cat": "кошка", "loves": "любит",
    "chasing": "гоняться", "mountains": "горы", "saw": "видел", "white": "белый",
    "thousands": "тысячи", "colorful": "красочные", "coral": "коралловый", "reef": "риф",
    "sharp": "острый", "cooking": "готовка", "wooden": "деревянный", "wall": "стена",
    "books": "книги", "equipment": "оборудование", "palm": "пальма", "everywhere": "повсюду",
    "cut": "резать", "pizza": "пицца", "equal": "равный", "security": "безопасность",
    "camera": "камера", "recorded": "записала", "night": "ночь", "flock": "стая",
    "wild": "дикий", "flew": "летел", "sky": "небо", "watched": "смотрел",
    "detective": "детективный", "commercial": "коммерческий", "landed": "приземлился",
    "airport": "аэропорт", "farmers": "фермеры", "traditional": "традиционный",
    "villages": "деревни", "still": "до сих пор", "businesses": "бизнесы",
    "navigate": "преодолевать", "global": "мировой", "economic": "экономический"
  };

  const cache = {};

  function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  // Native Web Speech API
  function speakText(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.88;
      window.speechSynthesis.speak(u);
    }
  }

  // Translation: Dictionary first, Google GTX API second
  async function getTranslation(rawText) {
    const clean = normalize(rawText);
    if (!clean) return "";
    if (DICT[clean]) return DICT[clean];
    if (cache[clean]) return cache[clean];

    try {
      const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=" + encodeURIComponent(rawText);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Translation request failed");
      const data = await res.json();
      if (data && data[0]) {
        const trans = data[0].map(chunk => chunk[0]).join("");
        cache[clean] = trans;
        return trans;
      }
    } catch (e) {
      console.warn("Online translation fallback failed:", e);
    }
    return DICT[clean] || "Перевод недоступен";
  }

  // Floating Popup element
  let popup = null;
  function ensurePopup() {
    if (popup) return popup;
    popup = document.createElement("div");
    popup.id = "tr-popup";
    popup.innerHTML = `
      <div class="tr-p-header">
        <div class="tr-p-orig">
          <span id="tr-orig-text">Word</span>
        </div>
        <div class="tr-p-actions">
          <button class="tr-icon-btn" id="tr-speak-btn" title="Прослушать произношение">🔊 Слушать</button>
          <button class="tr-icon-btn" id="tr-copy-btn" title="Скопировать перевод">📋 Копировать</button>
          <button class="tr-icon-btn" id="tr-close-btn" title="Закрыть (Esc)">✕</button>
        </div>
      </div>
      <div class="tr-p-trans" id="tr-trans-text">Перевод...</div>
      <div class="tr-p-hint">
        <span>💡 Кликни на любое слово или выдели фразу мышкой/пальцем</span>
        <span id="tr-status-tag">English → Русский</span>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("tr-close-btn").addEventListener("click", hidePopup);
    document.getElementById("tr-speak-btn").addEventListener("click", () => {
      const orig = document.getElementById("tr-orig-text").textContent;
      if (orig) speakText(orig);
    });
    document.getElementById("tr-copy-btn").addEventListener("click", () => {
      const trans = document.getElementById("tr-trans-text").textContent;
      if (trans && navigator.clipboard) {
        navigator.clipboard.writeText(trans);
        const btn = document.getElementById("tr-copy-btn");
        const prev = btn.textContent;
        btn.textContent = "✓ Скопировано!";
        setTimeout(() => btn.textContent = prev, 1500);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hidePopup();
    });

    return popup;
  }

  let activeWordSpans = [];

  function clearActive() {
    activeWordSpans.forEach(el => el.classList.remove("tr-active"));
    activeWordSpans = [];
  }

  async function showTranslation(text, sourceSpans = []) {
    ensurePopup();
    clearActive();

    if (sourceSpans.length) {
      sourceSpans.forEach(el => el.classList.add("tr-active"));
      activeWordSpans = sourceSpans;
    }

    const origEl = document.getElementById("tr-orig-text");
    const transEl = document.getElementById("tr-trans-text");

    origEl.textContent = text;
    transEl.textContent = "Переводим...";
    popup.classList.add("show");

    const translation = await getTranslation(text);
    transEl.textContent = translation;
  }

  function hidePopup() {
    if (popup) popup.classList.remove("show");
    clearActive();
  }

  // Tokenize ALL text nodes in a given root container
  function tokenizeAllText(root) {
    if (!root) return;

    const textNodes = [];
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'button') return NodeFilter.FILTER_REJECT;
          if (parent.closest('#tr-popup') || parent.closest('.tr-controls') || parent.closest('.top-nav')) return NodeFilter.FILTER_REJECT;
          if (parent.classList.contains('tr-w')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      const text = node.nodeValue;
      const tokens = text.split(/([A-Za-z0-9'’]+)/);
      if (tokens.length <= 1) return;

      const frag = document.createDocumentFragment();
      tokens.forEach(tok => {
        if (/^[A-Za-z0-9'’]+$/.test(tok)) {
          const span = document.createElement("span");
          span.className = "tr-w";
          span.textContent = tok;
          frag.appendChild(span);
        } else if (tok) {
          frag.appendChild(document.createTextNode(tok));
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
  }

  // Add Russian subtitle to sentence elements
  function addSentenceSubtitles() {
    const items = document.querySelectorAll(".sent, .qa-a");
    items.forEach(el => {
      const cleanText = el.textContent.replace(/^(Sentence|Model|Eliza|Denis):?\s*/i, "").trim();
      const norm = normalize(cleanText);
      const ru = DICT[norm];

      if (ru && !el.parentNode.querySelector(".tr-ru-sub")) {
        const sub = document.createElement("div");
        sub.className = "tr-ru-sub hidden";
        sub.innerHTML = `<b>Перевод:</b> ${ru}`;
        el.parentNode.insertBefore(sub, el.nextSibling);
      }
    });
  }

  // Shift-click range selection support
  let lastClickedSpan = null;

  function initInteraction() {
    const wrap = document.querySelector(".wrap") || document.body;
    tokenizeAllText(wrap);
    addSentenceSubtitles();

    // Word Click Listener
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".tr-w");
      if (!target) {
        if (!e.target.closest("#tr-popup") && !e.target.closest(".tr-controls") && !e.target.closest(".tr-btn-inst")) {
          if (!window.getSelection().toString().trim()) {
            hidePopup();
          }
        }
        return;
      }

      // Shift+Click for range of words in same block
      if (e.shiftKey && lastClickedSpan && lastClickedSpan.parentNode === target.parentNode) {
        const parent = target.parentNode;
        const words = Array.from(parent.querySelectorAll(".tr-w"));
        const i1 = words.indexOf(lastClickedSpan);
        const i2 = words.indexOf(target);
        if (i1 !== -1 && i2 !== -1) {
          const range = words.slice(Math.min(i1, i2), Math.max(i1, i2) + 1);
          const phrase = range.map(w => w.textContent).join(" ");
          showTranslation(phrase, range);
          return;
        }
      }

      lastClickedSpan = target;
      const word = target.textContent.trim();
      showTranslation(word, [target]);
    });

    // Phrase / Multi-word selection listener
    let selTimer = null;
    document.addEventListener("mouseup", () => {
      clearTimeout(selTimer);
      selTimer = setTimeout(() => {
        const selection = window.getSelection();
        const text = selection ? selection.toString().trim() : "";
        if (text.length > 1 && /^[a-zA-Z]/.test(text)) {
          showTranslation(text, []);
        }
      }, 180);
    });

    // Global Header Controls
    const header = document.querySelector("header");
    if (header && !document.querySelector(".tr-controls")) {
      const controls = document.createElement("div");
      controls.className = "tr-controls";
      controls.innerHTML = `
        <button class="tr-btn" id="tr-toggle-all-btn">
          <span>🇷🇺</span> <span>Показать перевод предложений</span>
        </button>
        <button class="tr-btn" id="tr-help-btn" style="color:var(--ink-faint)">
          <span>💡</span> <span>Как переводить любое слово и текст?</span>
        </button>
      `;
      header.parentNode.insertBefore(controls, header.nextSibling);

      const toggleBtn = document.getElementById("tr-toggle-all-btn");
      let allShown = false;
      toggleBtn.addEventListener("click", () => {
        allShown = !allShown;
        document.querySelectorAll(".tr-ru-sub").forEach(el => {
          el.classList.toggle("hidden", !allShown);
        });
        toggleBtn.classList.toggle("active", allShown);
        toggleBtn.innerHTML = allShown
          ? `<span>🇷🇺</span> <span>Скрыть переводы предложений</span>`
          : `<span>🇷🇺</span> <span>Показать перевод предложений</span>`;
      });

      const helpBtn = document.getElementById("tr-help-btn");
      helpBtn.addEventListener("click", () => {
        alert(
          "Интерактивный переводчик на странице:\n\n" +
          "1. ЛЮБОЕ СЛОВО КЛИКАБЕЛЬНО: нажми на любое слово (в предложениях, заголовках, описаниях заданий или правилах) — снизу сразу появится перевод и озвучка 🔊!\n\n" +
          "2. ПЕРЕВОД ФРАЗ И ЗАДАНИЙ: просто выдели мышкой (или пальцем на телефоне) любой текст или фразу — мгновенно покажется перевод всего фрагмента.\n\n" +
          "3. SHIFT + КЛИК: кликни на первое слово, затем зажми Shift и кликни на последнее слово — переведется весь диапазон.\n\n" +
          "4. КНОПКА «Показать перевод предложений»: открывает русские подстрочники."
        );
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInteraction);
  } else {
    initInteraction();
  }
})();
