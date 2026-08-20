export const insightArticles = [
  {
    slug: "n8n-ukrainskoiu",
    category: "АВТОМАТИЗАЦІЯ",
    title: "n8n українською: повний гайд і 10 готових workflow",
    shortTitle: "n8n українською",
    description:
      "Практичний гайд з n8n українською: як працюють workflows, nodes, credentials і webhooks. Плюс 10 стартових сценаріїв для бізнесу.",
    dek: "Від першого workflow до керованої автоматизації: архітектура, безпека, витрати й десять сценаріїв, які можна імпортувати та адаптувати.",
    readTime: "14 хв",
    published: "2026-08-20",
    updated: "2026-08-20",
    accent: "#4fe3ff",
    takeaways: [
      "n8n з’єднує тригери, дані, правила й дії в одному workflow.",
      "Self-hosting дає більше контролю, але додає оновлення, backup і monitoring.",
      "Починайте з процесу з чітким входом, результатом і власником помилки.",
    ],
    sections: [
      {
        id: "what",
        title: "Що таке n8n",
        body: [
          "n8n — платформа автоматизації workflow. Вона приймає подію, перетворює дані, виконує правила та передає результат у CRM, месенджер, таблицю, базу даних або AI-модель.",
          "Головна відмінність від простого чатбота: workflow не лише відповідає текстом. Він може створити запис, перевірити умову, запустити погодження, дочекатися відповіді й продовжити процес.",
        ],
      },
      {
        id: "anatomy",
        title: "Анатомія workflow без жаргону",
        body: [
          "Trigger запускає сценарій: webhook, розклад, новий лист або зміна в CRM. Node виконує одну дію. Expression підставляє дані з попередніх кроків. Credential зберігає доступ до зовнішнього сервісу. Execution показує, що відбулося під час запуску.",
          "Надійний workflow також має окремий error path: лог, повторну спробу, сповіщення власника й безпечну зупинку. Саме цей шар відрізняє демо від робочої системи.",
        ],
      },
      {
        id: "first",
        title: "Перший сценарій: заявка → перевірка → CRM",
        body: [
          "1. Webhook приймає форму. 2. Edit Fields нормалізує телефон, email і назву компанії. 3. IF відсікає записи без контакту. 4. CRM node створює lead. 5. Slack або Telegram повідомляє менеджера. 6. Error workflow фіксує збій.",
          "Перед запуском збережіть тестові payload, перевірте дублікати та визначте idempotency key. Інакше повторний webhook може створити дві заявки.",
        ],
      },
      {
        id: "hosting",
        title: "Cloud чи self-hosted",
        body: [
          "Cloud прибирає обслуговування інфраструктури й підходить для швидкого старту. Self-hosted варто розглядати, коли потрібні приватна мережа, власний регіон зберігання, нестандартні nodes або контроль оновлень.",
          "Рахуйте не лише сервер. До self-hosting входять backup, secrets, TLS, база даних, черги, monitoring, журнал доступу й час людини, яка відновить систему після збою.",
        ],
      },
      {
        id: "security",
        title: "Мінімальний production checklist",
        bullets: [
          "Окремі credentials для production і тестового середовища.",
          "Найменші необхідні права для кожної інтеграції.",
          "Webhook authentication, rate limit і валідація payload.",
          "Видалення персональних даних з execution logs.",
          "Retry тільки для безпечних та idempotent операцій.",
          "Owner, alert і процедура ручного відновлення для кожного критичного workflow.",
        ],
      },
    ],
    faq: [
      ["Чи потрібен програміст для n8n?", "Для простих інтеграцій — ні. Для production-сценаріїв потрібне розуміння API, даних, помилок і безпеки."],
      ["Чи можна підключити AI-модель?", "Так. Але відповідь моделі треба перевіряти схемою, правилами або людиною перед незворотною дією."],
      ["Чи безкоштовний n8n?", "Є self-hosted community edition. Інфраструктура, підтримка й робота команди все одно мають вартість."],
    ],
    related: ["n8n-vs-make-vs-zapier", "ai-agent-what-is-it"],
  },
  {
    slug: "google-ai-studio-guide",
    category: "ІНСТРУМЕНТИ",
    title: "Google AI Studio: як користуватися у 2026 році",
    shortTitle: "Google AI Studio",
    description:
      "Google AI Studio українською: створення prompt, structured output, function calling, тестування Gemini API, обмеження та сім бізнес-прототипів.",
    dek: "Практичний маршрут від першого prompt до прототипу, який можна перевірити на реальних даних — без маскування обмежень моделі.",
    readTime: "12 хв",
    published: "2026-08-20",
    updated: "2026-08-20",
    accent: "#a9c8ff",
    takeaways: [
      "AI Studio підходить для перевірки prompt, schema й tool calling до розробки UI.",
      "Structured output зменшує хаос, але не гарантує правильність фактів.",
      "Чутливі дані не варто вставляти до тестового середовища без перевірки політик і доступів.",
    ],
    sections: [
      {
        id: "start",
        title: "З чого почати",
        body: [
          "Створіть окремий проєкт, оберіть модель і сформулюйте один вимірюваний сценарій. Наприклад: витягнути з вхідного листа ім’я, компанію, бюджет і наступну дію у валідний JSON.",
          "Не починайте з ролі на кшталт «ти найкращий асистент». Дайте контекст, вхідні дані, правила, формат відповіді та приклади помилок.",
        ],
      },
      {
        id: "prompt",
        title: "Prompt, який можна тестувати",
        bullets: [
          "Мета: одна задача й критерій успіху.",
          "Контекст: що модель повинна й не повинна припускати.",
          "Вхід: чітко відокремлений від інструкції.",
          "Вихід: JSON schema або фіксована структура.",
          "Невизначеність: поле `needs_review`, а не вигадана відповідь.",
          "Тест: щонайменше 20 реальних, анонімізованих прикладів.",
        ],
      },
      {
        id: "prototypes",
        title: "Сім бізнес-прототипів",
        body: [
          "Класифікація звернень, витяг даних з документів, чернетка відповіді підтримки, summary дзвінка, перевірка брифу, пошук ризиків у договорі та маршрутизація lead. Кожен прототип має завершуватися таблицею тестів: expected, actual, pass/fail, причина помилки.",
        ],
      },
      {
        id: "production",
        title: "Що змінюється у production",
        body: [
          "API key переноситься у server-side secret. Додаються rate limits, timeout, retries, versioned prompts, logging без персональних даних і fallback. Незворотні дії — платіж, видалення, відправка договору — проходять policy check або human approval.",
          "Вартість рахуйте на власному наборі даних: довжина input/output, частота викликів, повторні запити та кешування змінюють результат сильніше, ніж рекламна ціна одного запиту.",
        ],
      },
    ],
    faq: [
      ["Чи замінює AI Studio готовий продукт?", "Ні. Це середовище прототипування. Production потребує backend, доступів, моніторингу й обробки помилок."],
      ["Чи можна тестувати документи?", "Так, якщо формат підтримується. Перед завантаженням перевірте права, конфіденційність і правила зберігання."],
    ],
    related: ["notebooklm-for-business", "ai-agent-what-is-it"],
  },
  {
    slug: "notebooklm-for-business",
    category: "БАЗИ ЗНАНЬ",
    title: "NotebookLM для бізнесу: база знань із Google Drive без хаосу",
    shortTitle: "NotebookLM для бізнесу",
    description:
      "Як використовувати NotebookLM для бізнесу: підготовка джерел, права доступу, перевірка цитат, сценарії для support, sales і навчання команди.",
    dek: "NotebookLM швидко перетворює документи на дослідницький простір. Але корпоративна база знань починається не з AI — з джерел, прав і власника відповіді.",
    readTime: "11 хв",
    published: "2026-08-20",
    updated: "2026-08-20",
    accent: "#7b8dff",
    takeaways: [
      "Якість відповіді обмежена якістю й актуальністю джерел.",
      "Цитата допомагає перевірити відповідь, але користувач все одно має відкрити джерело.",
      "Для масштабування потрібні access control, versioning і контур відповідальності.",
    ],
    sections: [
      {
        id: "fit",
        title: "Коли NotebookLM корисний",
        body: [
          "Найкращі сценарії: дослідження набору документів, підготовка до зустрічі, onboarding, порівняння політик, пошук суперечностей і створення навчальних матеріалів з конкретних джерел.",
          "Слабкий сценарій: «завантажимо весь Drive і отримаємо єдину правду». Дублікати, старі версії та різні права доступу перетворять пошук на впевнену плутанину.",
        ],
      },
      {
        id: "prepare",
        title: "Підготовка джерел",
        bullets: [
          "Один документ — один owner і дата наступної перевірки.",
          "Архівні версії відокремлені від чинних.",
          "Назви пояснюють зміст, країну й версію.",
          "Персональні та секретні дані виключені або мають окремий контур.",
          "Ключові правила мають явний пріоритет у разі конфлікту.",
        ],
      },
      {
        id: "test",
        title: "Тест на 30 запитань",
        body: [
          "Зберіть 10 простих фактів, 10 запитань з кількох джерел і 10 пасток, відповіді на які у документах немає. Для кожної відповіді перевірте зміст, цитату, актуальність і правильну відмову.",
          "Якщо система вигадує відповідь на пастки, проблема не вирішується довшим prompt. Потрібні обмеження, інший retrieval або human review.",
        ],
      },
      {
        id: "scale",
        title: "NotebookLM чи власний RAG",
        body: [
          "NotebookLM швидший для дослідження й особистої роботи. Власний RAG потрібен, коли важливі ролі доступу, інтеграція в продукт, контроль індексації, versioning, API, журнал рішень і вимірювані SLA.",
        ],
      },
    ],
    faq: [
      ["Чи є NotebookLM корпоративною базою знань?", "Може бути інструментом роботи з джерелами. Повна корпоративна система також потребує governance, доступів, актуалізації та інтеграцій."],
      ["Чи можна довіряти цитатам?", "Цитата спрощує перевірку, але не скасовує її. Відкривайте першоджерело для критичних рішень."],
    ],
    related: ["google-ai-studio-guide", "ai-agent-what-is-it"],
  },
  {
    slug: "n8n-vs-make-vs-zapier",
    category: "ПОРІВНЯННЯ",
    title: "n8n vs Make vs Zapier: що обрати для автоматизації",
    shortTitle: "n8n vs Make vs Zapier",
    description:
      "Чесне порівняння n8n, Make і Zapier: складність, self-hosting, інтеграції, контроль даних, підтримка та модель вартості.",
    dek: "Не рейтинг з одним переможцем. Матриця вибору за процесом, командою, даними й вартістю володіння.",
    readTime: "10 хв",
    published: "2026-08-20",
    updated: "2026-08-20",
    accent: "#2b4bff",
    takeaways: [
      "Zapier швидкий для простих SaaS-зв’язок, Make зручний для візуальних сценаріїв, n8n дає глибший технічний контроль.",
      "Ціна операції не дорівнює total cost of ownership.",
      "Вибирайте на одному реальному процесі, не за кількістю інтеграцій на лендингу.",
    ],
    comparison: [
      ["Критерій", "n8n", "Make", "Zapier"],
      ["Self-hosting", "Так", "Ні", "Ні"],
      ["Старт без коду", "Середній", "Легкий", "Найлегший"],
      ["Складна логіка", "Сильна", "Сильна", "Середня"],
      ["Контроль інфраструктури", "Високий", "Низький", "Низький"],
      ["Технічне обслуговування", "Вище", "Низьке", "Низьке"],
    ],
    sections: [
      {
        id: "choice",
        title: "Коротка відповідь",
        body: [
          "Zapier — коли потрібна найшвидша проста зв’язка популярних SaaS. Make — коли операційна команда будує розгалужені візуальні сценарії. n8n — коли потрібні API, код, self-hosting, AI-пайплайни або контроль виконання.",
        ],
      },
      {
        id: "cost",
        title: "Як рахувати вартість",
        body: [
          "Порівняйте один process map на однаковому місячному навантаженні. Додайте tasks/operations, premium connectors, history, users, environments, підтримку й час на помилки.",
          "Для self-hosting додайте сервер, базу даних, backup, monitoring, оновлення і відповідального інженера. Без цього порівняння буде рекламним, не фінансовим.",
        ],
      },
      {
        id: "test",
        title: "Тест перед вибором",
        bullets: [
          "Зібрати один типовий і один проблемний payload.",
          "Перевірити error handling, retry та дублікати.",
          "Виміряти час підтримки після зміни API.",
          "Перевірити export, versioning і відновлення попередньої версії.",
          "Порахувати вартість на 10× поточного навантаження.",
        ],
      },
    ],
    faq: [
      ["Що краще для малого бізнесу?", "Платформа, яку команда реально зможе підтримувати. Для простих SaaS-зв’язок часто достатньо Zapier або Make; для глибших процесів — n8n."],
      ["Чи варто переносити всі workflows?", "Ні. Спершу перенесіть один критичний і один типовий сценарій та порівняйте фактичну підтримку."],
    ],
    related: ["n8n-ukrainskoiu", "ai-agent-what-is-it"],
  },
  {
    slug: "ai-agent-what-is-it",
    category: "AI-АГЕНТИ",
    title: "AI agent: що це, як працює і де приносить ROI",
    shortTitle: "AI agent: що це",
    description:
      "Що таке AI agent: модель, інструменти, пам’ять, правила й human approval. Реальні сценарії, ризики та формула оцінки ROI.",
    dek: "AI agent — не магічний співробітник. Це керований цикл: зрозуміти задачу, вибрати дію, використати інструмент, перевірити результат і зупинитися.",
    readTime: "13 хв",
    published: "2026-08-20",
    updated: "2026-08-20",
    accent: "#4fe3ff",
    takeaways: [
      "Agent відрізняється від chatbot здатністю обирати й виконувати дії через tools.",
      "Чим більша автономність, тим сильніші мають бути permissions, limits і audit trail.",
      "ROI з’являється у повторюваному процесі з достатнім обсягом, не у красивій розмові.",
    ],
    sections: [
      {
        id: "definition",
        title: "Визначення без маркетингу",
        body: [
          "AI agent — програмна система, яка отримує мету й контекст, планує наступний крок, викликає дозволені інструменти та оцінює результат. Модель відповідає за інтерпретацію; код і policy layer — за межі дій.",
          "Звичайний chatbot генерує відповідь. Agent може знайти запис у CRM, створити задачу, запросити відсутні дані й передати кейс людині.",
        ],
      },
      {
        id: "architecture",
        title: "П’ять шарів робочого агента",
        bullets: [
          "Model: інтерпретація й вибір наступного кроку.",
          "Tools: CRM, пошта, пошук, календар, база даних.",
          "Context: дані поточного кейсу й релевантні знання.",
          "Policy: дозволи, ліміти, перевірки й human approval.",
          "Observability: журнал дій, метрики, помилки й оцінка якості.",
        ],
      },
      {
        id: "fit",
        title: "Де agent окупається",
        body: [
          "Сильні сценарії мають великий повторюваний потік, цифровий вхід, зрозумілий результат і доступні системи. Приклади: triage підтримки, qualification lead, збір документів, reconciliation і внутрішній knowledge assistant.",
          "Слабкі сценарії: рідкісні стратегічні рішення, процес без власника, хаотичні дані або дія з високою ціною помилки без можливості перевірки.",
        ],
      },
      {
        id: "roi",
        title: "Формула ROI",
        body: [
          "Місячний ефект = обсяг кейсів × хвилини до автоматизації × частка безпечної автоматизації × вартість хвилини — модель, інфраструктура, підтримка й перевірки. Окремо врахуйте швидкість відповіді, помилки та пропущені можливості.",
          "Почніть з baseline за чотири тижні. Без baseline після запуску неможливо відрізнити ефект системи від сезонності.",
        ],
      },
    ],
    faq: [
      ["AI agent і chatbot — те саме?", "Ні. Chatbot переважно відповідає. Agent обирає та виконує дозволені дії через інструменти."],
      ["Чи може agent працювати автономно?", "Може в межах низькоризикових дій. Фінансові, юридичні та незворотні рішення потребують чітких правил і часто human approval."],
      ["Скільки часу займає прототип?", "Один вузький сценарій можна перевірити за 2–3 тижні, якщо доступні дані, API й критерій якості."],
    ],
    related: ["n8n-ukrainskoiu", "notebooklm-for-business"],
  },
];

