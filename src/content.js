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
      [
        "Чи потрібен програміст для n8n?",
        "Для простих інтеграцій — ні. Для production-сценаріїв потрібне розуміння API, даних, помилок і безпеки.",
      ],
      [
        "Чи можна підключити AI-модель?",
        "Так. Але відповідь моделі треба перевіряти схемою, правилами або людиною перед незворотною дією.",
      ],
      [
        "Чи безкоштовний n8n?",
        "Є self-hosted community edition. Інфраструктура, підтримка й робота команди все одно мають вартість.",
      ],
    ],
    related: ["n8n-mcp-server", "n8n-docker-self-hosted", "n8n-ai-agent"],
    sources: [
      ["Офіційна документація n8n", "https://docs.n8n.io/"],
      [
        "Security audit n8n",
        "https://docs.n8n.io/hosting/securing/security-audit/",
      ],
    ],
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
    updated: "2026-09-02",
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
      [
        "Чи замінює AI Studio готовий продукт?",
        "Ні. Це середовище прототипування. Production потребує backend, доступів, моніторингу й обробки помилок.",
      ],
      [
        "Чи можна тестувати документи?",
        "Так, якщо формат підтримується. Перед завантаженням перевірте права, конфіденційність і правила зберігання.",
      ],
    ],
    related: [
      "google-workspace-studio-ukrainskoiu",
      "notebooklm-for-business",
      "ai-agent-what-is-it",
    ],
    sources: [
      [
        "Google AI Studio quickstart",
        "https://ai.google.dev/gemini-api/docs/ai-studio-quickstart",
      ],
      [
        "Gemini API structured output",
        "https://ai.google.dev/gemini-api/docs/structured-output",
      ],
    ],
  },
  {
    slug: "notebooklm-for-business",
    category: "БАЗИ ЗНАНЬ",
    title: "Gemini Notebook (NotebookLM) для бізнесу: база знань без хаосу",
    shortTitle: "Gemini Notebook / NotebookLM",
    description:
      "Gemini Notebook, раніше NotebookLM, для бізнесу: джерела, права доступу, перевірка цитат, support, sales і навчання команди.",
    dek: "NotebookLM отримав назву Gemini Notebook. Функція лишилася знайомою: робота з власними джерелами. Корпоративна база знань усе одно починається з прав, версій і власника відповіді.",
    readTime: "11 хв",
    published: "2026-08-20",
    updated: "2026-09-02",
    accent: "#7b8dff",
    takeaways: [
      "NotebookLM перейменовано на Gemini Notebook; стару назву ще використовують у пошуку й інтерфейсах перехідного періоду.",
      "Цитата допомагає перевірити відповідь, але користувач все одно має відкрити джерело.",
      "Для масштабування потрібні access control, versioning і контур відповідальності.",
    ],
    sections: [
      {
        id: "fit",
        title: "Що змінило після перейменування",
        body: [
          "Google перейменував NotebookLM на Gemini Notebook. Продукт лишається окремим research assistant, який працює з доданими джерелами й показує цитати. Назва NotebookLM досі важлива: її використовують у старих посиланнях, документації та пошукових запитах.",
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
        title: "Gemini Notebook чи власний RAG",
        body: [
          "NotebookLM швидший для дослідження й особистої роботи. Власний RAG потрібен, коли важливі ролі доступу, інтеграція в продукт, контроль індексації, versioning, API, журнал рішень і вимірювані SLA.",
        ],
      },
    ],
    faq: [
      [
        "NotebookLM і Gemini Notebook — це різні продукти?",
        "Ні. Google перейменував NotebookLM на Gemini Notebook. Функції й доступ можуть оновлюватися поступово.",
      ],
      [
        "Чи є Gemini Notebook корпоративною базою знань?",
        "Може бути інструментом роботи з джерелами. Повна корпоративна система також потребує governance, доступів, актуалізації та інтеграцій.",
      ],
      [
        "Чи можна довіряти цитатам?",
        "Цитата спрощує перевірку, але не скасовує її. Відкривайте першоджерело для критичних рішень.",
      ],
    ],
    related: [
      "google-workspace-studio-ukrainskoiu",
      "google-ai-studio-guide",
      "ai-agent-what-is-it",
    ],
    sources: [
      [
        "Gemini Notebook — офіційна сторінка Google",
        "https://workspace.google.com/intl/uk/products/gemini-notebook/",
      ],
      [
        "Керування Gemini Notebook для організації",
        "https://knowledge.workspace.google.com/admin/generative-ai/gemini-notebook/turn-gemini-notebook-on-or-off-for-users",
      ],
    ],
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
      [
        "Що краще для малого бізнесу?",
        "Платформа, яку команда реально зможе підтримувати. Для простих SaaS-зв’язок часто достатньо Zapier або Make; для глибших процесів — n8n.",
      ],
      [
        "Чи варто переносити всі workflows?",
        "Ні. Спершу перенесіть один критичний і один типовий сценарій та порівняйте фактичну підтримку.",
      ],
    ],
    related: [
      "n8n-ukrainskoiu",
      "n8n-docker-self-hosted",
      "n8n-error-handling",
    ],
    sources: [
      ["n8n hosting documentation", "https://docs.n8n.io/hosting/"],
      ["Make Help Center", "https://help.make.com/"],
      ["Zapier Help Center", "https://help.zapier.com/"],
    ],
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
    updated: "2026-09-02",
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
      [
        "AI agent і chatbot — те саме?",
        "Ні. Chatbot переважно відповідає. Agent обирає та виконує дозволені дії через інструменти.",
      ],
      [
        "Чи може agent працювати автономно?",
        "Може в межах низькоризикових дій. Фінансові, юридичні та незворотні рішення потребують чітких правил і часто human approval.",
      ],
      [
        "Скільки часу займає прототип?",
        "Один вузький сценарій можна перевірити за 2–3 тижні, якщо доступні дані, API й критерій якості.",
      ],
    ],
    related: [
      "n8n-ai-agent",
      "n8n-mcp-server",
      "google-workspace-studio-ukrainskoiu",
    ],
    sources: [
      [
        "AI Agent node — n8n documentation",
        "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/",
      ],
      ["OpenAI Agents guide", "https://platform.openai.com/docs/guides/agents"],
    ],
  },
  {
    slug: "google-workspace-studio-ukrainskoiu",
    category: "АВТОМАТИЗАЦІЯ",
    title:
      "Google Workspace Studio українською: AI-агенти для Gmail, Drive і Chat",
    shortTitle: "Google Workspace Studio",
    description:
      "Google Workspace Studio українською: як створювати AI-агентів і автоматизації для Gmail, Drive, Chat, Calendar та Sheets без коду.",
    dek: "Workspace Studio став окремим automation-продуктом Google. Розбираємо, що він робить, чим відрізняється від Google AI Studio та коли бізнесу потрібен n8n замість нього.",
    readTime: "13 хв",
    published: "2026-09-02",
    updated: "2026-09-02",
    accent: "#4fe3ff",
    takeaways: [
      "Workspace Studio автоматизує роботу всередині Google Workspace; Google AI Studio прототипує застосунки на Gemini API.",
      "Сильний стартовий сценарій має одну подію, одну контрольовану дію й видимого owner.",
      "Для складних зовнішніх інтеграцій, власної інфраструктури та глибокого error handling частіше потрібен n8n або custom backend.",
    ],
    comparison: [
      ["Критерій", "Workspace Studio", "Google AI Studio", "n8n"],
      [
        "Основна задача",
        "Workspace automation",
        "Gemini prototype",
        "Process orchestration",
      ],
      ["Gmail / Drive контекст", "Нативний", "Через API", "Через integrations"],
      ["Зовнішні системи", "Connectors", "Код / API", "Широкі integrations"],
      ["Self-hosting", "Ні", "Ні", "Так"],
    ],
    sections: [
      {
        id: "what",
        title: "Що таке Google Workspace Studio",
        body: [
          "Google Workspace Studio — середовище для створення, керування й поширення AI-агентів у Workspace. Користувач описує automation природною мовою, налаштовує кроки та запускає flow з Gmail, Chat, Drive або інших Workspace apps.",
          "Це не нова назва Google AI Studio. AI Studio потрібен розробнику для prompt, model settings, structured output, function calling і Gemini API. Workspace Studio потрібен команді для автоматизації повсякденної роботи.",
        ],
      },
      {
        id: "use-cases",
        title: "П’ять сценаріїв для бізнесу",
        bullets: [
          "Після зустрічі: summary, action items, повідомлення в Chat і draft follow-up email.",
          "Новий лист із вкладенням: файл у Drive, рядок у Sheets, задача відповідальному.",
          "Пріоритетні листи: класифікація, label, короткий summary й нагадування.",
          "Новий документ: перевірка обов’язкових полів і запит відсутніх даних.",
          "Щотижневий status: збір оновлень, узагальнення й публікація для команди.",
        ],
      },
      {
        id: "pilot",
        title: "Як запустити перший flow",
        body: [
          "Оберіть один процес із цифровим входом і низькою ціною помилки. Зафіксуйте trigger, дозволені джерела, очікуваний output, owner і умову зупинки. Протестуйте happy path, відсутні дані, неправильний файл і повторний запуск.",
          "Не давайте агенту більше доступу, ніж потрібно. Перевірте, чи flow успадковує права користувача, як показує автоматично створені дії та де адміністратор бачить activity.",
        ],
      },
      {
        id: "choice",
        title: "Workspace Studio чи n8n",
        body: [
          "Workspace Studio сильний, коли процес живе в Gmail, Drive, Calendar, Chat і Sheets. n8n сильніший, коли flow поєднує CRM, ERP, webhooks, databases, custom APIs, queues і власну модель відновлення після помилок.",
          "Практичний вибір: змоделюйте один process map на обох платформах і порівняйте доступи, observability, retry, versioning та вартість підтримки — не кількість рекламних integrations.",
        ],
      },
    ],
    faq: [
      [
        "Google Workspace Studio і Google AI Studio — одне й те саме?",
        "Ні. Workspace Studio автоматизує роботу в Workspace. AI Studio допомагає прототипувати застосунки на Gemini API.",
      ],
      [
        "Чи доступний Workspace Studio без коду?",
        "Так, базові flows створюються природною мовою й готовими кроками. Складні інтеграції можуть потребувати connector або custom extension.",
      ],
      [
        "Чи замінить він n8n?",
        "Для Workspace-first сценаріїв — іноді. Для складної міжсистемної orchestration, self-hosting і власного error handling — не завжди.",
      ],
    ],
    related: [
      "google-ai-studio-guide",
      "notebooklm-for-business",
      "n8n-vs-make-vs-zapier",
    ],
    sources: [
      [
        "Google Workspace Studio — офіційна сторінка",
        "https://workspace.google.com/intl/uk/studio/",
      ],
      ["Workspace privacy hub", "https://support.google.com/a/answer/15706919"],
    ],
  },
  {
    slug: "n8n-mcp-server",
    category: "N8N · MCP",
    title:
      "n8n MCP Server: як створювати workflow через ChatGPT, Claude або Cursor",
    shortTitle: "n8n MCP Server",
    description:
      "n8n MCP Server українською: підключення AI-клієнта, створення й оновлення workflow, permissions, перевірка та безпечний production запуск.",
    dek: "Офіційний MCP server n8n дозволяє AI-клієнту створювати, перевіряти й оновлювати workflow напряму. Швидкість вища, але доступ до instance потребує жорстких меж.",
    readTime: "15 хв",
    published: "2026-09-02",
    updated: "2026-09-02",
    accent: "#4fe3ff",
    takeaways: [
      "n8n MCP server керує instance; MCP Server Trigger exposes один конкретний workflow — це різні механізми.",
      "Підключайте окремий test instance або project з мінімальними credentials.",
      "Будь-який згенерований workflow проходить review, test payload, error path і rollback перед activation.",
    ],
    sections: [
      {
        id: "difference",
        title: "MCP server і MCP Server Trigger",
        body: [
          "Офіційний MCP server дає сумісному AI-клієнту інструменти для роботи з n8n instance: створення, зміни, validation і test execution. MCP Server Trigger робить протилежне — публікує можливості одного workflow як tools для зовнішнього agent.",
          "Плутанина небезпечна: instance-level доступ ширший. Перед підключенням визначте, які projects, credentials і operations потрібні клієнту.",
        ],
      },
      {
        id: "setup",
        title: "Безпечна схема підключення",
        bullets: [
          "Окремий test project або instance без production credentials.",
          "Персональний access token з мінімальною роллю й строком ротації.",
          "Allowlist клієнтів і контроль мережевого доступу, якщо deployment це підтримує.",
          "Version control для exported workflow JSON.",
          "Audit після кожної AI-сесії: створені nodes, credentials, webhooks і executions.",
        ],
      },
      {
        id: "prompt",
        title: "Prompt для робочого workflow",
        body: [
          "Опишіть trigger, sample payload, transformations, integrations, expected output, duplicate policy, retry policy, alert owner і acceptance tests. Без цих полів agent оптимізує красиву схему, не production behavior.",
          "Попросіть спочатку створити plan і список потрібних credentials. Після погодження — workflow у test project. Лише потім test execution на анонімізованих payload.",
        ],
      },
      {
        id: "review",
        title: "Checklist перед activation",
        bullets: [
          "Webhook має authentication, validation і rate limit.",
          "Повторний event не створює дубль.",
          "Retries не повторюють платіж або незворотну дію.",
          "Execution logs не зберігають секрети й зайві персональні дані.",
          "Error workflow повідомляє owner і зберігає context для відновлення.",
          "Export попередньої версії дозволяє rollback.",
        ],
      },
    ],
    faq: [
      [
        "Чи може ChatGPT створити workflow у n8n?",
        "Так, якщо AI-клієнт підтримує MCP і підключений до офіційного n8n MCP server з потрібними правами.",
      ],
      [
        "Чи доступно це у self-hosted Community Edition?",
        "n8n повідомляє, що офіційний MCP server доступний у різних editions. Перевірте актуальні вимоги вашої версії.",
      ],
      [
        "Чи можна одразу активувати згенерований workflow?",
        "Не варто. Спершу review, test payload, permission audit, error path і rollback.",
      ],
    ],
    related: ["n8n-ai-agent", "n8n-error-handling", "n8n-docker-self-hosted"],
    sources: [
      ["Офіційний анонс n8n MCP Server", "https://blog.n8n.io/n8n-mcp-server/"],
      [
        "n8n MCP documentation",
        "https://docs.n8n.io/advanced-ai/accessing-n8n-mcp-server/",
      ],
    ],
  },
  {
    slug: "n8n-docker-self-hosted",
    category: "N8N · SELF-HOSTED",
    title: "n8n у Docker: production self-hosted без прихованих ризиків",
    shortTitle: "n8n у Docker",
    description:
      "Як встановити n8n у Docker для production: PostgreSQL, reverse proxy, encryption key, backup, queue mode, monitoring, updates і rollback.",
    dek: "Container запускається за хвилини. Надійний n8n deployment починається після запуску: база, secrets, TLS, backup, observability та процедура оновлення.",
    readTime: "16 хв",
    published: "2026-09-02",
    updated: "2026-09-02",
    accent: "#a9c8ff",
    takeaways: [
      "Production data зберігайте у PostgreSQL і persistent volumes, не в ephemeral container filesystem.",
      "N8N_ENCRYPTION_KEY має бути стабільним secret; його втрата блокує розшифрування credentials.",
      "Backup без тестового restore не є планом відновлення.",
    ],
    sections: [
      {
        id: "architecture",
        title: "Мінімальна production-архітектура",
        body: [
          "Базова схема: reverse proxy з TLS → n8n container → PostgreSQL → encrypted credentials. Окремо: backup storage, monitoring, alert channel і owner інциденту. Для великого навантаження додаються Redis і queue mode workers.",
          "Не публікуйте editor без захисту. Обмежте network access, увімкніть user management, використовуйте окремі production credentials і не передавайте secrets через workflow fields.",
        ],
      },
      {
        id: "variables",
        title: "Критичні settings",
        bullets: [
          "N8N_HOST, N8N_PROTOCOL і WEBHOOK_URL відповідають публічному HTTPS domain.",
          "N8N_ENCRYPTION_KEY зберігається поза compose file й резервується окремо.",
          "PostgreSQL має persistent storage, restricted user і backup schedule.",
          "Execution retention обмежує персональні дані й розмір бази.",
          "Timezone встановлено однаково для scheduler, logs і business rules.",
        ],
      },
      {
        id: "updates",
        title: "Оновлення без простою",
        body: [
          "Зафіксуйте image version, прочитайте release notes, зробіть database backup і export критичних workflows. Спершу оновіть staging на копії payload, потім production у вікно з rollback plan.",
          "Не використовуйте floating latest для production. Зміни nodes або database migrations можуть зламати workflow, який роками працював без видимих проблем.",
        ],
      },
      {
        id: "recovery",
        title: "Backup і restore drill",
        body: [
          "Резервуйте PostgreSQL, encryption key, environment configuration і custom nodes. Раз на квартал відновлюйте їх у чистому середовищі та запускайте контрольний workflow.",
          "Виміряйте RPO — скільки executions можна втратити, і RTO — скільки часу допустиме відновлення. Ці числа визначають частоту backup і складність інфраструктури.",
        ],
      },
    ],
    faq: [
      [
        "Чи достатньо Docker Compose для production?",
        "Може бути достатньо для малого контрольованого deployment, якщо додані PostgreSQL, TLS, secrets, backup, monitoring та update process.",
      ],
      [
        "SQLite чи PostgreSQL?",
        "SQLite підходить для локального старту. Для production зазвичай обирають PostgreSQL через керованість, backup і масштабування.",
      ],
      [
        "Що станеться при втраті encryption key?",
        "Збережені credentials неможливо коректно розшифрувати. Key потрібно резервувати як критичний secret.",
      ],
    ],
    related: ["n8n-error-handling", "n8n-webhook", "n8n-mcp-server"],
    sources: [
      [
        "n8n Docker installation",
        "https://docs.n8n.io/hosting/installation/docker/",
      ],
      [
        "n8n environment variables",
        "https://docs.n8n.io/hosting/configuration/environment-variables/",
      ],
    ],
  },
  {
    slug: "n8n-telegram-bot",
    category: "N8N · TELEGRAM",
    title:
      "n8n Telegram bot: заявки, підтримка й AI-відповіді без втрати контролю",
    shortTitle: "n8n Telegram bot",
    description:
      "n8n Telegram bot українською: BotFather, Telegram Trigger, заявки, AI-класифікація, human handoff, rate limits і production checklist.",
    dek: "Telegram bot стає бізнес-системою не після першої відповіді, а після валідації, маршрутизації, захисту від дублів і передачі людині.",
    readTime: "14 хв",
    published: "2026-09-02",
    updated: "2026-09-02",
    accent: "#4fe3ff",
    takeaways: [
      "Bot token зберігається тільки в credentials або server secret, ніколи в client code чи workflow export.",
      "Кожне повідомлення має idempotency key з update_id або message_id.",
      "AI-відповідь потребує confidence threshold, дозволених джерел і human handoff.",
    ],
    sections: [
      {
        id: "setup",
        title: "Від BotFather до Telegram Trigger",
        body: [
          "Створіть bot у BotFather, додайте token у n8n credential і підключіть Telegram Trigger. Для production використовуйте HTTPS webhook URL, стабільний domain і окремого bot для test environment.",
          "Одразу визначте, хто може писати bot, які message types підтримуються й що відбувається з file, voice та callback query. Непідтриманий формат має отримати зрозумілу відповідь, не silent failure.",
        ],
      },
      {
        id: "lead",
        title: "Workflow для заявки",
        bullets: [
          "Telegram Trigger приймає update й зберігає update_id.",
          "Code або Edit Fields нормалізує username, chat_id, текст і source.",
          "Validation перевіряє контакт, довжину brief і spam markers.",
          "CRM node шукає дубль перед створенням lead.",
          "Manager alert містить контекст і direct link на чат.",
          "Користувач отримує success тільки після підтвердження CRM або queue.",
        ],
      },
      {
        id: "ai",
        title: "AI-відповідь із human handoff",
        body: [
          "Модель спершу класифікує intent і визначає, чи є відповідь у дозволеній базі знань. Для низької впевненості, конфлікту джерел, персональних даних або запиту на дію workflow створює ticket і передає людині.",
          "Зберігайте не весь чат безстроково, а мінімальний context відповідно до retention policy. Маскуйте токени, документи та персональні поля в execution logs.",
        ],
      },
      {
        id: "production",
        title: "Production checklist",
        bullets: [
          "Token не потрапляє у Git, browser bundle або повідомлення про помилку.",
          "Allowed chat/user policy обмежує адміністративні commands.",
          "Rate limit і cooldown захищають API та модель від spam.",
          "Retries враховують Telegram 429 і retry_after.",
          "Error workflow повідомляє owner без витоку user content.",
        ],
      },
    ],
    faq: [
      [
        "Чи можна зробити Telegram bot без сервера?",
        "n8n Cloud прибирає власний сервер. Self-hosted n8n все одно потребує доступного HTTPS webhook і підтримки інфраструктури.",
      ],
      [
        "Як отримати chat_id?",
        "Його можна прочитати з Telegram Trigger update після повідомлення bot. Не публікуйте приватні identifiers без потреби.",
      ],
      [
        "Чи можна підключити ChatGPT?",
        "Так, через model node або API. Обмежте tools, джерела, витрати й передачу до людини.",
      ],
    ],
    related: ["n8n-webhook", "n8n-ai-agent", "n8n-error-handling"],
    sources: [
      [
        "Telegram node — n8n documentation",
        "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/",
      ],
      ["Telegram Bot API", "https://core.telegram.org/bots/api"],
    ],
  },
  {
    slug: "n8n-google-sheets",
    category: "N8N · GOOGLE SHEETS",
    title:
      "n8n Google Sheets: автоматизація таблиць без дублів і зламаних рядків",
    shortTitle: "n8n + Google Sheets",
    description:
      "n8n Google Sheets українською: credentials, append/update, lookup, deduplication, pagination, rate limits і перехід від таблиці до CRM.",
    dek: "Google Sheets добре працює як прозорий операційний інтерфейс. Але без ключа запису, schema й контролю паралельних executions таблиця швидко стає джерелом дублів.",
    readTime: "13 хв",
    published: "2026-09-02",
    updated: "2026-09-02",
    accent: "#a9c8ff",
    takeaways: [
      "Оберіть стабільний business key; номер рядка не є надійним identifier.",
      "Перед append виконуйте lookup або використовуйте idempotency store.",
      "Sheets — робочий interface, не безмежна database; визначте момент міграції до CRM або PostgreSQL.",
    ],
    sections: [
      {
        id: "credentials",
        title: "Credentials і доступ",
        body: [
          "Для особистого workflow зручно OAuth2. Для server-to-server сценарію може підійти service account, якщо політики Google Workspace це дозволяють. Надавайте доступ тільки потрібному spreadsheet, не всьому Drive.",
          "Відокремте test і production sheets. Назви columns та data types зафіксуйте як schema; ручне перейменування column має бути контрольованою зміною.",
        ],
      },
      {
        id: "upsert",
        title: "Append, update або upsert",
        body: [
          "Append додає новий рядок і підходить для immutable events. Update змінює знайдений запис. Upsert спершу шукає business key — lead_id, order_id або normalized email — а потім update чи append.",
          "Не використовуйте row number як ключ: сортування й ручне вставлення змінюють позиції. Зберігайте окремий стабільний ID у column.",
        ],
      },
      {
        id: "scale",
        title: "Паралельність і великі набори",
        bullets: [
          "Обробляйте дані batch, не одним API call на кожну cell.",
          "Враховуйте Google API quotas й exponential backoff.",
          "Блокуйте або серіалізуйте executions, які можуть змінити той самий запис.",
          "Зберігайте cursor або last processed ID, не лише timestamp.",
          "Для великих joins і частих writes переходьте до database.",
        ],
      },
      {
        id: "pattern",
        title: "Практичний flow: форма → Sheets → CRM",
        body: [
          "Webhook приймає форму, validation нормалізує поля, lookup перевіряє lead_id, Sheets зберігає прозорий журнал, CRM отримує qualified lead, Telegram повідомляє owner. Success повертається після надійного запису або queue acknowledgement.",
          "Error path записує correlation ID і причину без дублювання lead. Повторний запуск використовує той самий business key.",
        ],
      },
    ],
    faq: [
      [
        "Як прибрати дублікати в n8n і Google Sheets?",
        "Визначити стабільний key, виконувати lookup перед append і зробити повторний event безпечним.",
      ],
      [
        "Чи можна використовувати Sheets як CRM?",
        "Для малого процесу — тимчасово. Коли потрібні permissions, relations, audit history і часті parallel writes, краще перейти до CRM або database.",
      ],
      [
        "OAuth2 чи service account?",
        "OAuth2 зручний для user-owned workflow. Service account — для системного доступу з окремими правами. Вибір залежить від Workspace policy.",
      ],
    ],
    related: ["n8n-webhook", "n8n-error-handling", "n8n-ukrainskoiu"],
    sources: [
      [
        "Google Sheets node — n8n documentation",
        "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/",
      ],
      [
        "Google Sheets API limits",
        "https://developers.google.com/workspace/sheets/api/limits",
      ],
    ],
  },
  {
    slug: "n8n-webhook",
    category: "N8N · WEBHOOK",
    title: "n8n Webhook: authentication, validation і відповідь без дублів",
    shortTitle: "n8n Webhook",
    description:
      "n8n Webhook українською: test і production URL, authentication, signature validation, response mode, idempotency, retries та захист персональних даних.",
    dek: "Webhook — вхідні двері workflow. Production-різниця: запит має бути автентифікований, перевірений, безпечний для повтору й завершений прогнозованою HTTP-відповіддю.",
    readTime: "14 хв",
    published: "2026-09-02",
    updated: "2026-09-02",
    accent: "#2b4bff",
    takeaways: [
      "Test URL працює під час ручного listening; production URL — після activation workflow.",
      "Перевіряйте signature на raw body, якщо provider використовує HMAC.",
      "Швидко повертайте acknowledgement, а довгу роботу виконуйте асинхронно.",
    ],
    sections: [
      {
        id: "urls",
        title: "Test URL і production URL",
        body: [
          "Test URL потрібен для розробки й слухає один test execution. Production URL стабільний та працює після activation. Не підключайте зовнішній provider до test URL: після закриття editor events почнуть губитися.",
          "WEBHOOK_URL має відповідати публічному HTTPS domain. За reverse proxy передавайте правильний protocol і host, інакше n8n покаже внутрішню адресу.",
        ],
      },
      {
        id: "security",
        title: "Authentication і signature",
        bullets: [
          "Використовуйте supported authentication або перевіряйте secret header.",
          "Для HMAC зберігайте raw body до JSON transformation.",
          "Порівнюйте signature constant-time способом у custom code/backend.",
          "Перевіряйте timestamp, щоб обмежити replay window.",
          "Не повертайте stack trace, credentials чи provider secret.",
        ],
      },
      {
        id: "idempotency",
        title: "Idempotency і повторні доставки",
        body: [
          "Provider може повторити event після timeout або 5xx. Збережіть event_id у database чи data store перед незворотною дією. Якщо ID вже оброблено, поверніть success без повторного платежу, листа або CRM record.",
          "Якщо provider не дає event_id, сформуйте key з business identifier і version. Timestamp сам по собі недостатній.",
        ],
      },
      {
        id: "response",
        title: "Коли відповідати webhook",
        body: [
          "Для короткого flow можна відповісти після завершення. Для AI, document processing або кількох API calls безпечніше перевірити запит, записати job і швидко повернути 202 або provider-compatible acknowledgement.",
          "Встановіть timeout на зовнішні calls. Error path має відрізняти retryable failure від permanent validation error.",
        ],
      },
    ],
    faq: [
      [
        "Чому n8n test webhook не працює постійно?",
        "Test URL слухає під час test execution. Для постійного приймання активуйте workflow й використовуйте production URL.",
      ],
      [
        "Як захистити webhook?",
        "Authentication, signature validation, replay window, schema validation, rate limit і мінімальні error responses.",
      ],
      [
        "Як уникнути подвійної обробки?",
        "Зберігати provider event_id та робити незворотні дії idempotent.",
      ],
    ],
    related: ["n8n-error-handling", "n8n-telegram-bot", "n8n-google-sheets"],
    sources: [
      [
        "Webhook node — n8n documentation",
        "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/",
      ],
      ["Webhook security guidance", "https://docs.n8n.io/hosting/securing/"],
    ],
  },
  {
    slug: "n8n-error-handling",
    category: "N8N · PRODUCTION",
    title: "n8n error handling: retries, error workflow і відновлення процесу",
    shortTitle: "n8n error handling",
    description:
      "n8n error handling українською: retry, Continue On Fail, Stop And Error, error workflow, idempotency, alerts і manual recovery runbook.",
    dek: "Production workflow визначається не happy path, а поведінкою під час timeout, 429, неправильного payload і частково виконаної операції.",
    readTime: "15 хв",
    published: "2026-09-02",
    updated: "2026-09-02",
    accent: "#4fe3ff",
    takeaways: [
      "Retry потрібен для transient failure, але небезпечний для неідемпотентних дій.",
      "Continue On Fail не замінює error policy — він лише дозволяє workflow рухатися далі.",
      "Alert має містити workflow, execution, business key, failed step і дозволену наступну дію.",
    ],
    sections: [
      {
        id: "types",
        title: "Чотири типи помилок",
        body: [
          "Validation error означає неправильний input і зазвичай не потребує retry. Transient error — timeout, 429 або тимчасовий 5xx. Permanent integration error — revoked credential чи removed field. Business exception — технічно валідний кейс, який потребує людини.",
          "Різні типи не можна вести одним шляхом. Автоматичний retry неправильного payload лише створює noise і витрати.",
        ],
      },
      {
        id: "retry",
        title: "Retry без подвійної дії",
        bullets: [
          "Перевірте, чи operation idempotent.",
          "Використовуйте provider idempotency key, якщо він доступний.",
          "Застосовуйте exponential backoff і ліміт спроб.",
          "Для 429 поважайте retry-after.",
          "Після ліміту спроб створіть recoverable job, не губіть context.",
        ],
      },
      {
        id: "workflow",
        title: "Error workflow і alert",
        body: [
          "Окремий error workflow приймає дані execution, визначає severity, маскує секретні поля й надсилає alert. Critical — процес зупинено й клієнт чекає. Warning — fallback спрацював. Info — кейс передано людині за правилом.",
          "Alert без business context змушує відкривати n8n і досліджувати вручну. Додайте correlation ID, account або order reference, failed node, error class і runbook link.",
        ],
      },
      {
        id: "recovery",
        title: "Manual recovery runbook",
        body: [
          "Runbook відповідає на п’ять питань: що вже виконано, що безпечно повторити, як перевірити зовнішню систему, хто приймає рішення й як закрити incident. Зберігайте checkpoint перед незворотними кроками.",
          "Щомісяця переглядайте top errors за кількістю, втраченим часом і бізнес-впливом. Найчастіша помилка не завжди найдорожча.",
        ],
      },
    ],
    faq: [
      [
        "Що робить Continue On Fail?",
        "Дозволяє workflow продовжити execution після помилки node. Потрібно явно обробити error output, інакше проблема стане тихою.",
      ],
      [
        "Коли використовувати retry?",
        "Для тимчасових помилок, якщо повтор operation безпечний або захищений idempotency key.",
      ],
      [
        "Що має бути в alert?",
        "Workflow, execution URL, failed node, business key, severity, коротка причина й наступна дозволена дія.",
      ],
    ],
    related: ["n8n-webhook", "n8n-docker-self-hosted", "n8n-mcp-server"],
    sources: [
      [
        "Error handling — n8n documentation",
        "https://docs.n8n.io/flow-logic/error-handling/",
      ],
      [
        "Error Trigger node",
        "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger/",
      ],
    ],
  },
  {
    slug: "n8n-ai-agent",
    category: "N8N · AI AGENT",
    title:
      "n8n AI Agent: tools, memory, human approval і production guardrails",
    shortTitle: "n8n AI Agent",
    description:
      "n8n AI Agent українською: Agent node, model, tools, memory, structured output, human approval, evaluations, costs і production safety.",
    dek: "Agent корисний, коли input змінюється, а наступну дію треба обирати. Для детермінованого process map звичайний workflow часто дешевший, швидший і надійніший.",
    readTime: "16 хв",
    published: "2026-09-02",
    updated: "2026-09-02",
    accent: "#2b4bff",
    takeaways: [
      "Не перетворюйте весь workflow на agent: залиште validation, permissions і незворотні дії в deterministic code.",
      "Кожен tool має вузький input schema, мінімальні права й зрозумілий error response.",
      "Якість вимірюється на test set: task success, tool accuracy, escalation rate, latency та cost.",
    ],
    sections: [
      {
        id: "fit",
        title: "Коли потрібен AI Agent node",
        body: [
          "Agent виправданий для класифікації нестандартного input, вибору одного з кількох tools, багатокрокового пошуку або уточнення відсутніх даних. Якщо всі кроки й умови відомі, IF, Switch і sub-workflows дадуть більш передбачуваний результат.",
          "Почніть з одного intent і максимум трьох tools. Широкий agent з CRM, email, files і payments одночасно складно тестувати й безпечно обмежити.",
        ],
      },
      {
        id: "tools",
        title: "Як проєктувати tools",
        bullets: [
          "Назва описує одну дію, не цілу систему.",
          "Input schema має required fields, enums і обмеження довжини.",
          "Tool перевіряє permissions незалежно від prompt.",
          "Read і write operations розділені.",
          "Незворотна дія потребує confirmation або human approval.",
          "Output повертає status, data й recoverable error у стабільній структурі.",
        ],
      },
      {
        id: "memory",
        title: "Memory і персональні дані",
        body: [
          "Conversation memory потрібна не кожному agent. Зберігайте тільки context, який покращує наступний крок, із retention period і user scope. Не використовуйте загальну memory для різних клієнтів.",
          "Секрети й credentials не є memory. Tool отримує доступ через server-side credential, а model бачить лише мінімальні поля для рішення.",
        ],
      },
      {
        id: "evaluation",
        title: "Evaluation перед production",
        body: [
          "Зберіть 50–100 анонімізованих кейсів: типові, edge cases, prompt injection, відсутні дані й запит на заборонену дію. Для кожного визначте expected tool, expected fields, escalation і заборонені outcomes.",
          "Порівнюйте task success, tool selection accuracy, invalid arguments, human escalation, latency і cost. Після зміни model або prompt запускайте regression set повторно.",
        ],
      },
    ],
    faq: [
      [
        "Чим n8n AI Agent відрізняється від звичайного workflow?",
        "Agent обирає наступну дію на основі model reasoning. Звичайний workflow виконує наперед визначені кроки й умови.",
      ],
      [
        "Чи потрібна memory?",
        "Тільки якщо попередній context змінює правильну наступну дію. Для одноразової класифікації memory зайва.",
      ],
      [
        "Як дозволити agent надсилати email?",
        "Створити вузький draft tool, перевірити recipient і content policy, а send залишити за human approval або окремим deterministic step.",
      ],
    ],
    related: ["n8n-mcp-server", "ai-agent-what-is-it", "n8n-error-handling"],
    sources: [
      [
        "AI Agent node — n8n documentation",
        "https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/",
      ],
      [
        "Human fallback for AI workflows",
        "https://docs.n8n.io/advanced-ai/examples/human-fallback/",
      ],
    ],
  },
];

