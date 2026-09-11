// cards-data.js — English Learning Cards Database based on Denis's Brief (11.09.2026)
window.ENGLISH_CARDS_DATA = [
  // ==========================================
  // TOPIC 1: THIS / THAT / THESE / THOSE vs THERE
  // ==========================================
  {
    id: "tt-01",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "___ shoes are very comfortable.",
    hint: "Обувь на мне / прямо здесь в руках (множественное число)",
    answer: "These shoes are very comfortable.",
    translation: "Эти туфли очень удобные.",
    keyPart: "These",
    breakdown: {
      steps: [
        "1. Сколько? Shoes (туфли) — множественное число.",
        "2. Близко или далеко? На мне / близко -> значит THESE."
      ],
      trap: "Частая ошибка: писать «this shoes» (this — только для одного предмета!).",
      rule: "This (этот, 1) | That (тот, 1) | These (эти, много) | Those (те, много)"
    }
  },
  {
    id: "tt-02",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "___ is my car across the street.",
    hint: "Вон та машина через дорогу (одна штука, далеко)",
    answer: "That is my car across the street.",
    translation: "Вон то моя машина через дорогу.",
    keyPart: "That",
    breakdown: {
      steps: [
        "1. Сколько? Car — одна машина.",
        "2. Близко или далеко? Across the street (через дорогу) — далеко -> значит THAT."
      ],
      trap: "Ловушка: «There is my car». There is означает «имеется/существует». Когда указываешь пальцем на предмет («вон то моя машина») — нужно THAT!",
      rule: "That is = вон то (указываем на объект). There is = факт наличия (там есть / имеется)."
    }
  },
  {
    id: "tt-03",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "Look at ___ boxes over there by the door.",
    hint: "Вон те коробки у двери (много, на расстоянии)",
    answer: "Look at those boxes over there by the door.",
    translation: "Посмотри на те коробки вон там у двери.",
    keyPart: "those",
    breakdown: {
      steps: [
        "1. Сколько? Boxes (коробки) — множественное число.",
        "2. Близко или далеко? Over there (вон там) — далеко -> значит THOSE."
      ],
      trap: "Ошибка из урока: «look at there boxes». Слово there нельзя ставить как прилагательное перед существительным!",
      rule: "Those boxes = те коробки (далеко, много)."
    }
  },
  {
    id: "tt-04",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "___ cookies are delicious! Try one.",
    hint: "Печенья на тарелке передо мной (много, близко)",
    answer: "These cookies are delicious! Try one.",
    translation: "Эти печенья очень вкусные! Попробуй одно.",
    keyPart: "These",
    breakdown: {
      steps: [
        "1. Сколько? Cookies (печенья) — множественное число.",
        "2. Близко или далеко? На тарелке передо мной — близко -> THESE."
      ],
      trap: "Ошибка из тренажера: «this cookies». Помни: This cookie (одно) -> These cookies (много)!",
      rule: "This [ðɪs] = один близко. These [ðiːz] = много близко."
    }
  },
  {
    id: "tt-05",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "What are ___ in your hand?",
    hint: "Что это у тебя в руке? (несколько предметов)",
    answer: "What are these in your hand?",
    translation: "Что это у тебя в руке?",
    keyPart: "these",
    breakdown: {
      steps: [
        "1. Сколько? Глагол ARE подсказывает: предметов несколько.",
        "2. Близко или далеко? In your hand (у тебя в руке) — близко -> THESE."
      ],
      trap: "Ошибка: «What are this?». Нельзя смешивать are и this! Либо «What is this?», либо «What are these?».",
      rule: "What is this? (что это, 1 шт) | What are these? (что это, много)"
    }
  },
  {
    id: "tt-06",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "Who is ___ guy talking to Valery?",
    hint: "Кто вон тот парень, говорящий с Валерием? (один, на расстоянии)",
    answer: "Who is that guy talking to Valery?",
    translation: "Кто вон тот парень, который говорит с Валерием?",
    keyPart: "that",
    breakdown: {
      steps: [
        "1. Сколько? Guy (парень) — один человек.",
        "2. Близко или далеко? Стоит в стороне / на расстоянии -> THAT."
      ],
      trap: "Не путай с Who is there. «Who is that guy?» — «Кто вон тот парень?».",
      rule: "That guy = вон тот парень (указываем на одного человека на расстоянии)."
    }
  },
  {
    id: "tt-07",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "___ is my new monitor on the desk.",
    hint: "Это мой новый монитор на столе (я сижу прямо перед ним)",
    answer: "This is my new monitor on the desk.",
    translation: "Это мой новый монитор на столе.",
    keyPart: "This",
    breakdown: {
      steps: [
        "1. Сколько? Monitor — один.",
        "2. Близко или далеко? Прямо передо мной на столе -> THIS."
      ],
      trap: "Не говори «There is my new monitor», если знакомишь человека со своим столом. Говори: «This is my new monitor».",
      rule: "This is = «Это (мой монитор / мой друг / моя кружка)»."
    }
  },
  {
    id: "tt-08",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "Do you remember ___ days we spent in Bali?",
    hint: "Ты помнишь те дни, которые мы провели на Бали? (далекое прошлое, много дней)",
    answer: "Do you remember those days we spent in Bali?",
    translation: "Ты помнишь те дни, что мы провели на Бали?",
    keyPart: "those",
    breakdown: {
      steps: [
        "1. Сколько? Days (дни) — множественное число.",
        "2. Близко или далеко? Далекое прошлое во времени считается ДАЛЕКИМ -> THOSE."
      ],
      trap: "Дни в прошлом никогда не бывают «these days» (these days значит «на днях / в настоящее время»). Прошлое = THOSE days.",
      rule: "Those days = те давние дни."
    }
  },

  // ==========================================
  // TOPIC 2: AM / IS / ARE (TO BE)
  // ==========================================
  {
    id: "tobe-01",
    topic: "to-be",
    topicTitle: "am / is / are",
    front: "I ___ thirsty after the gym.",
    hint: "Я хочу пить после спортзала.",
    answer: "I am thirsty after the gym.",
    translation: "Я хочу пить после тренировки.",
    keyPart: "am",
    breakdown: {
      steps: [
        "1. Кто подлежащее? I (Я).",
        "2. Форма to be для I — только AM (или сокращенно I'm)."
      ],
      trap: "Ошибка с урока: «I are thirsty». С местоимением I глагол ARE никогда не используется!",
      rule: "I AM | He / She / It IS | We / You / They ARE"
    }
  },
  {
    id: "tobe-02",
    topic: "to-be",
    topicTitle: "am / is / are",
    front: "Alina and I ___ in Limassol today.",
    hint: "Алина и я сегодня в Лимасоле.",
    answer: "Alina and I are in Limassol today.",
    translation: "Мы с Алиной сегодня в Лимасоле.",
    keyPart: "are",
    breakdown: {
      steps: [
        "1. Кто подлежащее? «Alina and I» = МЫ (WE) — два человека!",
        "2. Раз нас двое (множественное число), форма глагола — ARE."
      ],
      trap: "Ошибка: «Alina and I am». Глаз видит рядом I и ставит am, но подлежащее — это ОБА человека (We)!",
      rule: "X and I = WE -> всегда требует ARE."
    }
  },
  {
    id: "tobe-03",
    topic: "to-be",
    topicTitle: "am / is / are",
    front: "My friends ___ in Kazakhstan right now.",
    hint: "Мои друзья сейчас в Казахстане.",
    answer: "My friends are in Kazakhstan right now.",
    translation: "Мои друзья сейчас в Казахстане.",
    keyPart: "are",
    breakdown: {
      steps: [
        "1. Кто подлежащее? Friends (друзья) — множественное число (ОНИ / THEY).",
        "2. Для множественного числа — ARE."
      ],
      trap: "Ошибка: «my friends is». Не путай: My friend IS (один друг) -> My friends ARE (много друзей).",
      rule: "Singular -> IS | Plural -> ARE"
    }
  },
  {
    id: "tobe-04",
    topic: "to-be",
    topicTitle: "am / is / are",
    front: "I ___ what you mean.",
    hint: "Я понимаю, что ты имеешь в виду. (Глагол understand)",
    answer: "I understand what you mean.",
    translation: "Я понимаю, что ты имеешь в виду.",
    keyPart: "understand",
    breakdown: {
      steps: [
        "1. Understand — это уже смысловой глагол («понимаю»).",
        "2. Глагол to be (am) НЕ НУЖЕН перед обычными глаголами в Present Simple!"
      ],
      trap: "Стойкая ошибка: «I'm understand» или «I am understand». В английском либо «I understand» (я понимаю), либо «I am happy» (я счастливый). Не лепи am куда попало!",
      rule: "Никакого AM перед глаголом действия: «I understand», «I work», «I live»."
    }
  },
  {
    id: "tobe-05",
    topic: "to-be",
    topicTitle: "am / is / are",
    front: "She ___ ready for the meeting yet.",
    hint: "Она еще не готова к встрече. (отрицание)",
    answer: "She isn't ready for the meeting yet.",
    translation: "Она еще не готова к созвону.",
    keyPart: "isn't",
    breakdown: {
      steps: [
        "1. Кто подлежащее? She (Она) — 3-е лицо, единственное число.",
        "2. Форма to be: is. С отрицанием: is not -> isn't."
      ],
      trap: "Ошибка: «she are» или «she not ready». Обязательно нужен глагол to be: ISN'T.",
      rule: "He / She / It + IS / ISN'T"
    }
  },
  {
    id: "tobe-06",
    topic: "to-be",
    topicTitle: "am / is / are",
    front: "___ you tired after playing Dota?",
    hint: "Вопрос: Ты устал после игры в Доту?",
    answer: "Are you tired after playing Dota?",
    translation: "Ты устал после игры в Доту?",
    keyPart: "Are",
    breakdown: {
      steps: [
        "1. Tired (уставший) — это прилагательное, значит нужен to be.",
        "2. Подлежащее YOU -> форма ARE. В вопросе глагол выносится на первое место: «Are you...?»."
      ],
      trap: "Ошибка: «Do you tired?». С прилагательными (tired, hungry, thirsty, ready) вопрос задается через ARE YOU, а не DO YOU!",
      rule: "Are you + [прилагательное]? (Are you hungry? Are you ready? Are you tired?)"
    }
  },

  // ==========================================
  // TOPIC 3: DO / DOES / DON'T / DOESN'T
  // ==========================================
  {
    id: "do-01",
    topic: "do-does",
    topicTitle: "do / does / don't",
    front: "I ___ see any apples on the table.",
    hint: "Я не вижу яблок на столе. (отрицание к глаголу see)",
    answer: "I don't see any apples on the table.",
    translation: "Я не вижу яблок на столе.",
    keyPart: "don't",
    breakdown: {
      steps: [
        "1. See (видеть) — обычный глагол действия.",
        "2. В Present Simple отрицание для I строится ТОЛЬКО со вспомогательным глаголом: DO + NOT = DON'T."
      ],
      trap: "Главная ошибка Дениса в речи: «I not see apples» или «I not understand». Одинокое NOT без глагола помощника DO в английском — грубая ошибка!",
      rule: "I / You / We / They + DON'T + глагол (I don't see, I don't know)."
    }
  },
  {
    id: "do-02",
    topic: "do-does",
    topicTitle: "do / does / don't",
    front: "Alina ___ like cold weather.",
    hint: "Алина не любит холодную погоду.",
    answer: "Alina doesn't like cold weather.",
    translation: "Алина не любит холодную погоду.",
    keyPart: "doesn't",
    breakdown: {
      steps: [
        "1. Подлежащее — Alina (ОНА / SHE).",
        "2. Для he/she/it вспомогательный глагол — DOES, с отрицанием — DOESN'T.",
        "3. После doesn't глагол идет в базовой форме: LIKE (без буквы -s!)."
      ],
      trap: "Две частые ошибки: «Alina don't like» (забыл does) и «Alina doesn't likes» (лишняя -s у глагола). Does уже забрал -s себе!",
      rule: "He / She / It + DOESN'T + начальная форма глагола."
    }
  },
  {
    id: "do-03",
    topic: "do-does",
    topicTitle: "do / does / don't",
    front: "___ you like playing story games?",
    hint: "Вопрос: Ты любишь играть в сюжетные игры?",
    answer: "Do you like playing story games?",
    translation: "Тебе нравится играть в сюжетные игры?",
    keyPart: "Do",
    breakdown: {
      steps: [
        "1. Like — обычный смысловой глагол.",
        "2. Чтобы задать вопрос к YOU, на первое место ставим DO: «Do you like...?»."
      ],
      trap: "Ошибка: «You likes play game?». Нельзя просто менять интонацию без помощника Do, и у you никогда не бывает окончания -s!",
      rule: "DO + you + глагол? (Do you live in Cyprus? Do you work today?)"
    }
  },
  {
    id: "do-04",
    topic: "do-does",
    topicTitle: "do / does / don't",
    front: "Where ___ Valery work?",
    hint: "Где работает Валерий? (вопрос со словом Where)",
    answer: "Where does Valery work?",
    translation: "Где работает Валерий?",
    keyPart: "does",
    breakdown: {
      steps: [
        "1. Вопросительное слово: Where.",
        "2. Подлежащее — Valery (ОН / HE) -> вспомогательный глагол DOES.",
        "3. Глагол действия — work (без -s, так как есть does)."
      ],
      trap: "Ошибка с урока: «where are you does work» (дикая каша из are и does). Схема простая: [Вопрос] + [DO / DOES] + [Кто] + [Глагол].",
      rule: "Where / What / When + DOES + he/she + verb?"
    }
  },
  {
    id: "do-05",
    topic: "do-does",
    topicTitle: "do / does / don't",
    front: "She ___ drink coffee in the evening.",
    hint: "Она не пьет кофе по вечерам.",
    answer: "She doesn't drink coffee in the evening.",
    translation: "Она не пьет кофе вечером.",
    keyPart: "doesn't",
    breakdown: {
      steps: [
        "1. She -> значит DOESN'T.",
        "2. Drink остается в начальной форме (никаких drinks!)."
      ],
      trap: "Ошибка: «she is dont like» или «she not drink». Запомни железно: She DOESN'T drink.",
      rule: "Doesn't + базовый глагол (без окончаний)."
    }
  },

  // ==========================================
  // TOPIC 4: VERB ENDING -S (3RD PERSON)
  // ==========================================
  {
    id: "verbs-01",
    topic: "verbs-s",
    topicTitle: "Окончание -s у глаголов",
    front: "Alina ___ in Limassol with me.",
    hint: "Алина живет в Лимасоле со мной. (глагол live)",
    answer: "Alina lives in Limassol with me.",
    translation: "Алина живет в Лимасоле со мной.",
    keyPart: "lives",
    breakdown: {
      steps: [
        "1. Подлежащее — Alina (ОНА / SHE).",
        "2. В Present Simple для he/she/it к глаголу ВСЕГДА добавляется окончание -s: live -> lives."
      ],
      trap: "Ошибка: «Alina live» или «Alina have». В 3-м лице единственного числа окончание -s обязательно!",
      rule: "He / She / It + VERB-S (lives, works, plays, drinks, wants)."
    }
  },
  {
    id: "verbs-02",
    topic: "verbs-s",
    topicTitle: "Окончание -s у глаголов",
    front: "I ___ as a product designer from home.",
    hint: "Я работаю продуктовым дизайнером из дома. (глагол work)",
    answer: "I work as a product designer from home.",
    translation: "Я работаю продуктовым дизайнером из дома.",
    keyPart: "work",
    breakdown: {
      steps: [
        "1. Подлежащее — I (Я).",
        "2. С местоимением I окончание -s у глаголов СТРОГО ЗАПРЕЩЕНО."
      ],
      trap: "Обратная ошибка после урока 5: «I works», «you speaks». Окончание -s нужно ТОЛЬКО для одного человека со стороны (he, she, it)!",
      rule: "I work | You work | We work | They work | He/She WORKS"
    }
  },
  {
    id: "verbs-03",
    topic: "verbs-s",
    topicTitle: "Окончание -s у глаголов",
    front: "My friends ___ playing board games on weekends.",
    hint: "Мои друзья любят играть в настолки по выходным. (глагол like)",
    answer: "My friends like playing board games on weekends.",
    translation: "Мои друзья любят играть в настольные игры по выходным.",
    keyPart: "like",
    breakdown: {
      steps: [
        "1. Кто подлежащее? My friends (друзья — МНОГО, они/they).",
        "2. Для множественного числа глагол берется БЕЗ -s: like."
      ],
      trap: "Ошибка: «my friends likes». Буква -s на конце друзей уже есть (friends), к глаголу ее лепить НЕЛЬЗЯ!",
      rule: "My friend likes (один друг) vs My friends like (много друзей)."
    }
  },
  {
    id: "verbs-04",
    topic: "verbs-s",
    topicTitle: "Окончание -s у глаголов",
    front: "Does he ___ English fluently?",
    hint: "Он говорит по-английски свободно? (глагол speak)",
    answer: "Does he speak English fluently?",
    translation: "Он бегло говорит по-английски?",
    keyPart: "speak",
    breakdown: {
      steps: [
        "1. Вопрос начинается с DOES.",
        "2. Поскольку DOES уже забрал букву -s на себя, смысловой глагол возвращается в начальную форму: SPEAK."
      ],
      trap: "Ошибка: «Does he speaks?». Запомни: две -s в одной связке не живут! Does уже забрал -s.",
      rule: "Does he SPEAK? (не speaks!)"
    }
  },

  // ==========================================
  // TOPIC 5: ARTICLES & NOUNS (IRREGULAR PLURALS)
  // ==========================================
  {
    id: "art-01",
    topic: "articles-plurals",
    topicTitle: "Артикли и множественное число",
    front: "You are ___ great teacher.",
    hint: "Ты отличный преподаватель.",
    answer: "You are a great teacher.",
    translation: "Ты отличный преподаватель.",
    keyPart: "a",
    breakdown: {
      steps: [
        "1. Teacher — исчисляемое существительное в единственном числе (один учитель).",
        "2. Перед профессией / описанием лица в единственном числе ОБЯЗАТЕЛЕН артикль: A (или AN)."
      ],
      trap: "Ошибка Дениса: пропускать «a» («you are teacher», «I am designer»). Всегда ставь: a designer, a teacher, a student!",
      rule: "to be + A / AN + профессия/роль (I am a designer. You are a teacher.)"
    }
  },
  {
    id: "art-02",
    topic: "articles-plurals",
    topicTitle: "Артикли и множественное число",
    front: "I bought two new ___ for work.",
    hint: "Я купил два новых телефона для работы. (телефон)",
    answer: "I bought two new phones for work.",
    translation: "Я купил два новых телефона для работы.",
    keyPart: "phones",
    breakdown: {
      steps: [
        "1. Числительное TWO (два) требует множественного числа.",
        "2. К слову phone добавляется окончание -s -> phones."
      ],
      trap: "Ошибка из уроков: «two phone», «two computer». В русском после 'два' идет родительный падеж, в английском — строго множественное число (-s)!",
      rule: "Two / three / many + существительное с окончанием -S."
    }
  },
  {
    id: "art-03",
    topic: "articles-plurals",
    topicTitle: "Артикли и множественное число",
    front: "I brush my ___ every morning and evening.",
    hint: "Я чищу зубы каждое утро и вечер. (неправильное мн. число от tooth)",
    answer: "I brush my teeth every morning and evening.",
    translation: "Я чищу зубы каждое утро и вечер.",
    keyPart: "teeth",
    breakdown: {
      steps: [
        "1. Зуб (один) — tooth.",
        "2. Зубы (много) — исключение: двойная 'oo' переходит в 'ee' -> TEETH."
      ],
      trap: "Нельзя говорить «tooths»!",
      rule: "Tooth [tuːθ] -> Teeth [tiːθ] (зубы)."
    }
  },
  {
    id: "art-04",
    topic: "articles-plurals",
    topicTitle: "Артикли и множественное число",
    front: "Many creative ___ live in Bali.",
    hint: "Многие творческие люди живут на Бали. (неправильное мн. число от person)",
    answer: "Many creative people live in Bali.",
    translation: "Многие творческие люди живут на Бали.",
    keyPart: "people",
    breakdown: {
      steps: [
        "1. Один человек — person.",
        "2. Люди во множественном числе — PEOPLE."
      ],
      trap: "Не говори «persons» в обычной речи!",
      rule: "Person (человек) -> People (люди, народ)."
    }
  },
  {
    id: "art-05",
    topic: "articles-plurals",
    topicTitle: "Артикли и множественное число",
    front: "Could you pass me two sharp ___ for cooking?",
    hint: "Не мог бы ты передать мне два острых ножа для готовки? (от knife)",
    answer: "Could you pass me two sharp knives for cooking?",
    translation: "Не мог бы ты передать мне два острых ножа для готовки?",
    keyPart: "knives",
    breakdown: {
      steps: [
        "1. Нож в ед. числе — knife.",
        "2. Существительные на -fe во множественном числе меняют f на v + es: KNIVES."
      ],
      trap: "Слова с окончанием -f/-fe: knife -> knives, leaf -> leaves, life -> lives, shelf -> shelves.",
      rule: "Knife -> Knives [naɪvz]."
    }
  },

  // ==========================================
  // TOPIC 6: «X IS Y» (FIXING «X IT'S Y»)
  // ==========================================
  {
    id: "its-01",
    topic: "it-is",
    topicTitle: "«X is Y» (без лишнего it's)",
    front: "My best friend ___ Valery.",
    hint: "Мой лучший друг — Валерий.",
    answer: "My best friend is Valery.",
    translation: "Мой лучший друг — Валерий.",
    keyPart: "is",
    breakdown: {
      steps: [
        "1. Подлежащее — «My best friend» (он уже назван!).",
        "2. Сказуемое — глагол IS."
      ],
      trap: "Бывшая частая ошибка Дениса: «My best friend it's Valery». Местоимение IT здесь лишнее и дублирует друга!",
      rule: "[Подлежащее] + IS + [Имя / Свойство]: «My friend is Valery», «Cyprus is warm»."
    }
  },
  {
    id: "its-02",
    topic: "it-is",
    topicTitle: "«X is Y» (без лишнего it's)",
    front: "This game ___ very exciting.",
    hint: "Эта игра очень захватывающая.",
    answer: "This game is very exciting.",
    translation: "Эта игра очень захватывающая.",
    keyPart: "is",
    breakdown: {
      steps: [
        "1. Подлежащее — This game.",
        "2. Глагол связи — IS (не it's!)."
      ],
      trap: "Не говори: «This game it's exciting». Слово IT не нужно!",
      rule: "Говори: «This game is...», «The laptop is fast»."
    }
  },

  // ==========================================
  // TOPIC 7: FIXING ELIZA'S MISCONCEPTIONS
  // ==========================================
  {
    id: "eliza-01",
    topic: "eliza-rules",
    topicTitle: "Исправление правил Элизы",
    front: "I like ___ books in the evening.",
    hint: "Мне нравится читать книги по вечерам (мое хобби / постоянная привычка).",
    answer: "I like reading books in the evening.",
    translation: "Я люблю читать книги по вечерам.",
    keyPart: "reading",
    breakdown: {
      steps: [
        "1. Конструкция: LIKE + глагол с -ing означает увлечение, хобби или то, что человек любит делать вообще.",
        "2. Это НЕ означает «я читаю прямо в эту секунду»!"
      ],
      trap: "ОШИБКА ЭЛИЗЫ: Преподавательница сказала тебе: «like reading — это про сейчас». Это НЕПРАВДА! Like reading — это регулярное хобби и привычка.",
      rule: "Like doing something = постоянное хобби / привычка (а не процесс в эту секунду!)."
    }
  },
  {
    id: "eliza-02",
    topic: "eliza-rules",
    topicTitle: "Исправление правил Элизы",
    front: "___ a great coffee shop near my home.",
    hint: "Рядом с моим домом есть отличная кофейня (факт наличия/имеется).",
    answer: "There is a great coffee shop near my home.",
    translation: "Рядом с моим домом есть отличная кофейня.",
    keyPart: "There is",
    breakdown: {
      steps: [
        "1. Смысл предложения — сообщить о наличии объекта («имеется / существует / там есть»).",
        "2. Для этого используется конструкция THERE IS (для одного объекта)."
      ],
      trap: "ОШИБКА ЭЛИЗЫ: Элиза сказала: «there is — когда показываешь на что-то далекое». Это НЕ ТАК! Чтобы показать на что-то далекое, говорят «THAT is...». А THERE IS выражает лишь существование чего-то в данном месте.",
      rule: "There is/are = «имеется / существует». Указание пальцем вдаль = That is / Those are."
    }
  },
  {
    id: "tt-09",
    topic: "this-that",
    topicTitle: "This / That / These / Those",
    front: "___ is Alina's laptop on the table.",
    hint: "Это ноутбук Алины на столе (прямо передо мной)",
    answer: "This is Alina's laptop on the table.",
    translation: "Это ноутбук Алины на столе.",
    keyPart: "This",
    breakdown: {
      steps: [
        "1. Laptop — один ноутбук.",
        "2. Близко на столе перед нами -> THIS."
      ],
      trap: "Не путай с There is.",
      rule: "This is [something] = «Это [предмет]»."
    }
  },
  {
    id: "tobe-07",
    topic: "to-be",
    topicTitle: "am / is / are",
    front: "My apartment ___ bright and spacious.",
    hint: "Моя квартира светлая и просторная.",
    answer: "My apartment is bright and spacious.",
    translation: "Моя квартира светлая и просторная.",
    keyPart: "is",
    breakdown: {
      steps: [
        "1. Apartment — единственное число (IT / она).",
        "2. Для 3-го лица ед. ч. форма to be — IS."
      ],
      trap: "Не пропускай глагол! В русском «квартира светлая», в английском строго «apartment IS bright».",
      rule: "Subject + IS + adjective."
    }
  },
  {
    id: "tobe-08",
    topic: "to-be",
    topicTitle: "am / is / are",
    front: "We ___ not tired, we are ready to practice.",
    hint: "Мы не устали, мы готовы тренироваться.",
    answer: "We are not tired, we are ready to practice.",
    translation: "Мы не устали, мы готовы практиковаться.",
    keyPart: "are",
    breakdown: {
      steps: [
        "1. Подлежащее — We (Мы).",
        "2. Форма to be — ARE (или aren't)."
      ],
      trap: "Не говори: «We not tired». Обязательно: «We ARE not tired» или «We AREN'T tired».",
      rule: "We / You / They + ARE (aren't)."
    }
  },
  {
    id: "do-06",
    topic: "do-does",
    topicTitle: "do / does / don't",
    front: "I ___ drink black tea, I prefer filter coffee.",
    hint: "Я не пью черный чай, я предпочитаю фильтр-кофе.",
    answer: "I don't drink black tea, I prefer filter coffee.",
    translation: "Я не пью черный чай, я предпочитаю фильтр-кофе.",
    keyPart: "don't",
    breakdown: {
      steps: [
        "1. Глагол действия — drink.",
        "2. Для I отрицание строится через DON'T: «I don't drink»."
      ],
      trap: "Не говори «I not drink». Только «I don't drink».",
      rule: "I don't + verb."
    }
  },
  {
    id: "do-07",
    topic: "do-does",
    topicTitle: "do / does / don't",
    front: "___ you have two monitors for design work?",
    hint: "Вопрос: У тебя есть два монитора для работы над дизайном?",
    answer: "Do you have two monitors for design work?",
    translation: "У тебя есть два монитора для дизайна?",
    keyPart: "Do",
    breakdown: {
      steps: [
        "1. Have в значении «иметь» в вопросе требует вспомогательного глагола DO.",
        "2. Вопрос к YOU: «Do you have...?»."
      ],
      trap: "Не строй вопрос через «You have...?» с русской интонацией. Обязательно выноси DO вперед!",
      rule: "DO you have...?"
    }
  },
  {
    id: "verbs-05",
    topic: "verbs-s",
    topicTitle: "Окончание -s у глаголов",
    front: "Valery ___ in Limassol too.",
    hint: "Валерий тоже живет в Лимасоле. (глагол live)",
    answer: "Valery lives in Limassol too.",
    translation: "Валерий тоже живет в Лимасоле.",
    keyPart: "lives",
    breakdown: {
      steps: [
        "1. Valery — он (HE).",
        "2. К глаголу live обязательно добавляется окончание -s -> lives."
      ],
      trap: "Не забывай -s у глаголов с именами людей (Denis works, Alina speaks, Valery lives)!",
      rule: "[Имя одного человека] + verb-S."
    }
  },
  {
    id: "art-06",
    topic: "articles-plurals",
    topicTitle: "Артикли и множественное число",
    front: "People say that cats have nine ___.",
    hint: "Говорят, что у кошек девять жизней. (жизнь во множественном числе)",
    answer: "People say that cats have nine lives.",
    translation: "Говорят, что у кошек девять жизней.",
    keyPart: "lives",
    breakdown: {
      steps: [
        "1. Life (жизнь) оканчивается на -fe.",
        "2. Во множественном числе: f меняется на v + es -> LIVES [laɪvz]."
      ],
      trap: "Не пиши «lifes»!",
      rule: "Life -> Lives."
    }
  },
  {
    id: "art-07",
    topic: "articles-plurals",
    topicTitle: "Артикли и множественное число",
    front: "There are thousands of colorful ___ near the reef.",
    hint: "Возле рифа тысячи разноцветных рыб. (рыба во множественном числе)",
    answer: "There are thousands of colorful fish near the reef.",
    translation: "Возле рифа тысячи разноцветных рыб.",
    keyPart: "fish",
    breakdown: {
      steps: [
        "1. Слово FISH — неизменяемое исключение.",
        "2. Во множественном числе одна рыба — one fish, десять рыб — ten fish."
      ],
      trap: "В обычной речи fishes не говорят (fishes — это только разные биологические виды рыб). Множественное число — просто FISH!",
      rule: "Fish -> Fish (не меняется!)."
    }
  }
];

// Helper to get cards by topic or all
window.getCardsByTopic = function (topicId) {
  if (!topicId || topicId === "all") return window.ENGLISH_CARDS_DATA;
  return window.ENGLISH_CARDS_DATA.filter(c => c.topic === topicId);
};