export const insightBySlug = Object.fromEntries(
  insightArticles.map((article) => [article.slug, article]),
);

export const workflowTemplates = [
  ["lead-routing", "Маршрутизація лідів", "Форма → валідація → CRM → сповіщення", "LEADS"],
  ["telegram-support", "Telegram support triage", "Повідомлення → категорія → owner → відповідь", "SUPPORT"],
  ["meeting-summary", "Підсумок зустрічі", "Транскрипт → рішення → задачі → Notion", "OPERATIONS"],
  ["invoice-extraction", "Розбір рахунків", "Email → файл → поля → перевірка → ERP", "DOCUMENTS"],
  ["content-approval", "Погодження контенту", "Brief → draft → review → publish queue", "CONTENT"],
  ["crm-enrichment", "CRM enrichment", "Новий lead → company data → score → CRM", "SALES"],
  ["no-show-recovery", "No-show recovery", "Booking → reminder → status → rebooking", "BEAUTY"],
  ["knowledge-answer", "Knowledge answer", "Питання → retrieval → citation → escalation", "KNOWLEDGE"],
  ["review-monitor", "Моніторинг відгуків", "Новий review → sentiment → alert → task", "SERVICE"],
  ["weekly-ops-report", "Щотижневий ops-report", "Metrics → anomalies → summary → email", "ANALYTICS"],
].map(([slug, title, flow, category], index) => ({
  slug,
  title,
  flow,
  category,
  index: String(index + 1).padStart(2, "0"),
}));

