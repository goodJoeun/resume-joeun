export type Profile = {
  nameKo: string;
  role?: string;
  email?: string;
  intro: string[];
};

export type TaskItem = {
  text: string;
  subItems?: string[];
  tech?: string[];
};

export type ProjectDetail = {
  name?: string;
  period?: string;
  description?: string | string[];
  link?: { label: string; href: string };
  roles?: string[];
  tasks: TaskItem[];
  tech?: string[];
};

export type CompanyRole = {
  title: string;
  period: string;
};

export type Company = {
  name: string;
  period: string;
  roles: CompanyRole[];
  projects: ProjectDetail[];
};

export type TechStackItem = {
  category: string;
  description: string;
};

export type ActivityItem = {
  name: string;
  period: string;
  description?: string;
  link?: { label: string; href: string };
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  note?: string;
};

// ─── Profile ────────────────────────────────────────────

export const profile: Profile = {
  nameKo: '조은',
  intro: [
    '저는 사용자 경험에 집착하며, "좋은 코드"로 팀 전체의 생산성을 극대화하는 개발자입니다.',
    '제가 생각하는 "좋은 코드"는 우수한 사용자 경험을 전제로, 재사용성이 높고 유지보수에 적은 비용이 들며, 협업을 용이하게 하는 코드입니다.',
    '지금까지의 개발 경험은 단순히 동작하는 코드를 넘어, 협업과 사용자 경험을 중심으로 한 "좋은 코드"의 가치를 체감하게 해주었습니다.',
    '사용자들에게 더욱 신뢰할 수 있는 UX를 제공하고, 팀의 협업 효율성을 높이는 데 기여하고 싶습니다.',
  ],
};

// ─── Experience ─────────────────────────────────────────

export const experience: Company[] = [
  {
    name: '(주) 스패로우',
    period: '2023.03 ~ 재직 중',
    roles: [
      {
        title: '팀원 | 정규직 · Frontend Developer (Junior)',
        period: '2023.03 ~ 재직 중',
      },
    ],
    projects: [
      {
        description: [
          '스패로우 엔터프라이즈는 DevSecOps 구축을 도와주는 웹 기반 Application입니다.',
          '백엔드로부터 제공받는 데이터를 시각화하고 최적의 UX를 제공하고 있습니다.',
          '또한, 디자인 시스템을 관리하고 컴포넌트 UI 테스트/E2E 테스트 자동화 구축도 담당하고 있습니다',
        ],
        roles: [
          '소프트웨어 품질/보안 검증을 위한 제품의 프론트엔드 개발',
          'Storybook을 통한 아토믹 디자인 시스템 개발',
          '컴포넌트 UI 테스트, E2E 테스트 자동화 구축',
        ],
        tasks: [
          {
            text: 'E2E 테스트 구축 및 자동화',
            subItems: [
              'Playwright로 핵심 사용자 시나리오의 <strong>E2E 테스트 자동화 파이프라인 구축</strong>',
              '<strong>총 220개의 테스트코드 작성 및 유지보수</strong>',
              '수동으로 진행하던 전수 테스트 업무를 E2E 테스트로 자동화하여\n소요되는 시간을 평균 <strong>2시간 → 30분으로 75% 단축</strong>시켜 배포 생산성 향상',
              'Cursor를 활용한 MCP 서버를 통해 <strong>테스트 코드 자동 작성 프로세스 수립</strong>',
            ],
            tech: ['TypeScript', 'Next.js', 'Playwright', 'Cursor'],
          },
          {
            text: 'App Router로의 마이그레이션',
            subItems: [
              'Page Router로 구현됐던 제품을 <strong>App Router로 부분 마이그레이션</strong>',
              'Emotion으로 선언된 디자인을 <strong>Tailwind CSS로 마이그레이션</strong>',
              '<strong>초기 로딩 속도(FCP) 60% 개선</strong> 및 TBT 최적화',
              'Cursor Agent를 활용해 <strong>30일로 책정했던 개발 기간을 2주로 단축</strong>',
            ],
            tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'EmotionJS'],
          },
          {
            text: 'SSO/OTP 인증 모듈 개발',
            subItems: [
              '고객사 요청사항을 만족하는 인증 모듈 개발',
              '고객사 내부망에서 인증 모듈로 리다이렉트 요청을 보내면 백엔드 서버로부터 토큰을 발급받고,\n<strong>Http Header 및 토큰으로 유효성 검사 및 제품 로그인</strong>하도록 개발',
              'Passport.js에 각 인증 전략을 선언하고, .env에 작성된 인증 전략에 따라 <strong>해당 전략으로 리다이렉트</strong>되게 개발',
              '백엔드 담당자, 컨설턴트, 고객사 개발자와 협업',
            ],
            tech: ['TypeScript', 'Next.js', 'GraphQL'],
          },
          {
            text: '파일 디렉토리 컴포넌트 개발',
            subItems: [
              '기존 표 기반 분석 시스템을 <strong>트리 구조의 파일 디렉터리 시스템으로 개선</strong>',
              '하위 경로 데이터는 클릭 시 API를 호출하도록 변경하여 <strong>최초 로딩 시간을 1분 → 10초 이내로 단축</strong>',
              '비동기 데이터 로딩 방식 적용 및 Skeleton UI 추가로 <strong>사용자 경험 향상</strong>',
            ],
            tech: ['React.js', 'TypeScript', 'React-Query', 'GraphQL'],
          },
        ],
      },
    ],
  },
  {
    name: '(주) 세마리토끼컴퍼니',
    period: '2022.07 ~ 2022.12',
    roles: [
      {
        title: '인턴 · Frontend Developer',
        period: '2022.07 ~ 2022.12',
      },
    ],
    projects: [
      {
        description: [
          '다양한 디바이스에서 서비스되는 심리테스트/웹게임의 프론트엔드 개발을 담당하였습니다.',
          '반응형 디자인에 능숙하고 웹접근성을 준수하여 개발하였습니다.',
        ],
        tasks: [
          {
            text: '심리테스트/웹게임 개발 및 퍼블리싱',
            subItems: [
              '17개의 프로젝트 완성',
              '평균 13만명의 이용자 기록',
              '다양한 디바이스에서 서비스되는 심리테스트/웹게임 개발 및 퍼블리싱',
            ],
            tech: ['JavaScript', 'CSS', 'HTML', 'React'],
          },
          {
            text: '2022 밈어워즈',

            subItems: [
              '2022년 한 해 동안 유행했던 밈 중 최고의 밈을 선정하는 페이지를 개발하였습니다.',
              'async/await, Promise를 통한 비동기적 Javascript',
              '다양한 커스텀 React Hooks',
              'CSS in JS(styled-component), CSS 작성을 통한 모바일 웹뷰 최적화',
            ],
            tech: ['JavaScript', 'React', 'styled-component', 'CSS'],
          },
        ],
      },
    ],
  },
];

