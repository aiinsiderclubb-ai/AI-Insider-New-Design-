import {
  Brain,
  ChatCircleDots,
  CirclesThreePlus,
  ImageSquare,
  Sparkle,
  Target,
  UsersThree,
  VideoCamera,
} from "@phosphor-icons/react";

/* ================================================================ data */

/* Кінематографічний проїзд «хаос → система».
   Чотири кліпи склеєні кадр-у-кадр: останній кадр кліпу N дорівнює
   першому кадру кліпу N+1, тому кожен грає один раз і завмирає на
   останньому кадрі — перехід між стадіями непомітний. */
/* Один суцільний проїзд «хаос → система»: чотири кадри склеєні в
   один файл, тому сцен більше немає — є єдиний рух, який веде скрол. */
export const hero = {
  poster: "/assets/journey/hero.jpg",
  // landscape screens get the full frame; portrait phones get a native
  // centre crop instead of an upscaled slice of the 16:9 take
  media: {
    wide: { video: "/assets/journey/hero-wide.mp4", poster: "/assets/journey/hero.jpg" },
    tall: { video: "/assets/journey/hero-tall.mp4", poster: "/assets/journey/hero-tall.jpg" },
  },
  eyebrow: "AI-СИСТЕМИ ДЛЯ БІЗНЕСУ · КИЇВ × ЦЮРИХ",
  lines: ["Ваш бізнес уже", "готовий до AI."],
  promise: "Побудуємо систему.",
  lede: "AI-агенти, які відповідають клієнтам, і автоматизація, яка прибирає ручну роботу. Починаємо з одного процесу, що з’їдає найбільше часу.",
  stages: [
    ["Хаос", "Заявки в чатах, Excel і ручні переноси між системами."],
    ["Маршрут", "Знаходимо процес, що коштує найдорожче, і рахуємо ефект."],
    ["Система", "Агенти й автоматизація працюють щодня — без ручного контролю."],
  ],
  // real numbers from published cases — nothing aggregated or estimated
  proof: [
    ["539", "задач під контролем — операційна система агенції", "/cases/operatsiina-systema-kreatyvnoi-ahentsii"],
    ["500+", "AI-відео на місяць — Content Factory", "/cases/content-factory-ai-video"],
    ["12+", "активних проєктів веде один AI-рекрутер", "/cases/ai-rekruter-dlia-ahentsii"],
  ],
};

// figures published on the case pages — keep in sync with CaseDetail results
export const proof = [
  ["539", "задач під контролем в операційній системі агенції"],
  ["45 с", "на звіт замість 4 хвилин вручну"],
  ["12+", "активних проєктів веде один AI-рекрутер"],
  ["500+", "AI-відео на місяць у Content Factory"],
];

export const answers = [
  {
    index: "01",
    title: "Підтримка й продажі",
    copy: "Агент відповідає на звернення й передає менеджеру тільки складні випадки.",
    art: "/assets/capability-orb.png",
  },
  {
    index: "02",
    title: "Операційна рутина",
    copy: "Документи, узгодження й перенесення даних ідуть без участі людини.",
    tone: "is-accent",
    art: "/assets/capability-system.png",
  },
  {
    index: "03",
    title: "Знання компанії",
    copy: "Одне місце для пошуку замість десяти папок і трьох чатів.",
    art: "/assets/hero-glass.png",
  },
  {
    index: "04",
    title: "Рішення на даних",
    copy: "Рішення на цифрах, а не на відчуттях на нараді.",
    art: "/assets/delivery-wave-crop.png",
  },
];

export const caseItems = [
  {
    index: "01",
    slug: "operatsiina-systema-kreatyvnoi-ahentsii",
    kicker: "ОПЕРАЦІЙНА АВТОМАТИЗАЦІЯ",
    title: "Конвеєр замість таблиць",
    metric: "539",
    metricLabel: "задач під контролем",
    image: "/assets/case-industrial.png",
  },
  {
    index: "02",
    slug: "ai-rekruter-dlia-ahentsii",
    kicker: "AI-АГЕНТ · РЕКРУТИНГ",
    title: "Рекрутер, який веде кандидата до тестового",
    metric: "12+",
    metricLabel: "активних проєктів в одному агенті",
    image: "/assets/cases/ai-recruiter-demo-poster.webp",
    seoTitle: "AI-рекрутер для агенції: Telegram-бот — кейс | AI Insider",
    seoDescription:
      "Кейс AI-рекрутера в Telegram: створення вакансій, кваліфікація кандидатів, розсилка, shortlist, тестові завдання й контроль дедлайнів.",
    published: "2026-08-21",
    updated: "2026-09-24",
    video: {
      name: "AI-рекрутер у Telegram — демонстрація робочої системи",
      description:
        "64-секундна демонстрація AI-рекрутера: налаштування вакансії, критерії відбору, розсилка, shortlist, тестові завдання та зведення результатів.",
      thumbnail: "/assets/cases/ai-recruiter-demo-poster.webp",
      contentUrl: "/assets/cases/ai-recruiter-demo.mp4",
      uploadDate: "2026-09-03T10:00:00+02:00",
      duration: "PT1M5S",
    },
  },
  {
    index: "03",
    slug: "content-factory-ai-video",
    kicker: "CONTENT FACTORY · AI-ВІДЕО",
    title: "Контент-завод без знімальної зміни",
    metric: "500+",
    metricLabel: "відео на місяць",
    image: "/assets/studio/influencers.jpg",
  },
];