export const solutionPages = [
  {
    slug: "real-estate-automation",
    kicker: "НЕРУХОМІСТЬ",
    title: "AI-автоматизація для агенції нерухомості",
    description: "Автоматизація лідів, підбору об’єктів, follow-up і документів для агенцій нерухомості. Архітектура процесу, інтеграції та контроль людини.",
    dek: "Заявка не губиться між порталом, месенджером і CRM. Система нормалізує запит, підбирає наступну дію та повертає брокеру готовий контекст.",
    problem: "Брокер витрачає час не на переговори, а на копіювання контактів, повторні уточнення, пошук актуального об’єкта й ручний follow-up.",
    flow: ["Заявка з порталу або месенджера", "Перевірка контакту й наміру", "CRM та відповідальний брокер", "Підбір об’єктів і follow-up", "Контроль відповіді та ескалація"],
    outcomes: ["менше втрачених заявок", "швидша перша відповідь", "єдина історія клієнта"],
    integrations: ["CRM", "WhatsApp / Telegram", "Email", "Property feed", "Calendar"],
    faq: [
      ["Чи замінює система брокера?", "Ні. Вона готує дані, запускає follow-up і контролює SLA. Переговори, показ і рішення залишаються за брокером."],
      ["Що потрібно для старту?", "Один канал заявок, CRM або таблиця, 30–50 анонімізованих кейсів і правила передачі lead."],
    ],
  },
  {
    slug: "beauty-salon-automation",
    kicker: "BEAUTY · NO-SHOW",
    title: "Автоматизація салону краси: менше no-show",
    description: "AI-автоматизація салону краси: нагадування, перенесення запису, повернення клієнтів і синхронізація CRM без ручних повідомлень.",
    dek: "Запис отримує правильне нагадування, клієнт може підтвердити або перенести в один крок, а вільне вікно повертається у продаж.",
    problem: "Однакові нагадування не враховують послугу, історію клієнта й ризик пропуску. Адміністратор витрачає години на повідомлення та ручне перенесення.",
    flow: ["Новий запис", "Сегмент і ризик no-show", "Персональне нагадування", "Підтвердження або перенесення", "Waitlist і rebooking"],
    outcomes: ["менше порожніх вікон", "менше ручних повідомлень", "більше повторних записів"],
    integrations: ["Booking system", "CRM", "SMS", "WhatsApp / Telegram", "Payment link"],
    faq: [
      ["Чи потрібна нова CRM?", "Не обов’язково. Спершу перевіряємо API або export чинної системи запису."],
      ["Чи можна брати передплату?", "Так, якщо booking і payment-провайдер підтримують потрібний сценарій. Умови повернення задає бізнес."],
    ],
  },
  {
    slug: "saas-onboarding-ai",
    kicker: "SAAS · ACTIVATION",
    title: "AI-onboarding для SaaS: від signup до першої цінності",
    description: "AI-onboarding assistant для SaaS: сегментація, персональний маршрут, база знань, product events і передача customer success.",
    dek: "Новий користувач отримує наступний крок за своїм use case, а команда бачить, де activation зупинився і коли потрібна людина.",
    problem: "Одна email-серія для всіх не враховує роль, дані, інтеграції та справжню причину, чому користувач не дійшов до value moment.",
    flow: ["Signup і use case", "Персональний activation plan", "Підказка з бази знань", "Product event і прогрес", "Escalation до customer success"],
    outcomes: ["швидший time-to-value", "менше повторних питань", "видимі onboarding blockers"],
    integrations: ["Product analytics", "CRM", "Knowledge base", "Email / in-app", "Support desk"],
    faq: [
      ["Це chatbot у продукті?", "Не лише. Assistant використовує product events, знання й правила ескалації, щоб вести до конкретної дії."],
      ["Як вимірювати результат?", "Activation rate, time-to-value, completion ключових подій, support deflection і assisted conversion."],
    ],
  },
  {
    slug: "lead-routing-ai",
    kicker: "SALES OPERATIONS",
    title: "AI-маршрутизація лідів: перевірка, score і SLA",
    description: "Автоматична маршрутизація лідів: нормалізація, enrichment, deduplication, scoring, CRM assignment і контроль SLA.",
    dek: "Кожен lead проходить однакову перевірку, отримує пояснюваний пріоритет і потрапляє до правильної команди без ручного triage.",
    problem: "Ліди приходять з різними полями, дублюються, чекають у загальній черзі й розподіляються за інтуїцією. Це спотворює звітність і швидкість продажу.",
    flow: ["Форма, реклама або partner feed", "Нормалізація й deduplication", "Enrichment і policy checks", "Пояснюваний score", "CRM owner, SLA та fallback"],
    outcomes: ["менший response time", "чистіші CRM-дані", "контрольований розподіл"],
    integrations: ["CRM", "Forms", "Ad platforms", "Enrichment API", "Slack / Teams"],
    faq: [
      ["Чи можна використовувати LLM для scoring?", "Для ознак і класифікації — так. Остаточний score краще обмежити правилами, тестами на bias і журналом пояснень."],
      ["Як уникнути дублів?", "Визначити idempotency key, нормалізувати email/телефон/домен і перевіряти CRM до створення запису."],
    ],
  },
  {
    slug: "n8n-hosting-switzerland",
    kicker: "SWITZERLAND · N8N",
    title: "n8n hosting Switzerland: контроль даних і workflow",
    description: "n8n hosting у Швейцарії або EU: приватна мережа, secrets, backup, audit logs, monitoring і revDSG-ready архітектура.",
    dek: "Self-hosted n8n для команд, яким потрібен контроль регіону, доступів та інтеграцій — разом з операційною відповідальністю, яку self-hosting додає.",
    problem: "Перенести n8n на сервер недостатньо. Без backup, monitoring, secrets rotation і плану відновлення контроль даних перетворюється на новий ризик.",
    flow: ["Data-flow і risk assessment", "CH або EU deployment", "Secrets і network access", "Backup, monitoring, audit log", "Runbook і incident owner"],
    outcomes: ["контроль регіону даних", "прозорі доступи", "відновлювані workflows"],
    integrations: ["Docker", "PostgreSQL", "Queue mode", "S3-compatible backup", "Observability"],
    faq: [
      ["Чи означає hosting у Швейцарії автоматичну відповідність revDSG?", "Ні. Регіон — один фактор. Потрібні правова підстава, data flow, contracts, access control, retention і процес інцидентів."],
      ["Cloud чи self-hosted?", "Cloud швидший для старту. Self-hosted виправданий вимогами мережі, регіону, custom nodes або контролю оновлень."],
    ],
  },
];