export const insightBySlug = Object.fromEntries(
  insightArticles.map((article) => [article.slug, article]),
);

export const workflowTemplates = [
  [
    "lead-routing",
    "Маршрутизація лідів",
    "Форма → валідація → CRM → сповіщення",
    "LEADS",
  ],
  [
    "telegram-support",
    "Telegram support triage",
    "Повідомлення → категорія → owner → відповідь",
    "SUPPORT",
  ],
  [
    "meeting-summary",
    "Підсумок зустрічі",
    "Транскрипт → рішення → задачі → Notion",
    "OPERATIONS",
  ],
  [
    "invoice-extraction",
    "Розбір рахунків",
    "Email → файл → поля → перевірка → ERP",
    "DOCUMENTS",
  ],
  [
    "content-approval",
    "Погодження контенту",
    "Brief → draft → review → publish queue",
    "CONTENT",
  ],
  [
    "crm-enrichment",
    "CRM enrichment",
    "Новий lead → company data → score → CRM",
    "SALES",
  ],
  [
    "no-show-recovery",
    "No-show recovery",
    "Booking → reminder → status → rebooking",
    "BEAUTY",
  ],
  [
    "knowledge-answer",
    "Knowledge answer",
    "Питання → retrieval → citation → escalation",
    "KNOWLEDGE",
  ],
  [
    "review-monitor",
    "Моніторинг відгуків",
    "Новий review → sentiment → alert → task",
    "SERVICE",
  ],
  [
    "weekly-ops-report",
    "Щотижневий ops-report",
    "Metrics → anomalies → summary → email",
    "ANALYTICS",
  ],
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
    description:
      "Автоматизація лідів, підбору об’єктів, follow-up і документів для агенцій нерухомості. Архітектура процесу, інтеграції та контроль людини.",
    dek: "Заявка не губиться між порталом, месенджером і CRM. Система нормалізує запит, підбирає наступну дію та повертає брокеру готовий контекст.",
    problem:
      "Брокер витрачає час не на переговори, а на копіювання контактів, повторні уточнення, пошук актуального об’єкта й ручний follow-up.",
    flow: [
      "Заявка з порталу або месенджера",
      "Перевірка контакту й наміру",
      "CRM та відповідальний брокер",
      "Підбір об’єктів і follow-up",
      "Контроль відповіді та ескалація",
    ],
    outcomes: [
      "менше втрачених заявок",
      "швидша перша відповідь",
      "єдина історія клієнта",
    ],
    integrations: [
      "CRM",
      "WhatsApp / Telegram",
      "Email",
      "Property feed",
      "Calendar",
    ],
    faq: [
      [
        "Чи замінює система брокера?",
        "Ні. Вона готує дані, запускає follow-up і контролює SLA. Переговори, показ і рішення залишаються за брокером.",
      ],
      [
        "Що потрібно для старту?",
        "Один канал заявок, CRM або таблиця, 30–50 анонімізованих кейсів і правила передачі lead.",
      ],
    ],
  },
  {
    slug: "beauty-salon-automation",
    kicker: "BEAUTY · NO-SHOW",
    title: "Автоматизація салону краси: менше no-show",
    description:
      "AI-автоматизація салону краси: нагадування, перенесення запису, повернення клієнтів і синхронізація CRM без ручних повідомлень.",
    dek: "Запис отримує правильне нагадування, клієнт може підтвердити або перенести в один крок, а вільне вікно повертається у продаж.",
    problem:
      "Однакові нагадування не враховують послугу, історію клієнта й ризик пропуску. Адміністратор витрачає години на повідомлення та ручне перенесення.",
    flow: [
      "Новий запис",
      "Сегмент і ризик no-show",
      "Персональне нагадування",
      "Підтвердження або перенесення",
      "Waitlist і rebooking",
    ],
    outcomes: [
      "менше порожніх вікон",
      "менше ручних повідомлень",
      "більше повторних записів",
    ],
    integrations: [
      "Booking system",
      "CRM",
      "SMS",
      "WhatsApp / Telegram",
      "Payment link",
    ],
    faq: [
      [
        "Чи потрібна нова CRM?",
        "Не обов’язково. Спершу перевіряємо API або export чинної системи запису.",
      ],
      [
        "Чи можна брати передплату?",
        "Так, якщо booking і payment-провайдер підтримують потрібний сценарій. Умови повернення задає бізнес.",
      ],
    ],
  },
  {
    slug: "saas-onboarding-ai",
    kicker: "SAAS · ACTIVATION",
    title: "AI-onboarding для SaaS: від signup до першої цінності",
    description:
      "AI-onboarding assistant для SaaS: сегментація, персональний маршрут, база знань, product events і передача customer success.",
    dek: "Новий користувач отримує наступний крок за своїм use case, а команда бачить, де activation зупинився і коли потрібна людина.",
    problem:
      "Одна email-серія для всіх не враховує роль, дані, інтеграції та справжню причину, чому користувач не дійшов до value moment.",
    flow: [
      "Signup і use case",
      "Персональний activation plan",
      "Підказка з бази знань",
      "Product event і прогрес",
      "Escalation до customer success",
    ],
    outcomes: [
      "швидший time-to-value",
      "менше повторних питань",
      "видимі onboarding blockers",
    ],
    integrations: [
      "Product analytics",
      "CRM",
      "Knowledge base",
      "Email / in-app",
      "Support desk",
    ],
    faq: [
      [
        "Це chatbot у продукті?",
        "Не лише. Assistant використовує product events, знання й правила ескалації, щоб вести до конкретної дії.",
      ],
      [
        "Як вимірювати результат?",
        "Activation rate, time-to-value, completion ключових подій, support deflection і assisted conversion.",
      ],
    ],
  },
  {
    slug: "lead-routing-ai",
    kicker: "SALES OPERATIONS",
    title: "AI-маршрутизація лідів: перевірка, score і SLA",
    description:
      "Автоматична маршрутизація лідів: нормалізація, enrichment, deduplication, scoring, CRM assignment і контроль SLA.",
    dek: "Кожен lead проходить однакову перевірку, отримує пояснюваний пріоритет і потрапляє до правильної команди без ручного triage.",
    problem:
      "Ліди приходять з різними полями, дублюються, чекають у загальній черзі й розподіляються за інтуїцією. Це спотворює звітність і швидкість продажу.",
    flow: [
      "Форма, реклама або partner feed",
      "Нормалізація й deduplication",
      "Enrichment і policy checks",
      "Пояснюваний score",
      "CRM owner, SLA та fallback",
    ],
    outcomes: [
      "менший response time",
      "чистіші CRM-дані",
      "контрольований розподіл",
    ],
    integrations: [
      "CRM",
      "Forms",
      "Ad platforms",
      "Enrichment API",
      "Slack / Teams",
    ],
    faq: [
      [
        "Чи можна використовувати LLM для scoring?",
        "Для ознак і класифікації — так. Остаточний score краще обмежити правилами, тестами на bias і журналом пояснень.",
      ],
      [
        "Як уникнути дублів?",
        "Визначити idempotency key, нормалізувати email/телефон/домен і перевіряти CRM до створення запису.",
      ],
    ],
  },
  {
    slug: "n8n-hosting-switzerland",
    kicker: "SWITZERLAND · N8N",
    title: "n8n hosting Switzerland: контроль даних і workflow",
    description:
      "n8n hosting у Швейцарії або EU: приватна мережа, secrets, backup, audit logs, monitoring і revDSG-ready архітектура.",
    dek: "Self-hosted n8n для команд, яким потрібен контроль регіону, доступів та інтеграцій — разом з операційною відповідальністю, яку self-hosting додає.",
    problem:
      "Перенести n8n на сервер недостатньо. Без backup, monitoring, secrets rotation і плану відновлення контроль даних перетворюється на новий ризик.",
    flow: [
      "Data-flow і risk assessment",
      "CH або EU deployment",
      "Secrets і network access",
      "Backup, monitoring, audit log",
      "Runbook і incident owner",
    ],
    outcomes: [
      "контроль регіону даних",
      "прозорі доступи",
      "відновлювані workflows",
    ],
    integrations: [
      "Docker",
      "PostgreSQL",
      "Queue mode",
      "S3-compatible backup",
      "Observability",
    ],
    faq: [
      [
        "Чи означає hosting у Швейцарії автоматичну відповідність revDSG?",
        "Ні. Регіон — один фактор. Потрібні правова підстава, data flow, contracts, access control, retention і процес інцидентів.",
      ],
      [
        "Cloud чи self-hosted?",
        "Cloud швидший для старту. Self-hosted виправданий вимогами мережі, регіону, custom nodes або контролю оновлень.",
      ],
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
      disclaimer:
        "Blueprint only. Add credentials, validation, error handling and monitoring before production use.",
    },
    tags: [],
  };
}