export const modules = [
  {
    id: "agents",
    hue: "#4fe3ff",
    visual: "chat",
    tab: "AI-агенти",
    icon: ChatCircleDots,
    kicker: "AI-АГЕНТИ",
    title: "Відповідають клієнтам замість оператора",
    copy: "Агент приймає звернення в чаті або по телефону, відповідає на типові питання й оформлює заявку. Складне питання передає менеджеру разом з історією розмови. Говорить українською, англійською та німецькою.",
    metrics: [
      ["68%", "звернень без оператора"],
      ["−42 с", "до першої відповіді"],
      ["24/7", "робота без змін"],
    ],
    flow: [
      "Чат і телефон",
      "Пам’ятає контекст",
      "Передає менеджеру",
      "Пише в CRM",
    ],
  },
  {
    id: "automation",
    hue: "#8b5cff",
    visual: "flow",
    tab: "Автоматизація",
    icon: CirclesThreePlus,
    kicker: "АВТОМАТИЗАЦІЯ",
    title: "Прибираємо ручне перенесення даних",
    copy: "Заявка з сайту сама потрапляє в CRM. Документ формується без копіпасту. Керівник бачить статус, не питаючи в чаті. Ми з’єднуємо системи, між якими зараз ходять люди.",
    metrics: [
      ["41%", "нижча вартість операції"],
      ["3.4×", "швидший процес"],
      ["0", "копіпасту між вікнами"],
    ],
    flow: ["З’єднуємо системи", "Документи", "Узгодження", "Перевірка помилок"],
  },
  {
    id: "custom",
    hue: "#2b4bff",
    visual: "graph",
    tab: "Власний AI",
    icon: Brain,
    kicker: "ВЛАСНИЙ AI",
    title: "Пошук по ваших документах і базах",
    copy: "Співробітник питає звичайною мовою, система шукає відповідь у ваших договорах, інструкціях і таблицях і показує, звідки її взяла. Дані не виходять за межі вашого сервера.",
    metrics: [
      ["96%", "точність відповідей"],
      ["1", "місце, де шукати"],
      ["100%", "дані лишаються у вас"],
    ],
    flow: [
      "Пошук по документах",
      "Помічник у роботі",
      "Прогнози",
      "Ваш сервер",
    ],
  },
  {
    id: "strategy",
    hue: "#5ff0c8",
    visual: "roadmap",
    tab: "AI-стратегія",
    icon: Target,
    kicker: "AI-СТРАТЕГІЯ",
    title: "Рахуємо, що автоматизувати першим",
    copy: "Дивимось на ваші процеси й рахуємо, де автоматизація окупиться швидше. Потім збираємо прототип на реальних даних, щоб перевірити розрахунок до великих витрат.",
    metrics: [
      ["2–3", "тижні до прототипу"],
      ["1", "план із цінами й строками"],
      ["до старту", "рахуємо окупність"],
    ],
    flow: [
      "Аудит процесів",
      "Пріоритети",
      "Розрахунок окупності",
      "План запуску",
    ],
  },
];

/* Справжні екрани застосунку зі /public/assets/sweezy/ — WebP, 750px
   по ширині, із запасом під retina для 272px макета телефона. */
export const sweezyScreens = [
  {
    id: "home",
    src: "/assets/sweezy/home.webp",
    tab: "Головна",
    title: "Твій шлях у Швейцарії",
    note: "Сім кроків із прогресом і планом на сьогодні.",
  },
  {
    id: "guides",
    src: "/assets/sweezy/guides.webp",
    tab: "Довідник",
    title: "Знайди потрібну відповідь",
    note: "Гайди, інструменти та чек-листи з пошуком і фільтрами.",
  },
  {
    id: "tools",
    src: "/assets/sweezy/tools.webp",
    tab: "Інструменти",
    title: "Обери завдання",
    note: "Кар'єрний хаб, готовність документів, німецька щодня.",
  },
  {
    id: "career",
    src: "/assets/sweezy/career.webp",
    tab: "Робота",
    title: "Знайди роботу, яка тобі підходить",
    note: "AI Match, збережені вакансії та трекер заявок.",
  },
];

