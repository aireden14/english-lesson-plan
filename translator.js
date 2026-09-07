// translator.js — Interactive word and phrase translation for Denis
(function () {
  const DICT = {
    // 20 Sentences
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
    // Frequent words
    "team": "команда", "product": "продукт / продуктовый", "designers": "дизайнеры",
    "work": "работать / работа", "user": "пользователь", "interface": "интерфейс",
    "project": "проект", "friends": "друзья", "boy": "мальчик", "girl": "девочка",
    "creative": "творческий / креативный", "living": "живущие", "working": "работающие",
    "bali": "Бали", "brush": "чистить", "morning": "утро", "sleep": "сон / спать",
    "hurt": "болеть / причинять боль", "walking": "ходьба / прогулка", "kilometers": "километры",
    "city": "город", "cat": "кошка / кот", "loves": "любит", "chasing": "гоняться / преследовать",
    "mountains": "горы", "saw": "видел (прошедшее от see)", "white": "белый",
    "thousands": "тысячи", "colorful": "красочные / разноцветные", "coral": "коралловый", "reef": "риф",
    "sharp": "острый", "cooking": "готовка / приготовление пищи", "wooden": "деревянный",
    "wall": "стена", "books": "книги", "equipment": "оборудование / техника",
    "palm": "пальма", "everywhere": "везде / повсюду", "cut": "резать / разрезать",
    "pizza": "пицца", "equal": "равный / одинаковый", "security": "безопасность / охрана",
    "camera": "камера", "recorded": "записала", "night": "ночь",
    "flock": "стая", "wild": "дикий", "flew": "летел / пролетел", "sky": "небо",
    "watched": "смотрел", "detective": "детективный", "commercial": "коммерческий",
    "landed": "приземлился", "airport": "аэропорт", "farmers": "фермеры",
    "traditional": "традиционный", "villages": "деревни", "still": "всё ещё / до сих пор",
    "businesses": "бизнесы / компании", "navigate": "ориентироваться / преодолевать",
    "global": "мировой / глобальный", "economic": "экономический"
  };

  const cache = {};

  function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }

  // Speak using native Web Speech API
  function speakText(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.88;
      window.speechSynthesis.speak(u);
    }
  }

  // Fetch translation: first dictionary, then online Google GTX API
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

  // Create or get Floating Popup
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
        <span>💡 Кликни на слово или выдели фразу мышкой/пальцем</span>
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

  // Tokenize text into interactive words
  function tokenizeElement(el) {
    if (!el || el.dataset.trTokenized) return;
    el.dataset.trTokenized = "true";

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.trim()) {
        textNodes.push(walker.currentNode);
      }
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

  // Add Russian subtitle to each sentence card
  function addSentenceSubtitles() {
    const cards = document.querySelectorAll(".card, .blk");
    cards.forEach(card => {
      const sentEl = card.querySelector(".sent");
      if (!sentEl) return;

      const cleanText = sentEl.textContent.replace(/^Sentence:\s*/i, "").trim();
      const norm = normalize(cleanText);
      const ru = DICT[norm];

      if (ru && !card.querySelector(".tr-ru-sub")) {
        const sub = document.createElement("div");
        sub.className = "tr-ru-sub hidden";
        sub.innerHTML = `<b>Перевод:</b> ${ru}`;
        sentEl.parentNode.insertBefore(sub, sentEl.nextSibling);
      }
    });
  }

  // Shift-click range selection support
  let lastClickedSpan = null;

  function initInteraction() {
    // 1. Tokenize relevant content
    document.querySelectorAll(".sent, .pair, .hello p, .blk p, .card, .fix .line").forEach(tokenizeElement);
    addSentenceSubtitles();

    // 2. Click on a word
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".tr-w");
      if (!target) {
        if (!e.target.closest("#tr-popup") && !e.target.closest(".tr-controls")) {
          if (!window.getSelection().toString().trim()) {
            hidePopup();
          }
        }
        return;
      }

      // Handle Shift+Click for range of words
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

    // 3. Selection change (user highlights multiple words with mouse or finger)
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

    // 4. Add global translation controls to top of page
    const header = document.querySelector("header");
    if (header) {
      const controls = document.createElement("div");
      controls.className = "tr-controls";
      controls.innerHTML = `
        <button class="tr-btn" id="tr-toggle-all-btn">
          <span>🇷🇺</span> <span>Показать перевод всех предложений</span>
        </button>
        <button class="tr-btn" id="tr-help-btn" style="color:var(--ink-faint)">
          <span>💡</span> <span>Как переводить слова и фразы?</span>
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
          : `<span>🇷🇺</span> <span>Показать перевод всех предложений</span>`;
      });

      const helpBtn = document.getElementById("tr-help-btn");
      helpBtn.addEventListener("click", () => {
        alert(
          "Как пользоваться интерактивным переводом:\n\n" +
          "1. Одиночный клик: нажми на любое слово, чтобы мгновенно увидеть перевод и прослушать произношение 🔊.\n" +
          "2. Перевод фразы или группы слов: выдели мышкой или пальцем любые несколько слов подряд — внизу сразу появится перевод всей фразы!\n" +
          "3. Shift + клик: нажми первое слово, затем зажми Shift и нажми второе слово — переведётся весь фрагмент между ними.\n" +
          "4. Кнопка «Показать перевод всех предложений» раскроет русский перевод под каждым примером."
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
