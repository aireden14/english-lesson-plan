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

  
  const EXPANDED_DICT = {
  "abandonment": "бросание / отказ от покупки",
  "ack in yprus where lived the summer heat was strong but the air was dry": "На Кипре, где я жил, летняя жара была сильной, но воздух был сухим.",
  "adjective": "прилагательное",
  "adjectives": "прилагательные",
  "adjusting": "адаптирующийся",
  "agency": "свобода действий / агентность",
  "agreed did you get a chance to check the qualitative feedback from our user testing sessions": "Договорились! Удалось посмотреть качественный фидбек с наших сессий тестирования на пользователях?",
  "agreement": "согласование (слов в грамматике)",
  "ah that makes total sense for mobile ergonomics but what happens when the virtual keyboard pops up while entering card details": "А, это действительно логично для мобильной эргономики. Но что происходит, когда выезжает экранная клавиатура при вводе данных карты?",
  "aha 100 moved from elbourne three months ago and my body is still adjusting re you here on holiday or are you based in ali long term": "Ха-ха, на все 100%! Я переехала из Мельбурна три месяца назад, и тело до сих пор привыкает. Ты здесь в отпуске или обосновался на Бали надолго?",
  "alancing emanding reelance lients and sland ife": "Баланс между требовательными клиентами на фрилансе и жизнью на острове",
  "ali is still relatively affordable compared to urope": "Бали всё еще относительно доступен по сравнению с Европой",
  "alinese locals are exceptionally kind and welcoming to everyone": "балийцы исключительно добры и гостеприимны ко всем",
  "am actually looking for recommendations right now here are your favorite places for clean nutrition around here": "Как раз ищу рекомендации! Где твои любимые места со здоровой и полезной едой поблизости?",
  "am based here long term probably for at least six to twelve months": "Я здесь надолго, скорее всего как минимум на 6-12 месяцев.",
  "am based here long term probably for at least six to twelve months work remotely as a digital product and designer hat line of work are you in": "Я обосновался здесь надолго, минимум на полгода-год. Работаю удаленно продуктовым и UI-дизайнером. А в какой сфере работаешь ты?",
  "am dining in and plan to work on my laptop for a few hours have two client oom calls this afternoon s there a quiet air conditioned workspace upstairs or is it noisy during peak hours": "Я буду здесь и планирую поработать на ноутбуке пару часов. Сегодня днем у меня два созвона с клиентами в Zoom. Наверху есть тихая рабочая зона с кондиционером, или в часы пик там шумно?",
  "am renting a amaha tomorrow morning": "Завтра утром я беру в аренду Yamaha NMAX.",
  "ame here ince you are settling into the area have you found any good spots for high protein food": "То же самое. Раз ты только осваиваешься в районе, нашел уже хорошие места с высокобелковой едой?",
  "an pay by contactless credit card or is there an extra card surcharge": "Могу ли я оплатить бесконтактной картой или есть комиссия?",
  "an we deliver those before our riday sprint deadline": "Сможем сдать это до дедлайна спринта в пятницу?",
  "anchor": "якорь / фиксатор",
  "anchors": "фиксируется / привязывается к координатам",
  "any foreign expat love living in ali because the island offer many benefit": "Многие иностранные экспаты любят жить на Бали, потому что остров дает много преимуществ. (Ошибка: пропущены окончания -s)",
  "any foreign expats love living in ali because the island offers many benefits": "Многие иностранные экспаты любят жить на Бали, потому что остров дает множество преимуществ.",
  "appreciate it mate good session today the humidity in this gym is intense this afternoon": "Спасибо, дружище! Как тренировка сегодня? Влажность в зале этим днем просто зашкаливает.",
  "are design systems necessary for early stage startups": "Необходимы ли дизайн-системы для стартапов на ранней стадии?",
  "are freelance deadlines stressful when requirements change": "Вызывают ли дедлайны на фрилансе стресс при смене требований?",
  "are indonesian locals friendly to foreign digital nomads": "Дружелюбны ли местные индонезийцы к иностранным цифровым кочевникам?",
  "are mobile apps more popular than desktop websites today": "Популярнее ли мобильные приложения, чем десктопные сайты сегодня?",
  "are sunset views in uluwatu breathtaking": "Захватывают ли дух закаты в Улувату?",
  "are the beaches in bali crowded": "Многолюдны ли пляжи на Бали?",
  "are the roads in canggu dangerous for beginners": "Опасны ли дороги в Чангу для новичков?",
  "are you dining in today or is this order for takeaway": "Вы здесь или заказ с собой?",
  "are you here on holiday or are you based in bali long term": "Ты здесь на отдыхе или обосновался на Бали на долгий срок?",
  "are your clients demanding": "Требовательны ли твои клиенты?",
  "are your close friends in cyprus right now": "Твои близкие друзья сейчас на Кипре?",
  "ark mode is comfortable in the dark": "Темная тема комфортна в темноте",
  "ark mode is comfortable in the dark but text contrast is what really protects eyesight": "Темный режим комфортен в темноте, но зрение защищает именно контрастность текста.",
  "ark mode is just a nice to have": "Темная тема — это просто приятное дополнение (nice-to-have).",
  "artificial": "искусственный",
  "arung u i is delicious cheap and fresh": "В варунге Бу Ми очень вкусно, дешево и свежо.",
  "as long as your food bill is above 100 000 rupiah two hours in the quiet workspace are completely free after two hours a day pass is 80 000 rupiah": "Если ваш чек за еду превышает 100 000 рупий, два часа в тихой рабочей зоне абсолютно бесплатны! Свыше двух часов дневной абонемент стоит 80 000 рупий.",
  "async communication is the only sustainable way to work across european and american time zones": "Асинхронная коммуникация — единственный жизнеспособный способ работы через европейские и американские часовые пояса.",
  "asynchronous": "асинхронный (не требующий моментального ответа)",
  "asynchronous communication": "асинхронная коммуникация (общение без ожидания немедленного ответа)",
  "ave a great workout": "Отличной тренировки!",
  "avocado": "авокадо",
  "awesome and drinking water i know tap water in bali isn t potable is there a gallon water dispenser in the kitchen with both hot and cold water": "Супер. И насчет питьевой воды: я знаю, что вода из-под крана на Бали не является питьевой. На кухне есть кулер с помпой с горячей и холодной водой?",
  "awesome i m a full stack engineer working remotely for an australian startup it feels like half the people in canggu are tech expats what is your workout routine like": "Круто! Я фулстек-разработчик, работаю удаленно на австралийский стартап. Кажется, половина людей в Чангу — айтишники-экспаты! А по какой программе ты тренируешься?",
  "awkward": "неловкий / физически неудобный",
  "back in cyprus where i lived the summer heat was strong but the air was dry": "На Кипре, где я жил, летняя жара была сильной, но воздух был сухим.",
  "backbone": "основа / становой хребет",
  "balance": "баланс / равновесие",
  "balancing demanding freelance clients and island life": "Баланс между требовательными клиентами на фрилансе и жизнью на острове",
  "bali is still relatively affordable compared to europe": "Бали всё еще относительно доступен по сравнению с Европой",
  "balinese locals are exceptionally kind and welcoming to everyone": "балийцы исключительно добры и гостеприимны ко всем",
  "bandwidth": "пропускная способность сети",
  "barista": "бариста",
  "before i unpack my luggage could we please check the internet connection": "Перед тем как распаковать багаж, можем проверить подключение к интернету?",
  "below the fold": "ниже первого экрана (в невидимой зоне до скролла)",
  "bench": "скамья для жима",
  "boundaries": "границы / рамки",
  "boundary": "граница",
  "bowls": "боулы (глубокие блюда с полезной едой)",
  "breathtaking": "захватывающий дух",
  "burnout": "эмоциональное или профессиональное выгорание",
  "burnout prevention": "профилактика эмоционального выгорания",
  "can i pay by contactless credit card or is there an extra card surcharge": "Могу ли я оплатить бесконтактной картой или есть комиссия?",
  "can we deliver those before our friday sprint deadline": "Сможем сдать это до дедлайна спринта в пятницу?",
  "capital liquidity": "ликвидность капитала (скорость превращения в деньги)",
  "cart abandonment": "брошенные корзины (уход пользователя без оплаты)",
  "challenge": "испытание / вызов",
  "chili": "чили (острый перец)",
  "clean nutrition": "чистое здоровое питание без пищевого мусора",
  "clear": "чистый / прозрачный / ясный",
  "client management is 80 about clear expectation setting before the sprint starts": "Управление клиентами на 80% состоит из четкого согласования ожиданий до начала спринта.",
  "cliff": "отвесный утес / скала",
  "commoditization": "комодитизация (утрата уникальности продукта)",
  "commoditization of basic layouts": "обесценивание и стандартизация простой верстки",
  "commoditized": "обесцененный / превратившийся в ширпотреб",
  "completely understand e have a dedicated fiber optic line installed he router is right here in the living room he download speed is around 150 bps and the upload speed is roughly 50 bps": "Прекрасно вас понимаю! У нас проведена выделенная оптоволоконная линия. Роутер прямо здесь, в гостиной. Скорость скачивания около 150 Мбит/с, а отдача — примерно 50 Мбит/с.",
  "compliments": "комплименты / похвала",
  "conditioning": "кондиционирование воздуха",
  "confusion": "замешательство / путаница",
  "confusion rate": "процент ошибок и замешательства пользователей",
  "contactless": "бесконтактный (о платежах)",
  "contactless surcharge": "дополнительная комиссия за оплату картой",
  "contrast": "контраст",
  "conviction": "убежденность / уверенность",
  "cost of living comparison": "сравнение стоимости жизни",
  "could i please get an iced flat white with oat milk without any added syrup or sugar": "Можно мне, пожалуйста, холодный флэт уайт на овсяном молоке, без сиропа и сахара?",
  "could you please give me the receipt with the high speed wi fi password": "Дайте, пожалуйста, чек с паролем от скоростного Wi-Fi.",
  "covered parking": "крытая парковка (под навесом)",
  "credential": "документ / ключ доступа",
  "credentials": "учетные данные / логины и пароли",
  "creep": "расползание / разрастание",
  "crowded": "многолюдный",
  "crystal": "кристальный",
  "cyprus and bali are both incredible islands but their cultural atmosphere is totally different": "Кипр и Бали — оба потрясающие острова, но их культурная атмосфера абсолютно разная.",
  "cyprus is quiet european and very safe while bali is buzzing with young creators and entrepreneurs": "Кипр тихий, европейский и очень безопасный, тогда как Бали гудит от молодых создателей и предпринимателей.",
  "dark mode is comfortable in the dark": "Темная тема комфортна в темноте",
  "dark mode is comfortable in the dark but text contrast is what really protects eyesight": "Темный режим комфортен в темноте, но зрение защищает именно контрастность текста.",
  "dark mode is just a nice to have": "Темная тема — это просто приятное дополнение (nice-to-have).",
  "deadline": "крайний срок сдачи работы",
  "deep mental focus": "глубокая ментальная концентрация",
  "deep work uninterrupted blocks": "непрерывные блоки времени для глубокой работы",
  "defect": "дефект / строительный брак",
  "defects": "дефекты",
  "deliver": "сдавать работу / доставлять результат",
  "demanding": "требовательный",
  "denis manages three active client from california and two project this month": "Денис ведет трех активных клиентов из Калифорнии и два проекта в этом месяце. (Ошибка: пропущены -s)",
  "denis manages three active clients from california and two projects this month": "Денис ведет трех активных клиентов из Калифорнии и два проекта в этом месяце.",
  "density": "плотность / концентрация",
  "departure": "отъезд / вылет",
  "deposit": "залог / страховой депозит",
  "design system tokens": "токены дизайн-системы (цвета, отступы, типографика)",
  "design systems are helpful": "Дизайн-системы полезны",
  "design systems are helpful but speed is usually more important early on": "Дизайн-системы полезны, но скорость на первых порах обычно важнее.",
  "desktop is essential for deep work": "десктоп необходим для глубокой работы",
  "did you get a chance to check the qualitative feedback from our user testing sessions": "Удалось ли ознакомиться с качественными отзывами тестирования пользователей?",
  "diegetic": "диегетический (существующий внутри игрового мира)",
  "diegetic user interfaces": "диегетические интерфейсы (встроенные в сам мир игры)",
  "digital nomad density": "концентрация цифровых кочевников на квадратный километр",
  "dilemma": "дилемма / сложный выбор",
  "disbelief": "неверие / скептицизм",
  "dispenser": "кулер / дозатор для воды",
  "do you think clients will ever trust an ai tool to design an entire mobile banking app without human oversight": "Как думаешь, доверят ли клиенты когда-нибудь ИИ-инструменту проектирование целого мобильного банка без контроля человека?",
  "docked": "прикрепленный к краю экрана",
  "dominant": "доминирующий / преобладающий",
  "dont like crowded tourist clubs because prefer quiet beach sunsets": "Я не люблю многолюдные туристические клубы, потому что предпочитаю спокойные пляжные закаты.",
  "download": "скачивание / загрузка из сети",
  "dropdown": "выпадающий список",
  "e accept pple ay and credit cards with zero surcharge": "Мы принимаем Apple Pay и кредитные карты без комиссии!",
  "e accept pple ay and credit cards with zero surcharge our total is 135 000 rupiah": "Мы принимаем Apple Pay и банковские карты без всякой комиссии! С вас 135 000 рупий.",
  "e can grab a post workout coffee sometime or train together": "Можем как-нибудь выпить кофе после тренировки или потренить вместе.",
  "e can move dark mode into next weeks sprint": "Мы можем перенести темную тему на спринт следующей недели.",
  "e have a dedicated fiber optic line installed": "У нас установлена выделенная оптоволоконная линия.",
  "ead upstairs to table number 12 and we will bring your iced flat white and toast right up": "Поднимайтесь наверх за 12-й столик, мы сейчас принесем ваш заказ!",
  "eah brilliant idea y elegram is eliza dev hoot me a message and catch you around the gym enis": "Да, отличная идея! Мой Telegram — @eliza_dev. Черкни мне сообщение, и увидимся в зале, Денис!",
  "easehold agreements are basically long term prepaid rentals not real property ownership": "Договоры аренды лизхолд (leasehold) — это по сути долгосрочная предоплаченная аренда, а не реальное владение собственностью.",
  "edge cases and accessibility": "краевые сценарии и цифровая доступность",
  "editerranean safety and stability": "средиземноморская безопасность и стабильность",
  "efore unpack my luggage could we please check the internet connection": "Перед тем как распаковать багаж, можем проверить подключение к интернету?",
  "elcome to ali enis": "Добро пожаловать на Бали, Денис!",
  "elcome to ali enis elcome to illa ari here in ererenan ow was your drive from the airport verything is ready for your check in": "Добро пожаловать на Бали, Денис! Добро пожаловать на виллу Сари здесь, в Переренане. Как доехали из аэропорта? Всё готово к вашему заселению.",
  "elcome to illa ari here in ererenan": "Добро пожаловать на виллу Сари здесь, в Переренане.",
  "ell me about it": "И не говори! (Еще как!)",
  "ell me about it ack in yprus where lived the summer heat was strong but the air was dry ere in ali your t shirt is completely soaked after ten minutes of lifting": "И не говори! На Кипре, где я жил, летняя жара была сильной, но воздух был сухим. Здесь, на Бали, футболка насквозь мокрая уже через десять минут силовой тренировки!",
  "empathy": "эмпатия / сопереживание пользователю",
  "end me the updated igma link whenever you are ready": "Пришли мне обновленную ссылку на Figma, когда будешь готов.",
  "english grammar is logical": "Английская грамматика логична",
  "english grammar is logical but spoken confidence is the real challenge": "Английская грамматика логична, но настоящая трудность — уверенность в разговорной речи.",
  "enis manages three active client from alifornia and two project this month": "Денис ведет трех активных клиентов из Калифорнии и два проекта в этом месяце. (Ошибка: пропущены -s)",
  "enis manages three active clients from alifornia and two projects this month": "Денис ведет трех активных клиентов из Калифорнии и два проекта в этом месяце.",
  "enting vs uying roperty on ali he xpat ilemma": "Аренда против покупки недвижимости на Бали: дилемма экспата",
  "entrepreneur": "предприниматель",
  "entrepreneurs": "предприниматели",
  "environmental narrative": "повествование через окружение и мир игры",
  "ere are the network name and password on this card": "Вот имя сети и пароль на этой карточке.",
  "ere is my pple ay ould you please give me the receipt with the high speed i i password": "Вот, оплачиваю через Apple Pay. Не могли бы вы дать мне чек с паролем от скоростного Wi-Fi?",
  "ere you go he password is printed at the bottom ead upstairs to table number 12 and we will bring your iced flat white and toast right up": "Пожалуйста! Пароль напечатан внизу чека. Поднимайтесь на второй этаж за столик номер 12, мы скоро принесем ваш холодный флэт уайт и тост!",
  "erfect nd one last thing is there covered parking for a scooter am renting a amaha tomorrow morning": "Идеально. И последнее: есть ли крытая парковка для скутера? Завтра утром я беру в аренду Yamaha NMAX.",
  "ergonomic": "эргономичный (удобный для тела)",
  "ergonomic chairs": "эргономичные рабочие кресла",
  "ergonomics": "эргономика / удобство использования",
  "es alinese locals are exceptionally kind and welcoming to everyone": "Да, балийцы исключительно добры и приветливы ко всем.",
  "es exactly ever drink tap water he water dispenser is right next to the fridge hen a bottle is empty simply message our villa assistant on hats pp and a replacement is delivered within an hour": "Да, именно так. Никогда не пейте воду из-под крана. Кулер стоит прямо рядом с холодильником. Когда бутыль закончится, просто напишите нашему помощнику по вилле в WhatsApp, и замену доставят в течение часа.",
  "es exactly n the old layout the button was inline right beneath the payment fields n your new layout the button is a fixed sticky bar docked at the bottom of the screen hy is it placed there ur marketing lead is worried users will miss it": "Да, именно. В старом макете кнопка шла сразу под полями оплаты. В твоем новом макете кнопка закреплена плавающей панелью в самом низу экрана. Почему она там? Наш маркетолог боится, что пользователи ее пропустят.",
  "es igma is much faster and more modern than hotoshop for": "Да, Figma намного быстрее и современнее Фотошопа для интерфейсов.",
  "es ive test users completed the checkout prototype on aze our of them completed the flow in under eighty seconds he navigation confusion rate is practically zero": "Да! Пять пользователей прошли тестирование прототипа чекаута на платформе Maze. Четверо закончили сценарий быстрее чем за восемьдесят секунд. Процент путаницы в навигации практически нулевой.",
  "es my ac ook is extremely fast and handles complex graphics easily": "Да, мой MacBook чрезвычайно быстрый и легко справляется со сложной графикой.",
  "es my clients are demanding but they are very respectful": "Да, мои клиенты требовательные, но очень уважительные.",
  "es our front gate is lockable and the parking porch is fully covered from the tropical rain our scooter is totally safe there": "Да, наши въездные ворота закрываются на замок, а навес для парковки полностью защищает от тропического дождя. Ваш скутер там в полной безопасности.",
  "es remote work is more productive because unnecessary interruptions are rare": "Да, удаленная работа продуктивнее, потому что лишние отвлечения редки.",
  "es several of my close friends are living and working in yprus": "Да, несколько моих близких друзей живут и работают на Кипре.",
  "es sudden client changes are stressful unless clear boundaries are established": "Да, внезапные правки клиентов вызывают стресс, если не установлены четкие границы.",
  "es the cliff sunsets in luwatu are world famous and truly spectacular": "Да, закаты на утесах в Улувату известны на весь мир и поистине захватывающи.",
  "es the coffee is very hot and fresh": "Да, кофе очень горячий и свежий.",
  "es the fitness club is only five minutes away by motorbike": "Да, фитнес-клуб всего в пяти минутах езды на байке.",
  "es the roads are narrow and the scooter traffic is unpredictable": "Да, дороги узкие, а движение скутеров непредсказуемое.",
  "es the swimming pool is crystal clear and properly maintained": "Да, бассейн кристально чистый и за ним хорошо ухаживают.",
  "es there is a mesh repeater in the hallway so the signal is stable everywhere ere are the network name and password on this card": "Да, в коридоре установлен mesh-ретранслятор, так что сигнал везде стабильный. Вот название сети и пароль на этой карточке.",
  "es this rapid drill is intense and my speaking reflexes are getting faster": "Да, этот скоростной блиц интенсивный, и мои речевые рефлексы ускоряются!",
  "es typography is the backbone of great design because content is why users visit": "Да, типографика — основа отличного дизайна, ведь пользователи приходят именно ради контента.",
  "esign systems are helpful": "Дизайн-системы полезны",
  "esign systems are helpful but speed is usually more important early on": "Дизайн-системы полезны, но скорость на первых порах обычно важнее.",
  "ets exchange contacts re you on elegram or nstagram": "Давай обменяемся контактами. Ты есть в Telegram или Instagram?",
  "ever drink tap water": "Никогда не пейте воду из-под крана.",
  "everything is crystal clear i am very happy to be here": "Всё предельно ясно. Я очень рад быть здесь.",
  "everything is ready for your check in": "Всё готово к вашему заселению.",
  "excellent choice how would you like the poached eggs soft or medium": "Отличный выбор. Какой степени готовности сделать яйца пашот? Всмятку или средней проварки?",
  "excuse me are you using that incline bench press or can i jump in for a set": "Извини, ты делаешь жим на наклонной скамье или можно сделать подход с тобой?",
  "ey mate xcuse me are you using that incline bench press or can jump in for a set": "Привет, дружище! Извини, ты делаешь жим на наклонной скамье или можно сделать подход с тобой?",
  "ey o go right ahead just finished my final set he bench is all yours": "Привет! Нет, занимай, я как раз закончил последний подход. Скамья полностью твоя.",
  "eyesight": "зрение",
  "f we include both the scope is a bit tight": "Если делать обе задачи, объем работ будет очень плотным.",
  "f you had 300 000 to invest would you put it into a ali villa or keep it liquid in stocks": "Если бы у тебя было 300 000 долларов для инвестиций, ты бы вложил их в виллу на Бали или держал ликвидными в акциях?",
  "feedback": "обратная связь / отзыв / фидбек",
  "fiber": "оптоволокно / оптика",
  "fiber optic line": "оптоволоконная линия",
  "fields": "поля",
  "figma is much faster and more modern than photoshop for ui": "Figma намного быстрее и современнее Фотошопа для UI",
  "figma is the industry standard tool for digital product designers": "Figma — это общепризнанный стандарт для дизайнеров цифровых продуктов.",
  "figma it s the industry standard tool for digital product designers": "Figma — стандарт индустрии для дизайнеров цифровых продуктов. (Ошибка: лишнее it's)",
  "fitness": "фитнес / хорошая физическая форма",
  "fitness and healthy food scenes": "индустрия фитнеса и сообщество здоровой еды",
  "five test users completed the checkout prototype on maze": "Пять тестировщиков завершили прототип чекаута на Maze.",
  "flakes": "хлопья",
  "flexibility": "гибкость",
  "floral": "цветочный (о вкусовых нотах)",
  "follow an upper body and lower body split four days a week": "Я занимаюсь по сплиту на верх и низ тела четыре дня в неделю.",
  "follow an upper body and lower body split four days a week orning workouts are best for me because my design work requires deep mental focus in the afternoon": "Я занимаюсь по сплиту «верх/низ» четыре дня в неделю. Утренние тренировки подходят мне лучше всего, потому что дизайн требует глубокой умственной концентрации во второй половине дня.",
  "for remote tech entrepreneurs renting is far more sensible because mobility is our biggest asset": "Для удаленных IT-предпринимателей аренда гораздо разумнее, ведь мобильность — наш главный актив.",
  "for senior designers ai is a massive force multiplier rather than a replacement": "Для опытных дизайнеров ИИ — это мощный мультипликатор сил, а не замена.",
  "foreign ownership regulations": "правила владения недвижимостью для иностранцев (PMA)",
  "four of them completed the flow in under eighty seconds": "Четверо из них прошли весь сценарий менее чем за восемьдесят секунд.",
  "freehold": "полное право безусловной собственности",
  "freelance": "фриланс / свободная работа",
  "freelance freedom is liberating but self discipline is twice as important on a tropical island": "Свобода фриланса раскрепощает, но самодисциплина вдвое важнее на тропическом острове.",
  "freelancer": "фрилансер",
  "fridge": "холодильник",
  "from a designer s perspective diegetic game interfaces are fascinating because they blend seamlessly into the virtual universe": "С точки зрения дизайнера, диегетические интерфейсы в играх поразительны тем, что они бесшовно сливаются с виртуальной вселенной.",
  "gallon": "галлон (емкость около 4 литров / бутыль для кулера)",
  "gallon dispenser": "кулер для воды на 19 литров (галлонов)",
  "generative": "генеративный (создающий контент)",
  "generative ui workflows": "рабочие процессы генерации интерфейсов через ИИ",
  "generative workflows": "рабочие процессы генерации интерфейсов через ИИ",
  "go right ahead i just finished my final set": "давай конечно, я как раз закончил финальный подход",
  "go right ahead just finished my final set": "давай конечно, я как раз закончил финальный подход",
  "good ac is critical for deep sleep and focus": "хороший кондиционер критически важен для глубокого сна и концентрации",
  "good is critical for deep sleep and focus": "хороший кондиционер критически важен для глубокого сна и концентрации",
  "good morning could i please get an iced flat white with oat milk without any added syrup or sugar": "Доброе утро! Можно мне, пожалуйста, холодный флэт уайт на овсяном молоке, без добавления сиропа и сахара?",
  "good morning welcome to zin cafe what can i get started for you today": "Доброе утро! Добро пожаловать в Zin Cafe. Что я могу приготовить для вас сегодня?",
  "great what about the air conditioning is the bedroom ac unit whisper quiet during the night in cyprus it gets hot but i know bali is very humid so good ac is critical for deep sleep and focus": "Отлично. А что насчет кондиционера? Кондиционер в спальне работает бесшумно по ночам? На Кипре жарко, но я знаю, что на Бали высокая влажность, поэтому хороший кондиционер критически важен для глубокого сна и концентрации.",
  "greed id you get a chance to check the qualitative feedback from our user testing sessions": "Договорились! Удалось посмотреть качественный фидбек с наших сессий тестирования на пользователях?",
  "h that makes total sense for mobile ergonomics ut what happens when the virtual keyboard pops up while entering card details": "А, это действительно логично для мобильной эргономики. Но что происходит, когда выезжает экранная клавиатура при вводе данных карты?",
  "haha 100 i moved from melbourne three months ago and my body is still adjusting are you here on holiday or are you based in bali long term": "Ха-ха, на все 100%! Я переехала из Мельбурна три месяца назад, и тело до сих пор привыкает. Ты здесь в отпуске или обосновался на Бали надолго?",
  "hallway": "коридор / прихожая",
  "hank you liza verything is crystal clear am very happy to be here": "Спасибо, Элиза! Всё предельно понятно. Я очень рад быть здесь.",
  "hank you so much he drive was smooth though the traffic near anggu is quite intense efore unpack my luggage could we please check the internet connection s a digital product designer high speed fiber internet is absolutely essential for uploading heavy igma files and running client oom calls": "Большое спасибо! Доехали отлично, хотя пробки возле Чангу довольно плотные. Перед тем как распаковать вещи, можем проверить интернет? Я продуктовый дизайнер, и высокоскоростной оптоволоконный интернет мне критически необходим для выгрузки тяжелых файлов Figma и рабочих звонков в Zoom.",
  "hanks for jumping on oogle eet": "Спасибо, что подключился в Google Meet.",
  "hat are the top 3 things you inspect before committing to a 6 month villa rental": "Какие 3 главные вещи ты проверяешь перед тем, как подписаться на аренду виллы на 6 месяцев?",
  "hat are you most excited to experience in 6 when it finally launches": "Что больше всего тебе не терпится испытать в GTA 6, когда она наконец выйдет?",
  "hat can get started for you today": "Что я могу предложить вам сегодня?",
  "hat do you think will be the hardest lifestyle adjustment when you land in ali": "Что, по твоему мнению, станет самым трудным изменением в образе жизни после приземления на Бали?",
  "hat is a brilliant solution will explain that to our team ow about the revision requests in lack we also want a currency selector and a dark mode toggle an we deliver those before our riday sprint deadline": "Это блестящее решение! Я объясню это команде. Теперь насчет правок в Slack: мы также хотим переключатель валют и темную тему. Сможем сдать это до пятничного дедлайна спринта?",
  "hat is a natural concern but there is strong ergonomic reasoning behind it odern mobile screens are very tall he bottom area is directly inside the users natural thumb zone hen users hold a phone with one hand reaching the middle or top of the screen is physically awkward": "Это понятное опасение, но за этим решением стоит четкая эргономика. Современные экраны смартфонов очень вытянутые. Нижняя область находится прямо в естественной зоне досягаемости большого пальца. Когда держишь телефон одной рукой, тянуться к середине или верху экрана физически неудобно.",
  "hat is exactly what need": "Это ровно то, что мне нужно.",
  "hat is exactly what need s the quiet zone included with cafe orders or is a separate coworking pass required": "Это именно то, что мне нужно. Тихая зона входит в стоимость заказа в кафе или требуется отдельный абонемент в коворкинг?",
  "hat is outstanding news ou are doing fantastic work enis": "Это выдающиеся новости! Ты делаешь фантастическую работу, Денис.",
  "hat is outstanding news ou are doing fantastic work enis end me the updated igma link whenever you are ready": "Потрясающие новости! Ты делаешь отличную работу, Денис. Скинь обновленную ссылку на Figma, как только будешь готов.",
  "hat is plenty of bandwidth": "Это отличная пропускная способность!",
  "hat is plenty of bandwidth s the i i signal equally strong inside the master bedroom or is there a mesh repeater in the hallway": "Это отличная пропускная способность! Сигнал Wi-Fi такой же сильный в главной спальне, или в коридоре стоит mesh-ретранслятор?",
  "hat is very fair an pay by contactless credit card or is there an extra card surcharge": "Это очень справедливо. Могу я оплатить бесконтактной картой или есть дополнительная комиссия за безнал?",
  "hat is your daily rule for knowing when your working day is officially over": "Какое у тебя ежедневное правило, чтобы понимать, когда рабочий день официально завершен?",
  "hat is your workout routine like": "Как выглядит твоя программа тренировок?",
  "hat line of work are you in": "В какой сфере ты работаешь? Чем занимаешься?",
  "hat makes open world narrative masterpieces so emotionally memorable and how does game contribute to player immersion without cluttering the world": "Что делает сюжетные шедевры с открытым миром эмоционально запоминающимися и как игровой UI способствует погружению игрока, не перегружая мир?",
  "hat makes the storytelling in 5 or ed ead edemption 2 feel like a ollywood movie": "Что делает подачу сюжета в GTA 5 или Red Dead Redemption 2 похожей на голливудский фильм?",
  "hat sounds perfect ets exchange contacts re you on elegram or nstagram e can grab a post workout coffee sometime or train together": "Звучит идеально! Давай обменяемся контактами. Ты есть в Telegram или Instagram? Можем как-нибудь выпить кофе после тренировки или потренироваться вместе.",
  "have a great workout": "Отличной тренировки!",
  "have you found any good spots for high protein food": "ты нашел хорошие места с белковой едой?",
  "he bedroom is brand new and extremely quiet": "Кондиционер в спальне абсолютно новый и очень тихий.",
  "he bedroom is brand new and extremely quiet ou can set it to dry mode or cool mode with this remote control t cools down the room in just five minutes": "Кондиционер в спальне абсолютно новый и очень тихий. Вы можете переключить его в режим осушения или охлаждения с помощью этого пульта. Он охлаждает комнату буквально за пять минут.",
  "he bench is all yours": "Скамья полностью в твоем распоряжении.",
  "he bottom area is directly inside the users natural thumb zone": "Нижняя часть экрана находится прямо в естественной зоне досягаемости большого пальца.",
  "he call to action is always visible which directly reduces cart abandonment": "Кнопка действия всегда видна, что напрямую снижает долю брошенных корзин.",
  "he chairs are ergonomic power sockets are available at every single desk and the air conditioning is very cool": "Стулья эргономичные, розетки есть у каждого стола, и кондиционер отлично охлаждает.",
  "he currency selector is realistic to finish by hursday afternoon": "Переключатель валют реально доделать к вечеру четверга.",
  "he currency selector is top priority because our uropean release is next week": "Селектор валюты в приоритете, потому что европейский релиз на следующей неделе.",
  "he currency selector is top priority because our uropean release is next week ark mode is just a nice to have": "Переключатель валют в приоритете, потому что европейский релиз уже на следующей неделе. Темная тема — это просто приятное дополнение.",
  "he deposit is 3 million rupiah": "Депозит составляет 3 миллиона рупий.",
  "he deposit is 3 million rupiah n your departure day our team inspects the villa and the deposit is refunded immediately in cash or via ise transfer": "Депозит составляет 3 миллиона рупий. В день вашего отъезда наша команда проверит виллу, и залог вернут сразу наличными или переводом через Wise.",
  "he download speed is around 150 bps and the upload speed is roughly 50 bps": "Скорость скачивания около 150 Мбит/с, а скорость отдачи примерно 50 Мбит/с.",
  "he drive was smooth though the traffic near anggu is quite intense": "Доехали отлично, хотя движение возле Чангу довольно плотное.",
  "he food and cafe scene in ali is unmatched for anyone who loves healthy nutrition and specialty coffee": "Сфера кафе и ресторанов на Бали не имеет равных для всех, кто любит здоровое питание и спешелти-кофе.",
  "he humidity in this gym is intense this afternoon": "Влажность в зале сегодня днем просто запредельная.",
  "he navigation confusion rate is practically zero": "Процент путаницы в навигации практически нулевой.",
  "he password is printed at the bottom": "Пароль напечатан внизу чека.",
  "he router is right here in the living room": "Роутер прямо здесь, в гостиной.",
  "he thiopian beans are light with subtle floral notes": "Эфиопские зерна легкие, с тонкими цветочными нотками.",
  "he uture of enerative in roduct esign": "Будущее генеративного ИИ в дизайне продуктов и интерфейсов",
  "he villa in ererenan is quiet and surrounded by green rice fields": "Вилла в Переренане тихая и окружена зелеными рисовыми полями.",
  "he villa in ererenan its quiet and surrounded by green rice fields": "Вилла в Переренане тихая и окружена рисовыми полями. (Ошибка: лишнее it's)",
  "he visual polish is incredible but our marketing team has a few concerns about the main button placement": "Визуальная полировка невероятна, но у маркетинга есть пара вопросов к расположению главной кнопки.",
  "he water dispenser is right next to the fridge": "Кулер с водой стоит прямо рядом с холодильником.",
  "he weather in anggu is hot and tropical today": "Погода в Чангу сегодня жаркая и тропическая.",
  "he weather in anggu its hot and tropical today": "Погода в Чангу жаркая и тропическая сегодня. (Ошибка: лишнее it's)",
  "head upstairs to table number 12 and we will bring your iced flat white and toast right up": "Поднимайтесь наверх за 12-й столик, мы сейчас принесем ваш заказ!",
  "hen a bottle is empty simply message our villa assistant on hats pp and a replacement is delivered within an hour": "Когда бутыль опустеет, просто напишите нашему помощнику по вилле в WhatsApp, и замену доставят в течение часа.",
  "hen the virtual keyboard appears inline buttons often get pushed completely off screen below the fold ur sticky button smoothly anchors right above the keyboard he call to action is always visible which directly reduces cart abandonment": "Когда появляется экранная клавиатура, обычные кнопки часто улетают за пределы видимости экрана. Наша закрепленная кнопка плавно фиксируется прямо над клавиатурой. Призыв к действию всегда на виду, что напрямую снижает процент брошенных корзин.",
  "here are four modern coworking space and five good gym in this neighborhood": "В этом районе четыре современных коворкинга и пять хороших залов. (Ошибка: пропущены -s)",
  "here are four modern coworking spaces and five good gyms in this neighborhood": "В этом районе четыре современных коворкинга и пять отличных залов.",
  "here are the network name and password on this card": "Вот имя сети и пароль на этой карточке.",
  "here are your favorite places for clean nutrition around here": "Где твои любимые места со здоровой чистой едой здесь?",
  "here is my apple pay could you please give me the receipt with the high speed wi fi password": "Вот, оплачиваю через Apple Pay. Не могли бы вы дать мне чек с паролем от скоростного Wi-Fi?",
  "here you go the password is printed at the bottom head upstairs to table number 12 and we will bring your iced flat white and toast right up": "Пожалуйста! Пароль напечатан внизу чека. Поднимайтесь на второй этаж за столик номер 12, мы скоро принесем ваш холодный флэт уайт и тост!",
  "hey mate excuse me are you using that incline bench press or can i jump in for a set": "Привет, дружище! Извини, ты делаешь жим на наклонной скамье или можно сделать подход с тобой?",
  "hey no go right ahead i just finished my final set the bench is all yours": "Привет! Нет, занимай, я как раз закончил последний подход. Скамья полностью твоя.",
  "hi denis thanks for jumping on google meet i reviewed the latest figma prototype for our mobile checkout flow the visual polish is incredible but our marketing team has a few concerns about the main button placement": "Привет, Денис! Спасибо, что подключился в Google Meet. Я посмотрела свежий прототип в Figma для мобильного чекаута. Визуальная полировка потрясающая, но у нашего маркетинга есть пара вопросов по поводу расположения главной кнопки.",
  "hi eliza great to see you thank you for the compliments let s look at the mobile screen together you are referring to the primary complete purchase cta button correct": "Привет, Элиза, рад видеть! Спасибо за комплимент. Давай вместе посмотрим на экран. Ты имеешь в виду главную CTA-кнопку «Оформить заказ», верно?",
  "hich feature is the highest priority for your developers right now": "Какая функция сейчас в наивысшем приоритете для разработчиков?",
  "high speed fiber internet is absolutely essential for uploading heavy figma files and running client zoom calls": "высокоскоростной оптоволоконный интернет абсолютно необходим для загрузки тяжелых файлов Figma и созвонов с клиентами в Zoom",
  "high speed fiber internet is absolutely essential for uploading heavy igma files and running client oom calls": "высокоскоростной оптоволоконный интернет абсолютно необходим для загрузки тяжелых файлов Figma и созвонов с клиентами в Zoom",
  "his design portfolio is full of modern mobile applications": "Его портфолио дизайна полно современных мобильных приложений.",
  "his design portfolio it s full of modern mobile applications": "Его дизайнерское портфолио полно современных мобильных приложений. (Ошибка: лишнее it's)",
  "hollywood": "голливудский",
  "hoot me a message and catch you around the gym enis": "Черкни мне сообщение, и до встречи в спортзале, Денис!",
  "how do you handle demanding clients who send urgent slack messages on weekends": "Как ты справляешься с требовательными клиентами, которые присылают срочные сообщения в Slack по выходным?",
  "how do you maintain ironclad professional discipline and meet strict western deadlines when living in a tropical paradise where everyone is chilling on the beach": "Как сохранять железную профессиональную дисциплину и соблюдать жесткие западные дедлайны, живя в тропическом раю, где все отдыхают на пляже?",
  "how do you personally use ai in your daily design routine right now": "Как ты лично используешь ИИ в своей повседневной работе дизайнера прямо сейчас?",
  "how does mediterranean expat life cyprus compare to southeast asian tropical hub life bali for career growth health and daily well being": "Как жизнь средиземноморского экспата на Кипре сравнивается с жизнью в тропическом хабе на Бали с точки зрения роста карьеры, здоровья и качества жизни?",
  "how much is the deposit and is it fully refundable on my checkout date": "сколько составляет депозит и возвращается ли он полностью в день выезда?",
  "how was your drive from the airport": "Как вы доехали из аэропорта?",
  "how would you like the poached eggs soft or medium": "Как приготовить яйца пашот? Всмятку или средней проварки?",
  "however genuine human taste and empathy are irreplaceable because algorithms don t understand emotional nuances": "Однако истинный человеческий вкус и эмпатия незаменимы, поскольку алгоритмы не понимают эмоциональных нюансов.",
  "hub": "узловой центр / хаб активности",
  "human empathy and taste": "человеческая эмпатия и чувство вкуса",
  "humid": "влажный (о климате)",
  "humidity": "влажность воздуха",
  "hy eep tory ames ike and yberpunk ucceed orldwide": "Почему глубокие сюжетные игры вроде GTA и Cyberpunk успешны во всем мире",
  "hy is it placed there": "Почему она расположена именно там?",
  "i am actually looking for recommendations right now where are your favorite places for clean nutrition around here": "Как раз ищу рекомендации! Где твои любимые места со здоровой и полезной едой поблизости?",
  "i am based here long term probably for at least six to twelve months": "Я здесь надолго, скорее всего как минимум на 6-12 месяцев.",
  "i am based here long term probably for at least six to twelve months i work remotely as a digital product and ui designer what line of work are you in": "Я обосновался здесь надолго, минимум на полгода-год. Работаю удаленно продуктовым и UI-дизайнером. А в какой сфере работаешь ты?",
  "i am dining in and i plan to work on my laptop for a few hours i have two client zoom calls this afternoon is there a quiet air conditioned workspace upstairs or is it noisy during peak hours": "Я буду здесь и планирую поработать на ноутбуке пару часов. Сегодня днем у меня два созвона с клиентами в Zoom. Наверху есть тихая рабочая зона с кондиционером, или в часы пик там шумно?",
  "i am renting a yamaha nmax tomorrow morning": "Завтра утром я беру в аренду Yamaha NMAX.",
  "i completely understand we have a dedicated fiber optic line installed the router is right here in the living room the download speed is around 150 mbps and the upload speed is roughly 50 mbps": "Прекрасно вас понимаю! У нас проведена выделенная оптоволоконная линия. Роутер прямо здесь, в гостиной. Скорость скачивания около 150 Мбит/с, а отдача — примерно 50 Мбит/с.",
  "i don t like crowded tourist clubs because i prefer quiet beach sunsets": "Я не люблю многолюдные туристические клубы, потому что предпочитаю спокойные пляжные закаты.",
  "i enis hanks for jumping on oogle eet reviewed the latest igma prototype for our mobile checkout flow he visual polish is incredible but our marketing team has a few concerns about the main button placement": "Привет, Денис! Спасибо, что подключился в Google Meet. Я посмотрела свежий прототип в Figma для мобильного чекаута. Визуальная полировка потрясающая, но у нашего маркетинга есть пара вопросов по поводу расположения главной кнопки.",
  "i follow an upper body and lower body split four days a week": "Я занимаюсь по сплиту на верх и низ тела четыре дня в неделю.",
  "i follow an upper body and lower body split four days a week morning workouts are best for me because my design work requires deep mental focus in the afternoon": "Я занимаюсь по сплиту «верх/низ» четыре дня в неделю. Утренние тренировки подходят мне лучше всего, потому что дизайн требует глубокой умственной концентрации во второй половине дня.",
  "i know tap water in bali isn t potable": "Я знаю, что вода из-под крана на Бали не питьевая.",
  "i liza great to see you hank you for the compliments ets look at the mobile screen together ou are referring to the primary omplete urchase button correct": "Привет, Элиза, рад видеть! Спасибо за комплимент. Давай вместе посмотрим на экран. Ты имеешь в виду главную CTA-кнопку «Оформить заказ», верно?",
  "i m a full stack engineer working remotely for an australian startup": "Я фулстек-инженер, работаю удаленно на австралийский стартап.",
  "i m not like crowded tourist clubs because i m prefer quiet beach sunsets": "Я не люблю шумные туристические клубы, потому что предпочитаю спокойные закаты на пляже. (Ошибка: I'm not like)",
  "i moved from melbourne three months ago and my body is still adjusting": "Я переехала из Мельбурна три месяца назад, и организм всё еще адаптируется.",
  "i plan to work on my laptop for a few hours": "Я планирую поработать на ноутбуке пару часов.",
  "i reviewed the latest figma prototype for our mobile checkout flow": "Я посмотрела последний прототип в Figma для нашего мобильного оформления заказа.",
  "i will build the dropdown component with all hover and active states": "Я соберу выпадающий список со всеми состояниями hover и active.",
  "i will ping you on slack by thursday 3 pm cet": "Я черкну тебе в Slack в четверг к 15:00 по европейскому времени.",
  "i work remotely as a digital product and ui designer": "Я работаю удаленно дизайнером цифровых продуктов и UI.",
  "i would like the sourdough avocado toast with two poached eggs": "Я бы хотел авокадо-тост на закваске с двумя яйцами пашот.",
  "iced flat white": "холодный флэт уайт (кофе со льдом и молоком)",
  "id you get a chance to check the qualitative feedback from our user testing sessions": "Удалось ли ознакомиться с качественными отзывами тестирования пользователей?",
  "if we include both the scope is a bit tight": "Если делать обе задачи, объем работ будет очень плотным.",
  "if you had 300 000 to invest would you put it into a bali villa or keep it liquid in stocks": "Если бы у тебя было 300 000 долларов для инвестиций, ты бы вложил их в виллу на Бали или держал ликвидными в акциях?",
  "igma is much faster and more modern than hotoshop for": "Figma намного быстрее и современнее Фотошопа для UI",
  "igma is the industry standard tool for digital product designers": "Figma — это общепризнанный стандарт для дизайнеров цифровых продуктов.",
  "igma its the industry standard tool for digital product designers": "Figma — стандарт индустрии для дизайнеров цифровых продуктов. (Ошибка: лишнее it's)",
  "ill do liza will ping you on lack by hursday 3 ave a great day": "Обязательно, Элиза! Напишу тебе в Slack в четверг к 15:00 CET. Хорошего дня!",
  "ill plugins and prompt tools replace designers or will they simply eliminate mundane layout work and turn designers into strategic rt irectors and ystems hinkers": "Заменят ли ИИ-плагины и промпты дизайнеров интерфейсов, или они просто уничтожат рутинную верстку макетов и превратят дизайнеров в стратегических арт-директоров и системных мыслителей?",
  "immersion": "погружение в атмосферу",
  "immersive": "создающий эффект полного погружения",
  "immersive storytelling": "повествование с полным погружением",
  "improv": "импровизация",
  "in consumer markets mobile apps are dominant": "На массовом рынке мобильные приложения доминируют",
  "in consumer markets mobile apps are dominant but desktop is essential for deep work": "В потребительском сегменте доминируют мобильные приложения, но десктоп незаменим для серьезной работы.",
  "in my opinion basic layout generation is already becoming commoditized by ai tools": "На мой взгляд, базовая генерация макетов уже обесценивается и превращается в рутину из-за ИИ-инструментов.",
  "in which country do you think you will be more productive as a designer and why": "В какой стране, по твоему мнению, ты будешь более продуктивен как дизайнер и почему?",
  "in your new layout the button is a fixed sticky bar docked at the bottom of the screen": "В твоем новом макете кнопка зафиксирована плавающей панелью внизу экрана.",
  "incline": "наклонный",
  "incline bench press": "жим штанги или гантелей на наклонной скамье",
  "industry": "индустрия / отрасль",
  "ingle origin thiopian beans sound great lets do that": "Эфиопский моносорт звучит отлично, давайте его!",
  "ingle origin thiopian beans sound great lets do that nd for food would like the sourdough avocado toast with two poached eggs": "Эфиопский моносорт звучит отлично, давайте его! А из еды я бы хотел авокадо-тост на закваске с двумя яйцами пашот.",
  "inline": "встроенный в строку / в потоке контента",
  "inline buttons often get pushed completely off screen below the fold": "кнопки внутри контента часто выталкиваются за пределы видимости экрана",
  "inspect": "осматривать / инспектировать",
  "inspects": "осматривает / проверяет",
  "intelligence": "интеллект",
  "intense": "интенсивный",
  "interruption": "отвлечение внимания",
  "interruptions": "отвлечения / перебивания",
  "is bali expensive right now": "Дорого ли сейчас на Бали?",
  "is buying a 25 30 year leasehold villa on bali a smart financial investment or is flexible monthly annual renting far superior for digital creators": "Является ли покупка виллы в лизхолд на 25-30 лет на Бали разумной инвестицией, или гибкая помесячная аренда намного выгоднее для цифровых креаторов?",
  "is clean typography the most important element of ui": "Является ли аккуратная типографика важнейшим элементом интерфейса?",
  "is dark mode really healthier for your eyes": "Действительно ли темный режим полезнее для глаз?",
  "is design portfolio is full of modern mobile applications": "Его портфолио дизайна полно современных мобильных приложений.",
  "is design portfolio its full of modern mobile applications": "Его дизайнерское портфолио полно современных мобильных приложений. (Ошибка: лишнее it's)",
  "is english grammar difficult for russian speakers": "Сложна ли английская грамматика для русскоговорящих?",
  "is figma better than photoshop for ui design": "Figma лучше Фотошопа для дизайна интерфейсов?",
  "is remote work more productive than working in an office": "Удаленная работа продуктивнее, чем работа в офисе?",
  "is the bedroom ac unit whisper quiet during the night": "Кондиционер в спальне работает бесшумно ночью?",
  "is the coffee hot": "Горячий ли кофе?",
  "is the quiet zone included with cafe orders or is a separate coworking pass required": "Тихая зона включена в заказ в кафе или нужен отдельный пропуск в коворкинг?",
  "is the swimming pool in your villa clean": "Чистый ли бассейн на твоей вилле?",
  "is the wi fi signal equally strong inside the master bedroom or is there a mesh repeater in the hallway": "Сигнал Wi-Fi такой же сильный в главной спальне, или в коридоре стоит mesh-ретранслятор?",
  "is there a gallon water dispenser in the kitchen with both hot and cold water": "Есть ли на кухне кулер с горячей и холодной водой?",
  "is there a quiet air conditioned workspace upstairs or is it noisy during peak hours": "Есть ли наверху тихое рабочее место с кондиционером или там шумно в часы пик?",
  "is there covered parking for a scooter": "есть ли крытая парковка для скутера?",
  "is this speaking blitz effective for building your reflexes": "Эффективен ли этот разговорный блиц для выработки рефлексов речи?",
  "is your gym close to your accommodation": "Твой спортзал близко к жилью?",
  "is your macbook fast enough for heavy rendering": "Достаточно ли быстр твой MacBook для тяжелого рендеринга?",
  "it cools down the room in just five minutes": "Он охлаждает комнату всего за пять минут.",
  "it feels like half the people in canggu are tech expats": "Такое чувство, что половина людей в Чангу — айтишники-экспаты!",
  "ive test users completed the checkout prototype on aze": "Пять тестировщиков завершили прототип чекаута на Maze.",
  "iving in yprus vs iving in ali omparison": "Жизнь на Кипре против жизни на Бали: сравнение",
  "know tap water in ali isnt potable": "Я знаю, что вода из-под крана на Бали не питьевая.",
  "leasehold": "долгосрочная аренда земли или недвижимости",
  "leasehold agreements are basically long term prepaid rentals not real property ownership": "Договоры аренды лизхолд (leasehold) — это по сути долгосрочная предоплаченная аренда, а не реальное владение собственностью.",
  "leasehold vs freehold": "долгосрочная аренда (leasehold) против безусловной собственности (freehold)",
  "let s exchange contacts are you on telegram or instagram": "Давай обменяемся контактами. Ты есть в Telegram или Instagram?",
  "liberating": "освобождающий / дарующий свободу",
  "lient management is 80 about clear expectation setting before the sprint starts": "Управление клиентами на 80% состоит из четкого согласования ожиданий до начала спринта.",
  "lifestyle flexibility": "гибкость образа жизни",
  "lifting": "подъем тяжестей / силовая тренировка",
  "liquidity": "ликвидность (легкость продажи актива)",
  "lively": "оживленный / шумный",
  "living in cyprus vs living in bali a comparison": "Жизнь на Кипре против жизни на Бали: сравнение",
  "lockable": "запирающийся на ключ / замок",
  "lower": "нижний",
  "luggage": "багаж / чемоданы",
  "m a full stack engineer working remotely for an ustralian startup": "Я фулстек-инженер, работаю удаленно на австралийский стартап.",
  "m not like crowded tourist clubs because m prefer quiet beach sunsets": "Я не люблю шумные туристические клубы, потому что предпочитаю спокойные закаты на пляже. (Ошибка: I'm not like)",
  "many foreign expat love living in bali because the island offer many benefit": "Многие иностранные экспаты любят жить на Бали, потому что остров дает много преимуществ. (Ошибка: пропущены окончания -s)",
  "many foreign expats love living in bali because the island offers many benefits": "Многие иностранные экспаты любят жить на Бали, потому что остров дает множество преимуществ.",
  "mediterranean": "средиземноморский",
  "mediterranean safety and stability": "средиземноморская безопасность и стабильность",
  "mesh": "ячеистая Wi-Fi сеть",
  "modern mobile screens are very tall": "Современные экраны мобильных телефонов очень вытянутые.",
  "moisture": "сырость / влага",
  "morning workouts are best for me because my design work requires deep mental focus in the afternoon": "Утренние тренировки лучше всего для меня, так как дизайн требует глубокого ментального фокуса днем.",
  "moved from elbourne three months ago and my body is still adjusting": "Я переехала из Мельбурна три месяца назад, и организм всё еще адаптируется.",
  "multiplier": "множитель / усилитель",
  "my ac ook is extremely fast and handles complex graphics easily": "мой MacBook чрезвычайно быстрый и легко тянет сложную графику",
  "my backend developer doesn t have the api credentials for the production server": "У моего бэкенд-разработчика нет учетных данных API для боевого сервера.",
  "my backend developer he not have the api credentials for the production server": "У моего бэкенд-разработчика нет доступов к API для продакшн-сервера. (Ошибка: he not have)",
  "my clients are demanding but they are very respectful": "мои клиенты требовательны, но очень уважительны",
  "my favorite game series is grand theft auto because the attention to world detail is second to none": "Моя любимая серия игр — Grand Theft Auto, потому что внимание к деталям мира в ней не имеет равных.",
  "my macbook is brand new and very powerful for 3d graphics": "Мой MacBook абсолютно новый и очень мощный для 3D-графики.",
  "my macbook is extremely fast and handles complex graphics easily": "мой MacBook чрезвычайно быстрый и легко тянет сложную графику",
  "my macbook it s brand new and very powerful for 3d graphics": "Мой MacBook новенький и очень мощный для 3D-графики. (Ошибка: лишнее it's)",
  "n consumer markets mobile apps are dominant": "На массовом рынке мобильные приложения доминируют",
  "n consumer markets mobile apps are dominant but desktop is essential for deep work": "В потребительском сегменте доминируют мобильные приложения, но десктоп незаменим для серьезной работы.",
  "n my opinion basic layout generation is already becoming commoditized by tools": "На мой взгляд, базовая генерация макетов уже обесценивается и превращается в рутину из-за ИИ-инструментов.",
  "n which country do you think you will be more productive as a designer and why": "В какой стране, по твоему мнению, ты будешь более продуктивен как дизайнер и почему?",
  "n your new layout the button is a fixed sticky bar docked at the bottom of the screen": "В твоем новом макете кнопка зафиксирована плавающей панелью внизу экрана.",
  "narrative": "повествование / сюжет",
  "narrow": "узкий (о дороге)",
  "nderstood egarding the security deposit how much is the deposit and is it fully refundable on my checkout date": "Понял. Что касается страхового депозита: сколько составляет залог и возвращается ли он полностью в день выезда?",
  "nderstood he currency selector is realistic to finish by hursday afternoon will build the dropdown component with all hover and active states e can move dark mode into next weeks sprint": "Понял. Переключатель валют вполне реально закончить к вечеру четверга. Я соберу компонент выпадающего списка со всеми состояниями hover и active. А темную тему перенесем на спринт следующей недели.",
  "never drink tap water": "Никогда не пейте воду из-под крана.",
  "nglish grammar is logical": "Английская грамматика логична",
  "nglish grammar is logical but spoken confidence is the real challenge": "Английская грамматика логична, но настоящая трудность — уверенность в разговорной речи.",
  "no bali is still relatively affordable compared to europe": "Нет, Бали всё еще относительно доступен по сравнению с Европой.",
  "northern beaches are quiet": "северные пляжи тихие",
  "nuance": "нюанс",
  "nuances": "тонкие нюансы",
  "nutrition": "питание / рацион",
  "o ali is still relatively affordable compared to urope": "Нет, Бали всё еще относительно доступен по сравнению с Европой.",
  "o you think clients will ever trust an tool to design an entire mobile banking app without human oversight": "Как думаешь, доверят ли клиенты когда-нибудь ИИ-инструменту проектирование целого мобильного банка без контроля человека?",
  "odern mobile screens are very tall": "Современные экраны мобильных телефонов очень вытянутые.",
  "oft poached is ideal with a pinch of chili flakes on top if possible": "Всмятку — идеально, со щепоткой чили сверху, если можно.",
  "ome popular beaches are crowded": "Некоторые популярные пляжи переполнены людьми",
  "ome popular beaches are crowded but northern beaches are quiet": "Некоторые популярные пляжи многолюдны, но северные пляжи тихие.",
  "ood morning elcome to in afe hat can get started for you today": "Доброе утро! Добро пожаловать в Zin Cafe. Что я могу приготовить для вас сегодня?",
  "ood morning ould please get an iced flat white with oat milk without any added syrup or sugar": "Доброе утро! Можно мне, пожалуйста, холодный флэт уайт на овсяном молоке, без добавления сиропа и сахара?",
  "open world games are compelling because player agency and freedom are at the heart of the experience": "Игры с открытым миром притягательны, так как свобода выбора и воля игрока лежат в основе игрового опыта.",
  "or remote tech entrepreneurs renting is far more sensible because mobility is our biggest asset": "Для удаленных IT-предпринимателей аренда гораздо разумнее, ведь мобильность — наш главный актив.",
  "or senior designers is a massive force multiplier rather than a replacement": "Для опытных дизайнеров ИИ — это мощный мультипликатор сил, а не замена.",
  "orning workouts are best for me because my design work requires deep mental focus in the afternoon": "Утренние тренировки лучше всего для меня, так как дизайн требует глубокого ментального фокуса днем.",
  "ou are referring to the primary omplete urchase button correct": "Ты имеешь в виду главную кнопку призыва к действию 'Оформить покупку', верно?",
  "ou can set it to dry mode or cool mode with this remote control": "Вы можете установить режим осушения или охлаждения этим пультом.",
  "ou got it re you dining in today or is this order for takeaway": "Принято. Вы будете есть здесь или заказ с собой?",
  "ou must check out otion afe on atu olong": "Ты просто обязан зайти в Motion Cafe на улице Бату Болонг",
  "ou must check out otion afe on atu olong their protein pancakes and chicken bowls are incredible nd for local food arung u i is delicious cheap and fresh": "Обязательно загляни в Motion Cafe на Бату Болонг — их протеиновые панкейки и боулы с курицей просто невероятные. А из местной кухни — в Warung Bu Mi очень вкусно, дешево и свежо.",
  "ould please get an iced flat white with oat milk without any added syrup or sugar": "Можно мне, пожалуйста, холодный флэт уайт на овсяном молоке, без сиропа и сахара?",
  "ould you like our house espresso blend or single origin thiopian beans": "Хотите наш фирменный бленд эспрессо или эфиопский моносорт?",
  "ould you please give me the receipt with the high speed i i password": "Дайте, пожалуйста, чек с паролем от скоростного Wi-Fi.",
  "ounds good liza ave a great workout": "Договорились, Элиза! Отличной тренировки!",
  "our front gate is lockable and the parking porch is fully covered from the tropical rain": "наши въездные ворота запираются, а навес для парковки полностью укрывает от тропического дождя",
  "our ground floor is a bit lively with music but our second floor is a dedicated quiet focus zone the chairs are ergonomic power sockets are available at every single desk and the air conditioning is very cool": "На первом этаже довольно оживленно играет музыка, но наш второй этаж — это специальная тихая зона для концентрации. Кресла эргономичные, розетки есть у каждого стола, и кондиционер отлично охлаждает.",
  "our marketing lead is worried users will miss it": "Наш маркетолог переживает, что пользователи её не заметят.",
  "our of them completed the flow in under eighty seconds": "Четверо из них прошли весь сценарий менее чем за восемьдесят секунд.",
  "our scooter is totally safe there": "Ваш скутер там в полной безопасности.",
  "our second floor is a dedicated quiet focus zone": "наш второй этаж — это выделенная тихая зона для фокуса",
  "our sprint deadline is this friday at 5 pm if we include both the scope is a bit tight which feature is the highest priority for your developers right now": "Дедлайн спринта — в эту пятницу в 17:00. Если брать обе задачи, объем будет слишком плотным. Какая из функций сейчас в приоритете для ваших разработчиков?",
  "our sticky button smoothly anchors right above the keyboard": "Наша закрепленная кнопка плавно фиксируется прямо над клавиатурой.",
  "our total is 135 000 rupiah": "Ваш итог — 135 000 рупий.",
  "outstanding": "выдающийся / великолепный",
  "overlap": "пересечение / наложение",
  "oversight": "надзор / человеческий контроль",
  "ow do you handle demanding clients who send urgent lack messages on weekends": "Как ты справляешься с требовательными клиентами, которые присылают срочные сообщения в Slack по выходным?",
  "ow do you maintain ironclad professional discipline and meet strict estern deadlines when living in a tropical paradise where everyone is chilling on the beach": "Как сохранять железную профессиональную дисциплину и соблюдать жесткие западные дедлайны, живя в тропическом раю, где все отдыхают на пляже?",
  "ow do you personally use in your daily design routine right now": "Как ты лично используешь ИИ в своей повседневной работе дизайнера прямо сейчас?",
  "ow does editerranean expat life yprus compare to outheast sian tropical hub life ali for career growth health and daily well being": "Как жизнь средиземноморского экспата на Кипре сравнивается с жизнью в тропическом хабе на Бали с точки зрения роста карьеры, здоровья и качества жизни?",
  "ow was your drive from the airport": "Как вы доехали из аэропорта?",
  "ow would you like the poached eggs oft or medium": "Как приготовить яйца пашот? Всмятку или средней проварки?",
  "owever genuine human taste and empathy are irreplaceable because algorithms dont understand emotional nuances": "Однако истинный человеческий вкус и эмпатия незаменимы, поскольку алгоритмы не понимают эмоциональных нюансов.",
  "pace": "темп / ритм жизни",
  "pace of daily life": "ритм повседневной жизни",
  "pancakes": "блинчики / панкейки",
  "pen world games are compelling because player agency and freedom are at the heart of the experience": "Игры с открытым миром притягательны, так как свобода выбора и воля игрока лежат в основе игрового опыта.",
  "perfect and one last thing is there covered parking for a scooter i am renting a yamaha nmax tomorrow morning": "Идеально. И последнее: есть ли крытая парковка для скутера? Завтра утром я беру в аренду Yamaha NMAX.",
  "perspective": "точка зрения / ракурс / перспектива",
  "plan to work on my laptop for a few hours": "Я планирую поработать на ноутбуке пару часов.",
  "player agency and choices": "свобода воли и выбор игрока",
  "poached": "пашот (сваренное без скорлупы)",
  "porch": "крыльцо / веранда / навес",
  "portfolio": "портфолио",
  "potable": "питьевой (пригодный для питья)",
  "potable water": "питьевая вода (безопасная для питья)",
  "power sockets": "электрические розетки",
  "ppreciate it mate ood session today he humidity in this gym is intense this afternoon": "Спасибо, дружище! Как тренировка сегодня? Влажность в зале этим днем просто зашкаливает.",
  "prepaid": "предоплаченный",
  "press": "жим",
  "preventing scope creep": "предотвращение раздувания объема задач",
  "priorities": "приоритеты",
  "priority": "приоритет",
  "production": "рабочий сервер (прод)",
  "productive": "продуктивный",
  "prototype": "интерактивный прототип",
  "prototypes": "прототипы",
  "qualitative": "качественный (о глубинных исследованиях)",
  "quantifier": "количественное числительное",
  "quantifiers": "количественные слова (two, three)",
  "quantitative": "количественный",
  "quiet focus zone": "тихая зона для глубокой концентрации",
  "re design systems necessary for early stage startups": "Необходимы ли дизайн-системы для стартапов на ранней стадии?",
  "re freelance deadlines stressful when requirements change": "Вызывают ли дедлайны на фрилансе стресс при смене требований?",
  "re mobile apps more popular than desktop websites today": "Популярнее ли мобильные приложения, чем десктопные сайты сегодня?",
  "re ndonesian locals friendly to foreign digital nomads": "Дружелюбны ли местные индонезийцы к иностранным цифровым кочевникам?",
  "re sunset views in luwatu breathtaking": "Захватывают ли дух закаты в Улувату?",
  "re the beaches in ali crowded": "Многолюдны ли пляжи на Бали?",
  "re the roads in anggu dangerous for beginners": "Опасны ли дороги в Чангу для новичков?",
  "re you dining in today or is this order for takeaway": "Вы здесь или заказ с собой?",
  "re you here on holiday or are you based in ali long term": "Ты здесь на отдыхе или обосновался на Бали на долгий срок?",
  "re your clients demanding": "Требовательны ли твои клиенты?",
  "re your close friends in yprus right now": "Твои близкие друзья сейчас на Кипре?",
  "reaching the middle or top of the screen is physically awkward": "тянуться к середине или верху экрана физически неудобно",
  "reat hat about the air conditioning s the bedroom unit whisper quiet during the night n yprus it gets hot but know ali is very humid so good is critical for deep sleep and focus": "Отлично. А что насчет кондиционера? Кондиционер в спальне работает бесшумно по ночам? На Кипре жарко, но я знаю, что на Бали высокая влажность, поэтому хороший кондиционер критически важен для глубокого сна и концентрации.",
  "receipt": "чек об оплате",
  "redundant": "избыточный / лишний",
  "reelance freedom is liberating but self discipline is twice as important on a tropical island": "Свобода фриланса раскрепощает, но самодисциплина вдвое важнее на тропическом острове.",
  "reflex": "речевой рефлекс",
  "reflexes": "рефлексы / быстрота реакции",
  "refundable": "возвратный (о залоге)",
  "regulation": "правило / регламент",
  "regulations": "нормативные акты / правила",
  "remote": "удаленный / дистанционный / пульт",
  "remote work is more productive because unnecessary interruptions are rare": "удаленка продуктивнее, потому что пустые отвлечения случаются редко",
  "rendering": "рендеринг / визуализация 3D и видео",
  "renting": "аренда / снимающий в аренду",
  "renting vs buying property on bali the expat dilemma": "Аренда против покупки недвижимости на Бали: дилемма экспата",
  "repeater": "ретранслятор / усилитель сигнала",
  "replacement": "замена / новая бутыль",
  "return on investment": "окупаемость инвестиций (ROI)",
  "reviewed the latest igma prototype for our mobile checkout flow": "Я посмотрела последний прототип в Figma для нашего мобильного оформления заказа.",
  "revision": "правка / ревизия",
  "revisions": "правки / доработки макета",
  "rom a designers perspective diegetic game interfaces are fascinating because they blend seamlessly into the virtual universe": "С точки зрения дизайнера, диегетические интерфейсы в играх поразительны тем, что они бесшовно сливаются с виртуальной вселенной.",
  "ropical wear and tear is serious humidity and construction defects are common issues in ali villas": "Тропический износ очень серьезен: влажность и строительные дефекты — частые проблемы балийских вилл.",
  "router": "роутер / маршрутизатор",
  "s ali expensive right now": "Дорого ли сейчас на Бали?",
  "s buying a 25 30 year leasehold villa on ali a smart financial investment or is flexible monthly annual renting far superior for digital creators": "Является ли покупка виллы в лизхолд на 25-30 лет на Бали разумной инвестицией, или гибкая помесячная аренда намного выгоднее для цифровых креаторов?",
  "s clean typography the most important element of": "Является ли аккуратная типографика важнейшим элементом интерфейса?",
  "s dark mode really healthier for your eyes": "Действительно ли темный режим полезнее для глаз?",
  "s igma better than hotoshop for design": "Figma лучше Фотошопа для дизайна интерфейсов?",
  "s long as your food bill is above 100 000 rupiah two hours in the quiet workspace are completely free fter two hours a day pass is 80 000 rupiah": "Если ваш чек за еду превышает 100 000 рупий, два часа в тихой рабочей зоне абсолютно бесплатны! Свыше двух часов дневной абонемент стоит 80 000 рупий.",
  "s nglish grammar difficult for ussian speakers": "Сложна ли английская грамматика для русскоговорящих?",
  "s remote work more productive than working in an office": "Удаленная работа продуктивнее, чем работа в офисе?",
  "s the bedroom unit whisper quiet during the night": "Кондиционер в спальне работает бесшумно ночью?",
  "s the coffee hot": "Горячий ли кофе?",
  "s the i i signal equally strong inside the master bedroom or is there a mesh repeater in the hallway": "Сигнал Wi-Fi такой же сильный в главной спальне, или в коридоре стоит mesh-ретранслятор?",
  "s the quiet zone included with cafe orders or is a separate coworking pass required": "Тихая зона включена в заказ в кафе или нужен отдельный пропуск в коворкинг?",
  "s the swimming pool in your villa clean": "Чистый ли бассейн на твоей вилле?",
  "s there a gallon water dispenser in the kitchen with both hot and cold water": "Есть ли на кухне кулер с горячей и холодной водой?",
  "s there a quiet air conditioned workspace upstairs or is it noisy during peak hours": "Есть ли наверху тихое рабочее место с кондиционером или там шумно в часы пик?",
  "s this speaking blitz effective for building your reflexes": "Эффективен ли этот разговорный блиц для выработки рефлексов речи?",
  "s your ac ook fast enough for heavy rendering": "Достаточно ли быстр твой MacBook для тяжелого рендеринга?",
  "s your gym close to your accommodation": "Твой спортзал близко к жилью?",
  "same here since you are settling into the area have you found any good spots for high protein food": "То же самое. Раз ты только осваиваешься в районе, нашел уже хорошие места с высокобелковой едой?",
  "satire": "сатира",
  "satire of modern culture": "сатира на современную культуру",
  "scene": "сцена / сообщество",
  "scenes": "сообщества / тусовки",
  "scooter": "скутер / байк",
  "scooters": "скутеры / байки",
  "security deposit": "страховой депозит / залог",
  "send me the updated figma link whenever you are ready": "Пришли мне обновленную ссылку на Figma, когда будешь готов.",
  "session": "тренировка / сессия",
  "setting strict client boundaries": "выстраивание жестких границ с клиентами",
  "several of my close friends are living and working in cyprus": "несколько моих близких друзей живут и работают на Кипре",
  "several of my close friends are living and working in yprus": "несколько моих близких друзей живут и работают на Кипре",
  "shoot me a message": "черкани мне сообщение в мессенджере",
  "shoot me a message and catch you around the gym denis": "Черкни мне сообщение, и до встречи в спортзале, Денис!",
  "single origin": "моносорт кофе (зерно из одного региона)",
  "single origin ethiopian beans sound great let s do that": "Эфиопский моносорт звучит отлично, давайте его!",
  "single origin ethiopian beans sound great let s do that and for food i would like the sourdough avocado toast with two poached eggs": "Эфиопский моносорт звучит отлично, давайте его! А из еды я бы хотел авокадо-тост на закваске с двумя яйцами пашот.",
  "soaked": "промокший до нитки",
  "soaked with sweat": "насквозь промокший от пота",
  "socket": "розетка",
  "sockets": "электрические розетки",
  "soft poached": "яйцо пашот всмятку (жидкий желток)",
  "soft poached is ideal with a pinch of chili flakes on top if possible": "Всмятку — идеально, со щепоткой чили сверху, если можно.",
  "some popular beaches are crowded": "Некоторые популярные пляжи переполнены людьми",
  "some popular beaches are crowded but northern beaches are quiet": "Некоторые популярные пляжи многолюдны, но северные пляжи тихие.",
  "sounds good eliza have a great workout": "Договорились, Элиза! Отличной тренировки!",
  "sourdough": "хлеб на закваске",
  "sourdough toast": "тост на бездрожжевой закваске",
  "specialty": "спешелти (высший сорт кофе)",
  "spectacular": "зрелищный / потрясающий",
  "speed is usually more important early on": "скорость обычно важнее на ранних этапах",
  "split": "сплит (разделение тренировки по группам мышц)",
  "spoken confidence is the real challenge": "уверенность в разговоре — вот настоящий вызов",
  "spontaneous": "спонтанный / естественный",
  "sprint": "спринт (рабочая итерация в 1-2 недели)",
  "sprint deadline": "дедлайн рабочего спринта",
  "stability": "стабильность",
  "standard": "стандарт",
  "sticky": "закрепленный / плавающий (о кнопке)",
  "sticky bar": "закрепленная плавающая кнопка действия",
  "sticky cta bar": "закрепленная плавающая кнопка действия",
  "strategic product thinking": "стратегическое продуктовое мышление",
  "subtle": "тонкий / едва уловимый",
  "sudden": "внезапный",
  "sudden client changes are stressful unless clear boundaries are established": "внезапные клиентские изменения вызывают стресс, пока не выстроены четкие границы",
  "sugar": "сахар",
  "surcharge": "наценка / дополнительная комиссия",
  "sure thing an iced flat white with oat milk would you like our house espresso blend or single origin ethiopian beans the ethiopian beans are light with subtle floral notes": "Конечно! Холодный флэт уайт на овсяном молоке. Вы хотите наш фирменный эспрессо-бленд или моносорт из Эфиопии? Эфиопские зерна легкие, с тонкими цветочными нотками.",
  "surrounded": "окруженный",
  "suspension": "приостановка",
  "suspension of disbelief": "вера в происходящее на экране (приостановка неверия)",
  "sustainable": "устойчивый / экологичный для жизни",
  "sweat": "пот",
  "sync communication is the only sustainable way to work across uropean and merican time zones": "Асинхронная коммуникация — единственный жизнеспособный способ работы через европейские и американские часовые пояса.",
  "syrup": "сироп",
  "t cools down the room in just five minutes": "Он охлаждает комнату всего за пять минут.",
  "t feels like half the people in anggu are tech expats": "Такое чувство, что половина людей в Чангу — айтишники-экспаты!",
  "takeaway": "еда навынос",
  "tell me about it": "И не говори! (Еще как!)",
  "tell me about it back in cyprus where i lived the summer heat was strong but the air was dry here in bali your t shirt is completely soaked after ten minutes of lifting": "И не говори! На Кипре, где я жил, летняя жара была сильной, но воздух был сухим. Здесь, на Бали, футболка насквозь мокрая уже через десять минут силовой тренировки!",
  "testing": "тестирование",
  "text contrast is what really protects eyesight": "контрастность текста — вот что реально защищает зрение",
  "thank you eliza everything is crystal clear i am very happy to be here": "Спасибо, Элиза! Всё предельно понятно. Я очень рад быть здесь.",
  "thank you so much the drive was smooth though the traffic near canggu is quite intense before i unpack my luggage could we please check the internet connection as a digital product designer high speed fiber internet is absolutely essential for uploading heavy figma files and running client zoom calls": "Большое спасибо! Доехали отлично, хотя пробки возле Чангу довольно плотные. Перед тем как распаковать вещи, можем проверить интернет? Я продуктовый дизайнер, и высокоскоростной оптоволоконный интернет мне критически необходим для выгрузки тяжелых файлов Figma и рабочих звонков в Zoom.",
  "thanks for jumping on google meet": "Спасибо, что подключился в Google Meet.",
  "that is a brilliant solution i will explain that to our team now about the revision requests in slack we also want a currency selector and a dark mode toggle can we deliver those before our friday sprint deadline": "Это блестящее решение! Я объясню это команде. Теперь насчет правок в Slack: мы также хотим переключатель валют и темную тему. Сможем сдать это до пятничного дедлайна спринта?",
  "that is a natural concern but there is strong ergonomic reasoning behind it modern mobile screens are very tall the bottom area is directly inside the user s natural thumb zone when users hold a phone with one hand reaching the middle or top of the screen is physically awkward": "Это понятное опасение, но за этим решением стоит четкая эргономика. Современные экраны смартфонов очень вытянутые. Нижняя область находится прямо в естественной зоне досягаемости большого пальца. Когда держишь телефон одной рукой, тянуться к середине или верху экрана физически неудобно.",
  "that is exactly what i need": "Это ровно то, что мне нужно.",
  "that is exactly what i need is the quiet zone included with cafe orders or is a separate coworking pass required": "Это именно то, что мне нужно. Тихая зона входит в стоимость заказа в кафе или требуется отдельный абонемент в коворкинг?",
  "that is outstanding news you are doing fantastic work denis": "Это выдающиеся новости! Ты делаешь фантастическую работу, Денис.",
  "that is outstanding news you are doing fantastic work denis send me the updated figma link whenever you are ready": "Потрясающие новости! Ты делаешь отличную работу, Денис. Скинь обновленную ссылку на Figma, как только будешь готов.",
  "that is plenty of bandwidth": "Это отличная пропускная способность!",
  "that is plenty of bandwidth is the wi fi signal equally strong inside the master bedroom or is there a mesh repeater in the hallway": "Это отличная пропускная способность! Сигнал Wi-Fi такой же сильный в главной спальне, или в коридоре стоит mesh-ретранслятор?",
  "that is very fair can i pay by contactless credit card or is there an extra card surcharge": "Это очень справедливо. Могу я оплатить бесконтактной картой или есть дополнительная комиссия за безнал?",
  "that sounds perfect let s exchange contacts are you on telegram or instagram we can grab a post workout coffee sometime or train together": "Звучит идеально! Давай обменяемся контактами. Ты есть в Telegram или Instagram? Можем как-нибудь выпить кофе после тренировки или потренироваться вместе.",
  "the bedroom ac is brand new and extremely quiet": "Кондиционер в спальне абсолютно новый и очень тихий.",
  "the bedroom ac is brand new and extremely quiet you can set it to dry mode or cool mode with this remote control it cools down the room in just five minutes": "Кондиционер в спальне абсолютно новый и очень тихий. Вы можете переключить его в режим осушения или охлаждения с помощью этого пульта. Он охлаждает комнату буквально за пять минут.",
  "the bench is all yours": "Скамья полностью в твоем распоряжении.",
  "the bottom area is directly inside the user s natural thumb zone": "Нижняя часть экрана находится прямо в естественной зоне досягаемости большого пальца.",
  "the call to action is always visible which directly reduces cart abandonment": "Кнопка действия всегда видна, что напрямую снижает долю брошенных корзин.",
  "the chairs are ergonomic power sockets are available at every single desk and the air conditioning is very cool": "Стулья эргономичные, розетки есть у каждого стола, и кондиционер отлично охлаждает.",
  "the cliff sunsets in luwatu are world famous and truly spectacular": "закаты на утесах в Улувату известны во всем мире и поистине зрелищны",
  "the cliff sunsets in uluwatu are world famous and truly spectacular": "закаты на утесах в Улувату известны во всем мире и поистине зрелищны",
  "the coffee is very hot and fresh": "кофе очень горячий и свежий",
  "the currency selector is realistic to finish by thursday afternoon": "Переключатель валют реально доделать к вечеру четверга.",
  "the currency selector is top priority because our european release is next week": "Селектор валюты в приоритете, потому что европейский релиз на следующей неделе.",
  "the currency selector is top priority because our european release is next week dark mode is just a nice to have": "Переключатель валют в приоритете, потому что европейский релиз уже на следующей неделе. Темная тема — это просто приятное дополнение.",
  "the deposit is 3 million rupiah": "Депозит составляет 3 миллиона рупий.",
  "the deposit is 3 million rupiah on your departure day our team inspects the villa and the deposit is refunded immediately in cash or via wise transfer": "Депозит составляет 3 миллиона рупий. В день вашего отъезда наша команда проверит виллу, и залог вернут сразу наличными или переводом через Wise.",
  "the deposit is refunded immediately in cash or via ise transfer": "залог возвращается немедленно наличными или переводом через Wise",
  "the deposit is refunded immediately in cash or via wise transfer": "залог возвращается немедленно наличными или переводом через Wise",
  "the download speed is around 150 mbps and the upload speed is roughly 50 mbps": "Скорость скачивания около 150 Мбит/с, а скорость отдачи примерно 50 Мбит/с.",
  "the drive was smooth though the traffic near canggu is quite intense": "Доехали отлично, хотя движение возле Чангу довольно плотное.",
  "the ethiopian beans are light with subtle floral notes": "Эфиопские зерна легкие, с тонкими цветочными нотками.",
  "the fitness club is only five minutes away by motorbike": "фитнес-клуб всего в пяти минутах езды на мотоцикле",
  "the food and cafe scene in bali is unmatched for anyone who loves healthy nutrition and specialty coffee": "Сфера кафе и ресторанов на Бали не имеет равных для всех, кто любит здоровое питание и спешелти-кофе.",
  "the future of generative ai in product ui design": "Будущее генеративного ИИ в дизайне продуктов и интерфейсов",
  "the humidity in this gym is intense this afternoon": "Влажность в зале сегодня днем просто запредельная.",
  "the navigation confusion rate is practically zero": "Процент путаницы в навигации практически нулевой.",
  "the password is printed at the bottom": "Пароль напечатан внизу чека.",
  "the roads are narrow and the scooter traffic is unpredictable": "дороги узкие, а трафик скутеров непредсказуем",
  "the router is right here in the living room": "Роутер прямо здесь, в гостиной.",
  "the swimming pool is crystal clear and properly maintained": "бассейн кристально чистый и поддерживается в порядке",
  "the villa in pererenan is quiet and surrounded by green rice fields": "Вилла в Переренане тихая и окружена зелеными рисовыми полями.",
  "the villa in pererenan it s quiet and surrounded by green rice fields": "Вилла в Переренане тихая и окружена рисовыми полями. (Ошибка: лишнее it's)",
  "the visual polish is incredible but our marketing team has a few concerns about the main button placement": "Визуальная полировка невероятна, но у маркетинга есть пара вопросов к расположению главной кнопки.",
  "the water dispenser is right next to the fridge": "Кулер с водой стоит прямо рядом с холодильником.",
  "the weather in canggu is hot and tropical today": "Погода в Чангу сегодня жаркая и тропическая.",
  "the weather in canggu it s hot and tropical today": "Погода в Чангу жаркая и тропическая сегодня. (Ошибка: лишнее it's)",
  "their protein pancakes and chicken bowls are incredible": "их протеиновые блинчики и боулы с курицей невероятны",
  "there are four modern coworking space and five good gym in this neighborhood": "В этом районе четыре современных коворкинга и пять хороших залов. (Ошибка: пропущены -s)",
  "there are four modern coworking spaces and five good gyms in this neighborhood": "В этом районе четыре современных коворкинга и пять отличных залов.",
  "there is a mesh repeater in the hallway so the signal is stable everywhere": "в коридоре установлен mesh-ретранслятор, поэтому сигнал везде стабильный",
  "there is strong ergonomic reasoning behind it": "за этим стоит весомое эргономическое обоснование",
  "this rapid drill is intense and my speaking reflexes are getting faster": "это быстрое упражнение очень интенсивное, и мои речевые навыки ускоряются",
  "thumb": "большой палец руки",
  "thumb zone": "зона досягаемости большого пальца на экране",
  "time zone overlap": "пересечение рабочих часов между часовыми поясами",
  "toggle": "переключатель / тумблер",
  "token": "токен",
  "tokens": "токены (дизайн-переменные)",
  "tropical cafe culture": "культура тропических кафе и коворкингов",
  "tropical moisture and maintenance": "тропическая сырость и обслуживание дома",
  "tropical wear and tear is serious humidity and construction defects are common issues in bali villas": "Тропический износ очень серьезен: влажность и строительные дефекты — частые проблемы балийских вилл.",
  "two hours in the quiet workspace are completely free": "два часа в тихой рабочей зоне полностью бесплатны",
  "typography is the backbone of great design because content is why users visit": "типографика — основа отличного дизайна, так как контент — это то, ради чего приходят пользователи",
  "understood regarding the security deposit how much is the deposit and is it fully refundable on my checkout date": "Понял. Что касается страхового депозита: сколько составляет залог и возвращается ли он полностью в день выезда?",
  "understood the currency selector is realistic to finish by thursday afternoon i will build the dropdown component with all hover and active states we can move dark mode into next week s sprint": "Понял. Переключатель валют вполне реально закончить к вечеру четверга. Я соберу компонент выпадающего списка со всеми состояниями hover и active. А темную тему перенесем на спринт следующей недели.",
  "unmatched": "не имеющий равных",
  "unpack": "распаковывать вещи",
  "unpredictable": "непредсказуемый",
  "upload": "выгрузка / отдача файлов",
  "upper": "верхний",
  "upper lower split": "программа тренировок с разделением на верх и низ",
  "upstairs": "наверху / на втором этаже",
  "ur ground floor is a bit lively with music but our second floor is a dedicated quiet focus zone he chairs are ergonomic power sockets are available at every single desk and the air conditioning is very cool": "На первом этаже довольно оживленно играет музыка, но наш второй этаж — это специальная тихая зона для концентрации. Кресла эргономичные, розетки есть у каждого стола, и кондиционер отлично охлаждает.",
  "ur marketing lead is worried users will miss it": "Наш маркетолог переживает, что пользователи её не заметят.",
  "ur sprint deadline is this riday at 5 f we include both the scope is a bit tight hich feature is the highest priority for your developers right now": "Дедлайн спринта — в эту пятницу в 17:00. Если брать обе задачи, объем будет слишком плотным. Какая из функций сейчас в приоритете для ваших разработчиков?",
  "ur sticky button smoothly anchors right above the keyboard": "Наша закрепленная кнопка плавно фиксируется прямо над клавиатурой.",
  "ure thing n iced flat white with oat milk ould you like our house espresso blend or single origin thiopian beans he thiopian beans are light with subtle floral notes": "Конечно! Холодный флэт уайт на овсяном молоке. Вы хотите наш фирменный эспрессо-бленд или моносорт из Эфиопии? Эфиопские зерна легкие, с тонкими цветочными нотками.",
  "verything is crystal clear am very happy to be here": "Всё предельно ясно. Я очень рад быть здесь.",
  "verything is ready for your check in": "Всё готово к вашему заселению.",
  "virtual keyboard": "экранная клавиатура смартфона",
  "warung": "варунг (традиционное индонезийское кафе)",
  "warung bu mi is delicious cheap and fresh": "В варунге Бу Ми очень вкусно, дешево и свежо.",
  "we accept apple pay and credit cards with zero surcharge": "Мы принимаем Apple Pay и кредитные карты без комиссии!",
  "we accept apple pay and credit cards with zero surcharge your total is 135 000 rupiah": "Мы принимаем Apple Pay и банковские карты без всякой комиссии! С вас 135 000 рупий.",
  "we can grab a post workout coffee sometime or train together": "Можем как-нибудь выпить кофе после тренировки или потренить вместе.",
  "we can move dark mode into next week s sprint": "Мы можем перенести темную тему на спринт следующей недели.",
  "we have a dedicated fiber optic line installed": "У нас установлена выделенная оптоволоконная линия.",
  "welcome to bali denis": "Добро пожаловать на Бали, Денис!",
  "welcome to bali denis welcome to villa sari here in pererenan how was your drive from the airport everything is ready for your check in": "Добро пожаловать на Бали, Денис! Добро пожаловать на виллу Сари здесь, в Переренане. Как доехали из аэропорта? Всё готово к вашему заселению.",
  "welcome to villa sari here in pererenan": "Добро пожаловать на виллу Сари здесь, в Переренане.",
  "wesome m a full stack engineer working remotely for an ustralian startup t feels like half the people in anggu are tech expats hat is your workout routine like": "Круто! Я фулстек-разработчик, работаю удаленно на австралийский стартап. Кажется, половина людей в Чангу — айтишники-экспаты! А по какой программе ты тренируешься?",
  "wesome nd drinking water know tap water in ali isnt potable s there a gallon water dispenser in the kitchen with both hot and cold water": "Супер. И насчет питьевой воды: я знаю, что вода из-под крана на Бали не является питьевой. На кухне есть кулер с помпой с горячей и холодной водой?",
  "what are the top 3 things you inspect before committing to a 6 month villa rental": "Какие 3 главные вещи ты проверяешь перед тем, как подписаться на аренду виллы на 6 месяцев?",
  "what are you most excited to experience in gta 6 when it finally launches": "Что больше всего тебе не терпится испытать в GTA 6, когда она наконец выйдет?",
  "what can i get started for you today": "Что я могу предложить вам сегодня?",
  "what do you think will be the hardest lifestyle adjustment when you land in bali": "Что, по твоему мнению, станет самым трудным изменением в образе жизни после приземления на Бали?",
  "what happens when the virtual keyboard pops up while entering card details": "что происходит, когда появляется экранная клавиатура при вводе данных карты?",
  "what is your daily rule for knowing when your working day is officially over": "Какое у тебя ежедневное правило, чтобы понимать, когда рабочий день официально завершен?",
  "what is your workout routine like": "Как выглядит твоя программа тренировок?",
  "what line of work are you in": "В какой сфере ты работаешь? Чем занимаешься?",
  "what makes open world narrative masterpieces so emotionally memorable and how does game ui contribute to player immersion without cluttering the world": "Что делает сюжетные шедевры с открытым миром эмоционально запоминающимися и как игровой UI способствует погружению игрока, не перегружая мир?",
  "what makes the storytelling in gta 5 or red dead redemption 2 feel like a hollywood movie": "Что делает подачу сюжета в GTA 5 или Red Dead Redemption 2 похожей на голливудский фильм?",
  "when a bottle is empty simply message our villa assistant on whatsapp and a replacement is delivered within an hour": "Когда бутыль опустеет, просто напишите нашему помощнику по вилле в WhatsApp, и замену доставят в течение часа.",
  "when the virtual keyboard appears inline buttons often get pushed completely off screen below the fold our sticky button smoothly anchors right above the keyboard the call to action is always visible which directly reduces cart abandonment": "Когда появляется экранная клавиатура, обычные кнопки часто улетают за пределы видимости экрана. Наша закрепленная кнопка плавно фиксируется прямо над клавиатурой. Призыв к действию всегда на виду, что напрямую снижает процент брошенных корзин.",
  "where are your favorite places for clean nutrition around here": "Где твои любимые места со здоровой чистой едой здесь?",
  "which feature is the highest priority for your developers right now": "Какая функция сейчас в наивысшем приоритете для разработчиков?",
  "whisper": "шепот / бесшумный",
  "whisper quiet": "бесшумный / тихий как шепот",
  "why deep story games like gta and cyberpunk succeed worldwide": "Почему глубокие сюжетные игры вроде GTA и Cyberpunk успешны во всем мире",
  "why is it placed there": "Почему она расположена именно там?",
  "will ai plugins and prompt tools replace ui designers or will they simply eliminate mundane layout work and turn designers into strategic art directors and systems thinkers": "Заменят ли ИИ-плагины и промпты дизайнеров интерфейсов, или они просто уничтожат рутинную верстку макетов и превратят дизайнеров в стратегических арт-директоров и системных мыслителей?",
  "will build the dropdown component with all hover and active states": "Я соберу выпадающий список со всеми состояниями hover и active.",
  "will do eliza i will ping you on slack by thursday 3 pm cet have a great day": "Обязательно, Элиза! Напишу тебе в Slack в четверг к 15:00 CET. Хорошего дня!",
  "will ping you on lack by hursday 3": "Я черкну тебе в Slack в четверг к 15:00 по европейскому времени.",
  "work remotely as a digital product and designer": "Я работаю удаленно дизайнером цифровых продуктов и UI.",
  "workflow": "рабочий процесс",
  "workflows": "рабочие процессы",
  "workout": "тренировка",
  "workouts": "тренировки",
  "would like the sourdough avocado toast with two poached eggs": "Я бы хотел авокадо-тост на закваске с двумя яйцами пашот.",
  "would you like our house espresso blend or single origin ethiopian beans": "Хотите наш фирменный бленд эспрессо или эфиопский моносорт?",
  "xcellent choice ow would you like the poached eggs oft or medium": "Отличный выбор. Какой степени готовности сделать яйца пашот? Всмятку или средней проварки?",
  "xcuse me are you using that incline bench press or can jump in for a set": "Извини, ты делаешь жим на наклонной скамье или можно сделать подход с тобой?",
  "y ac ook is brand new and very powerful for 3 graphics": "Мой MacBook абсолютно новый и очень мощный для 3D-графики.",
  "y ac ook its brand new and very powerful for 3 graphics": "Мой MacBook новенький и очень мощный для 3D-графики. (Ошибка: лишнее it's)",
  "y backend developer doesnt have the credentials for the production server": "У моего бэкенд-разработчика нет учетных данных API для боевого сервера.",
  "y backend developer he not have the credentials for the production server": "У моего бэкенд-разработчика нет доступов к API для продакшн-сервера. (Ошибка: he not have)",
  "y favorite game series is rand heft uto because the attention to world detail is second to none": "Моя любимая серия игр — Grand Theft Auto, потому что внимание к деталям мира в ней не имеет равных.",
  "yamaha": "Ямаха (марка скутера)",
  "yeah brilliant idea my telegram is eliza dev shoot me a message and catch you around the gym denis": "Да, отличная идея! Мой Telegram — @eliza_dev. Черкни мне сообщение, и увидимся в зале, Денис!",
  "yes balinese locals are exceptionally kind and welcoming to everyone": "Да, балийцы исключительно добры и приветливы ко всем.",
  "yes exactly in the old layout the button was inline right beneath the payment fields in your new layout the button is a fixed sticky bar docked at the bottom of the screen why is it placed there our marketing lead is worried users will miss it": "Да, именно. В старом макете кнопка шла сразу под полями оплаты. В твоем новом макете кнопка закреплена плавающей панелью в самом низу экрана. Почему она там? Наш маркетолог боится, что пользователи ее пропустят.",
  "yes exactly never drink tap water the water dispenser is right next to the fridge when a bottle is empty simply message our villa assistant on whatsapp and a replacement is delivered within an hour": "Да, именно так. Никогда не пейте воду из-под крана. Кулер стоит прямо рядом с холодильником. Когда бутыль закончится, просто напишите нашему помощнику по вилле в WhatsApp, и замену доставят в течение часа.",
  "yes figma is much faster and more modern than photoshop for ui": "Да, Figma намного быстрее и современнее Фотошопа для интерфейсов.",
  "yes five test users completed the checkout prototype on maze four of them completed the flow in under eighty seconds the navigation confusion rate is practically zero": "Да! Пять пользователей прошли тестирование прототипа чекаута на платформе Maze. Четверо закончили сценарий быстрее чем за восемьдесят секунд. Процент путаницы в навигации практически нулевой.",
  "yes my clients are demanding but they are very respectful": "Да, мои клиенты требовательные, но очень уважительные.",
  "yes my macbook is extremely fast and handles complex graphics easily": "Да, мой MacBook чрезвычайно быстрый и легко справляется со сложной графикой.",
  "yes our front gate is lockable and the parking porch is fully covered from the tropical rain your scooter is totally safe there": "Да, наши въездные ворота закрываются на замок, а навес для парковки полностью защищает от тропического дождя. Ваш скутер там в полной безопасности.",
  "yes remote work is more productive because unnecessary interruptions are rare": "Да, удаленная работа продуктивнее, потому что лишние отвлечения редки.",
  "yes several of my close friends are living and working in cyprus": "Да, несколько моих близких друзей живут и работают на Кипре.",
  "yes sudden client changes are stressful unless clear boundaries are established": "Да, внезапные правки клиентов вызывают стресс, если не установлены четкие границы.",
  "yes the cliff sunsets in uluwatu are world famous and truly spectacular": "Да, закаты на утесах в Улувату известны на весь мир и поистине захватывающи.",
  "yes the coffee is very hot and fresh": "Да, кофе очень горячий и свежий.",
  "yes the fitness club is only five minutes away by motorbike": "Да, фитнес-клуб всего в пяти минутах езды на байке.",
  "yes the roads are narrow and the scooter traffic is unpredictable": "Да, дороги узкие, а движение скутеров непредсказуемое.",
  "yes the swimming pool is crystal clear and properly maintained": "Да, бассейн кристально чистый и за ним хорошо ухаживают.",
  "yes there is a mesh repeater in the hallway so the signal is stable everywhere here are the network name and password on this card": "Да, в коридоре установлен mesh-ретранслятор, так что сигнал везде стабильный. Вот название сети и пароль на этой карточке.",
  "yes this rapid drill is intense and my speaking reflexes are getting faster": "Да, этот скоростной блиц интенсивный, и мои речевые рефлексы ускоряются!",
  "yes typography is the backbone of great design because content is why users visit": "Да, типографика — основа отличного дизайна, ведь пользователи приходят именно ради контента.",
  "you are referring to the primary complete purchase cta button correct": "Ты имеешь в виду главную кнопку призыва к действию 'Оформить покупку', верно?",
  "you can set it to dry mode or cool mode with this remote control": "Вы можете установить режим осушения или охлаждения этим пультом.",
  "you got it are you dining in today or is this order for takeaway": "Принято. Вы будете есть здесь или заказ с собой?",
  "you must check out motion cafe on batu bolong": "Ты просто обязан зайти в Motion Cafe на улице Бату Болонг",
  "you must check out motion cafe on batu bolong their protein pancakes and chicken bowls are incredible and for local food warung bu mi is delicious cheap and fresh": "Обязательно загляни в Motion Cafe на Бату Болонг — их протеиновые панкейки и боулы с курицей просто невероятные. А из местной кухни — в Warung Bu Mi очень вкусно, дешево и свежо.",
  "your scooter is totally safe there": "Ваш скутер там в полной безопасности.",
  "your t shirt is completely soaked after ten minutes of lifting": "футболка насквозь промокает уже через десять минут силовой тренировки!",
  "your total is 135 000 rupiah": "Ваш итог — 135 000 рупий.",
  "yprus and ali are both incredible islands but their cultural atmosphere is totally different": "Кипр и Бали — оба потрясающие острова, но их культурная атмосфера абсолютно разная.",
  "yprus is quiet uropean and very safe while ali is buzzing with young creators and entrepreneurs": "Кипр тихий, европейский и очень безопасный, тогда как Бали гудит от молодых создателей и предпринимателей."
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = EXPANDED_DICT;
};
  Object.assign(DICT, EXPANDED_DICT);

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

  window.DenisTranslator = {
    tokenizeAllText,
    showTranslation,
    ensurePopup,
    hidePopup,
    DICT
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initInteraction);
  } else {
    initInteraction();
  }
})();