export const studio = [
  {
    id: "influencers",
    video: "/assets/studio/influencers.mp4",
    poster: "/assets/studio/influencers.jpg",
    hue: "#4fe3ff",
    icon: UsersThree,
    title: "AI-інфлюенсери",
    sub: "Віртуальні амбасадори бренду",
    metric: "3M+",
    metricLabel: "переглядів",
    handle: "@brand.ai",
    screenKicker: "ЖИВИЙ ЕФІР",
    screenTitle: "Персонаж, який ніколи не втомлюється",
    screenNote: "Один образ — усі майданчики й усі мови.",
    stats: [
      ["Залучення", "+340%"],
      ["Дописів/міс", "500+"],
      ["Вартість", "−80%"],
    ],
  },
  {
    id: "video",
    video: "/assets/studio/video.mp4",
    poster: "/assets/studio/video.jpg",
    hue: "#8b5cff",
    icon: VideoCamera,
    title: "AI-відео",
    sub: "Ролики без знімальної групи",
    metric: "500+",
    metricLabel: "відео/міс",
    handle: "@brand.reels",
    screenKicker: "РЕНДЕР 04 / 12",
    screenTitle: "Від брифу до готового ролика",
    screenNote: "Сценарій, озвучка, монтаж і субтитри — за годину.",
    stats: [
      ["Час на ролик", "−94%"],
      ["Мов озвучки", "10+"],
      ["Форматів", "6"],
    ],
  },
  {
    id: "ugc",
    video: "/assets/studio/ugc.mp4",
    poster: "/assets/studio/ugc.jpg",
    hue: "#2b4bff",
    icon: Sparkle,
    title: "UGC-реклама",
    sub: "Креативи, що масштабуються",
    metric: "−80%",
    metricLabel: "вартість креативу",
    handle: "@brand.ugc",
    screenKicker: "ВАРІАНТ B · ТЕСТ",
    screenTitle: "Сотня версій одного офера",
    screenNote: "Ротація гіпотез без нової зйомки щотижня.",
    stats: [
      ["Гіпотез/тиждень", "40+"],
      ["CPA", "−37%"],
      ["Час на партію", "1 день"],
    ],
  },
  {
    id: "creative",
    video: null,
    poster: "/assets/studio/creative.webp",
    hue: "#5ff0c8",
    icon: ImageSquare,
    title: "Креативна студія",
    sub: "Банери й пости без дизайнера",
    metric: "100+",
    metricLabel: "креативів/міс",
    handle: "@brand.studio",
    screenKicker: "ПАРТІЯ 07",
    screenTitle: "Уся сітка форматів за один прогін",
    screenNote: "Айдентика тримається сама — без правок від руки.",
    stats: [
      ["Форматів", "24"],
      ["Правок", "−70%"],
      ["Узгодження", "1 крок"],
    ],
  },
  {
    id: "product-shampoo",
    video: "/assets/studio/product-shampoo.mp4",
    poster: "/assets/studio/product-shampoo.webp",
    hue: "#4fe3ff",
    icon: ImageSquare,
    title: "Product CGI",
    sub: "Предметні ролики без павільйону",
    metric: "1:1",
    metricLabel: "формат",
    handle: "@brand.product",
    screenKicker: "PRODUCT FILM · 04 С",
    screenTitle: "Продукт, який неможливо пропустити",
    screenNote: "Контрастна предметна сцена для beauty та e-commerce кампаній.",
    stats: [
      ["Формат", "1:1"],
      ["Хронометраж", "4 с"],
      ["Аудіо", "без звуку"],
    ],
  },
  {
    id: "beauty-spf",
    video: "/assets/studio/beauty-spf.mp4",
    poster: "/assets/studio/beauty-spf.webp",
    hue: "#a9c8ff",
    icon: VideoCamera,
    title: "Beauty-рілси",
    sub: "Нативний product storytelling",
    metric: "9:16",
    metricLabel: "social first",
    handle: "@brand.beauty",
    screenKicker: "BEAUTY REEL · 08 С",
    screenTitle: "Продукт у природному контексті",
    screenNote:
      "Вертикальна історія для Reels, Shorts і TikTok без зайвого шуму.",
    stats: [
      ["Формат", "9:16"],
      ["Хронометраж", "8 с"],
      ["Категорія", "beauty"],
    ],
  },
  {
    id: "interior-entryway",
    video: "/assets/studio/interior-entryway.mp4",
    poster: "/assets/studio/interior-entryway.webp",
    hue: "#8b5cff",
    icon: VideoCamera,
    title: "Інтер’єрні рілси",
    sub: "Простір, світло й деталі в русі",
    metric: "37 с",
    metricLabel: "story reel",
    handle: "@brand.interior",
    screenKicker: "INTERIOR STORY · 37 С",
    screenTitle: "Дизайн-простір як жива історія",
    screenNote:
      "Спокійний монтаж для архітектури, девелопменту й декор-брендів.",
    stats: [
      ["Формат", "9:16"],
      ["Хронометраж", "37 с"],
      ["Категорія", "interior"],
    ],
  },
  {
    id: "interior-apartment",
    video: "/assets/studio/interior-apartment.mp4",
    poster: "/assets/studio/interior-apartment.webp",
    hue: "#2b4bff",
    icon: VideoCamera,
    title: "Lifestyle spaces",
    sub: "Атмосферні ролики для нерухомості",
    metric: "7 с",
    metricLabel: "short form",
    handle: "@brand.space",
    screenKicker: "SPACE REEL · 07 С",
    screenTitle: "Атмосфера, яка продає простір",
    screenNote:
      "Мінімалістичний короткий формат для Pinterest, Reels і каталогів.",
    stats: [
      ["Формат", "9:16"],
      ["Хронометраж", "7 с"],
      ["Категорія", "lifestyle"],
    ],
  },
];

