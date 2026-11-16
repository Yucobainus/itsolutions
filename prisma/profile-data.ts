type ExperienceEntry = {
  company: string;
  position: string;
  startedAt: string;
  endedAt: string | null;
  achievements: string[];
};

const experience: ExperienceEntry[] = [
  {
    company: 'Obmen21',
    position: 'Vue 3 разработчик',
    startedAt: '2025-08',
    endedAt: '2026-06',
    achievements: [
      'Участвовал в развитии и редизайне более десяти криптовалютных обменников.',
      'С нуля разработал клиентскую часть криптоплатёжного сервиса на Nuxt, включая интеграцию с API, QR-коды и обработку статусов операций.',
      'Реализовал сценарий оплаты с переходом между компьютером и телефоном по QR-коду и синхронизацией через токены сессии.',
    ],
  },
  {
    company: 'Элисофт',
    position: 'Frontend-разработчик',
    startedAt: '2024-02',
    endedAt: '2024-11',
    achievements: [
      'Разрабатывал микрофронтенды на Vue 3 и TypeScript. Начал с нуля разработку отдельного раздела продукта.',
      'Реализовал интерактивные таблицы с вложенными данными, обновлением коэффициентов и бесконечной прокруткой.',
      'Вынес общую логику периодического обновления данных в пакет монорепозитория и участвовал в миграции модулей на Feature-Sliced Design.',
    ],
  },
  {
    company: 'ONE TOUCH',
    position: 'Frontend-разработчик',
    startedAt: '2022-08',
    endedAt: '2024-01',
    achievements: [
      'Интегрировал Vue-компоненты и формы в проекты на Bitrix и Laravel.',
      'Участвовал в редизайне разделов интернет-магазинов и личных кабинетов, постепенно заменял компоненты на jQuery компонентами Vue.',
      'Участвовал в проектах Hoff и ЖК «Русская Европа», помогал менее опытным разработчикам.',
    ],
  },
  {
    company: 'Zharkov',
    position: 'HTML-верстальщик',
    startedAt: '2022-03',
    endedAt: '2022-08',
    achievements: [
      'Перенёс крупный сайт с Tilda на собственную вёрстку с сохранением функциональности.',
      'Реализовывал адаптивные интерфейсы, формы и фильтры, интегрировал их с сервером через AJAX.',
    ],
  },
  {
    company: 'Micros',
    position: 'Веб-разработчик и преподаватель веб-разработки',
    startedAt: '2021-05',
    endedAt: '2022-03',
    achievements: [
      'Составлял учебные материалы и вёл группы по 8–10 человек, проводил занятия и ревью кода учеников.',
      'Реализовал большую часть сайта столичного представительства UzLiDeP, включая клиентскую часть и CMS.',
    ],
  },
];

export const profileData = {
  name: 'Юрий Пак',
  description:
    'Frontend-разработчик с 4+ годами коммерческого опыта. Основной стек — TypeScript, Vue и Nuxt. Разрабатывал интерфейсы для fintech и e-commerce, работал с микрофронтендами, монорепозиториями и интеграциями REST API и WebSocket. В этой визитке демонстрирую работу с NestJS, GraphQL и PostgreSQL.',
  links: [{ label: 'GitHub', url: 'https://github.com/Yucobainus' }],
  skills: [
    'TypeScript',
    'JavaScript',
    'Vue 3',
    'Nuxt',
    'Pinia',
    'REST API',
    'WebSocket',
    'Node.js',
    'Микрофронтенды',
    'Feature-Sliced Design',
    'Монорепозитории',
    'Git',
    'Docker',
  ],
  experience,
  projects: [
    {
      name: 'Hoff',
      url: 'https://hoff.ru/',
      description: 'Интернет-магазин мебели и товаров для дома. Участвовал в проекте как frontend-разработчик ONE TOUCH.',
    },
    {
      name: 'ЖК «Русская Европа»',
      url: 'https://r-eu.ru/project/',
      description: 'Сайт жилого комплекса. Участвовал в проекте как frontend-разработчик ONE TOUCH.',
    },
  ],
};