// ─── Tech Stack ─────────────────────────────────────────

export const techStack: TechStackItem[] = [
  {
    category: 'Web',
    description:
      'Search Engine Optimization 경험이 있습니다. 다양한 모바일 브라우저의 웹뷰 최적화 경험이 많습니다.',
  },
  {
    category: 'HTML / CSS',
    description:
      '스타트업에서 6개월 동안 프론트엔드 개발자로 근무하며 복잡한 퍼블리싱과 다양한 디바이스에서의 반응형 디자인을 담당했습니다. CSS-in-JS(styled-component, emotion)를 실무에서 사용한 경험이 많습니다.',
  },
  {
    category: 'JavaScript / TypeScript',
    description:
      'JavaScript와 TypeScript 사용 경험이 많습니다. ES6와 같은 Modern JavaScript에 대해 이해하고 적절한 도구를 사용합니다. DOM 요소 제어와 함수형 프로그래밍, async/await를 통한 비동기 처리, Class 문법 등을 활용하여 ES6 문법에 대한 전문성을 길렀습니다.',
  },
  {
    category: 'React / Next.js',
    description:
      'JSX 문법을 사용한 UI 구성, React Hook을 활용한 기능 구현과 react-router를 적용한 SPA 개발 경험이 있습니다. Storybook을 활용한 컴포넌트 개발, React-Query를 통한 서버 통신과 비동기 로직 처리, SSR 구현을 위한 Next.js 사용 경험이 있습니다.',
  },
];

// ─── Activities ─────────────────────────────────────────

export const activities: ActivityItem[] = [
  {
    name: '2023 오픈소스 컨트리뷰션 아카데미',
    period: '2023.07 ~ 2023.12',
    description: '오픈소스 프로젝트인 Githru 프로젝트에 참여',
    link: {
      label: 'GitHub',
      href: 'https://github.com/githru/githru-boot/issues/51',
    },
  },
];

// ─── Education ──────────────────────────────────────────

export const education: EducationItem[] = [
  {
    school: '건국대학교',
    degree: '스마트ICT융합공학과 (학사)',
    period: '2017.03 ~ 2023.02',
    note: '졸업',
  },
];