export const solutionBySlug = Object.fromEntries(
  solutionPages.map((solution) => [solution.slug, solution]),
);

export function makeWorkflowJson(template) {
  return {
    name: `AI Insider — ${template.title}`,
    nodes: [
      {
        parameters: {},
        id: `${template.slug}-trigger`,
        name: "Manual Trigger",
        type: "n8n-nodes-base.manualTrigger",
        typeVersion: 1,
        position: [0, 0],
      },
      {
        parameters: {
          assignments: {
            assignments: [
              {
                id: `${template.slug}-note`,
                name: "implementation_note",
                value: `${template.flow}. Starter blueprint: replace this node with production integrations, credentials, validation and error handling.`,
                type: "string",
              },
            ],
          },
          options: {},
        },
        id: `${template.slug}-blueprint`,
        name: "Implementation Blueprint",
        type: "n8n-nodes-base.set",
        typeVersion: 3.4,
        position: [260, 0],
      },
    ],
    pinData: {},
    connections: {
      "Manual Trigger": {
        main: [[{ node: "Implementation Blueprint", type: "main", index: 0 }]],
      },
    },
    active: false,
    settings: { executionOrder: "v1" },
    meta: {
      templateCredsSetupCompleted: false,
      source: "AI Insider starter workflow library",
      disclaimer: "Blueprint only. Add credentials, validation, error handling and monitoring before production use.",
    },
    tags: [],
  };
}