export const values = [
  {
    index: "01",
    label: "ЧІТКІСТЬ",
    title: "Знаєте, що буде далі",
    copy: "У кожного етапу є дата, результат і людина, яка за нього відповідає. Ви завжди знаєте, на чому стоїмо.",
    tone: "is-paper",
  },
  {
    index: "02",
    label: "ШВИДКІСТЬ",
    title: "Прототип за 2–3 тижні",
    copy: "Перший робочий прототип працює на ваших даних уже через два-три тижні.",
    tone: "is-accent",
  },
  {
    index: "03",
    label: "КОНТРОЛЬ",
    title: "Дані лишаються вашими",
    copy: "Система стоїть на вашому сервері або у вашому хмарному акаунті. Ми не тримаємо ваші дані в себе.",
    tone: "is-cobalt",
  },
  {
    index: "04",
    label: "ЕФЕКТ",
    title: "Цифри, а не демо",
    copy: "Рахуємо ефект до старту й перевіряємо після запуску. Якщо не спрацювало, кажемо про це прямо.",
    tone: "is-sky",
  },
];

export const method = [
  [
    "01",
    "Розкажіть ситуацію",
    "Що у вас за процеси, де зараз найбільше ручної роботи й що болить сильніше за все.",
    "тиждень 1",
  ],
  [
    "02",
    "Отримайте маршрут",
    "Показуємо, що автоматизувати першим, скільки це коштує і за скільки окупиться.",
    "тижні 2–3",
  ],
  [
    "03",
    "Запускайте систему",
    "Під’єднуємо до ваших систем, навчаємо команду й лишаємось на підтримці.",
    "тижні 4–8",
  ],
];

export const faqItems = [
  {
    q: "Скільки часу до першого результату?",
    a: "Перший робочий прототип — 2–3 тижні. Він працює на ваших реальних даних, тому вже на цьому етапі видно ефект і вартість масштабування.",
  },
  {
    q: "Де зберігаються наші дані?",
    a: "У вашому контурі: власний хмарний акаунт, приватний хостинг або on-premise. Ми проєктуємо систему так, щоб чутливі дані не залишали вашу інфраструктуру.",
  },
  {
    q: "Ми не маємо технічної команди. Це проблема?",
    a: "Ні. Ми беремо на себе архітектуру, розробку та інтеграцію, навчаємо вашу команду й залишаємо документацію та зрозумілі процеси підтримки.",
  },
  {
    q: "Скільки це коштує?",
    a: "AI Sprint — від CHF 15 000. Власна AI-система — від CHF 75 000. Точна цифра залежить від обсягу інтеграцій і рівня невизначеності; ми називаємо її після першої розмови.",
  },
  {
    q: "Що, якщо AI не дасть результату?",
    a: "Тому ми й починаємо зі спринту. Він коштує менше, ніж помилка на повному впровадженні, і завершується чесною відповіддю: масштабувати, переробити чи зупинитись.",
  },
];

export const navLinks = [
  ["/services", "Послуги"],
  ["/cases", "Кейси"],
  ["/insights", "Insights"],
  ["/studio", "AI-контент"],
  ["/about", "Про нас"],
];
