export type JobCard = {
  id: string
  title: string
  level: string
  area: string
  location: string
  status: 'active' | 'coming-soon'
  quizId?: string
  summary: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

export type Quiz = {
  id: string
  title: string
  description: string
  intro: string[]
  timeLimitSeconds: number
  perQuestionSeconds: number
  questions: QuizQuestion[]
}

export const jobs: JobCard[] = [
  {
    id: 'fullstack-engineer',
    title: 'Fullstack Engineer',
    level: 'Senior / Lead',
    area: 'Backend + Frontend',
    location: 'Remote',
    status: 'active',
    quizId: 'fullstack-core',
    summary:
      'Role focus: Fullstack engineering for scalable SaaS products.\n' +
      'Responsibilities:\n' +
      '- Design, build, and maintain scalable fullstack apps with React, Node.js, NestJS, MongoDB, and PostgreSQL.\n' +
      '- Ensure infrastructure reliability and efficiency.\n' +
      '- Optimize application performance for scale and responsiveness.\n' +
      '- Implement and monitor alerting and monitoring systems.\n' +
      '- Collaborate to identify and remove performance bottlenecks.\n' +
      '- Perform root cause analysis for production incidents and prevent recurrence.\n' +
      '- Build and maintain unit tests for code quality.\n' +
      '- Use Git for version control and collaboration.\n' +
      'Requirements:\n' +
      '- 7+ years of fullstack experience with React and Node.js/NestJS.\n' +
      '- Proficiency in MongoDB and PostgreSQL optimization.\n' +
      '- Strong knowledge of SOLID and CLEAN principles.\n' +
      '- Familiarity with SaaS platforms and delivery.\n' +
      '- Knowledge of unit testing libraries and practices.\n' +
      '- Experience with Git workflows.\n' +
      '- Strong monitoring and incident response experience.\n' +
      '- Advanced English.',
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    level: 'Senior',
    area: 'Backend',
    location: 'Remote',
    status: 'coming-soon',
    summary: 'Coming soon: distributed systems and performance focus.',
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer',
    level: 'Senior',
    area: 'Frontend',
    location: 'Remote',
    status: 'coming-soon',
    summary: 'Coming soon: UI, accessibility, and performance focus.',
  },
  {
    id: 'sr-fullstack-engineer',
    title: 'Senior Fullstack Engineer',
    level: 'Senior / Lead',
    area: 'Backend + Frontend',
    location: 'Remote',
    status: 'active',
    quizId: 'canary-fullstack',
    summary:
      'Role focus: senior IC building and scaling a vertical SaaS platform across the full customer journey.\n' +
      'Scope:\n' +
      '- Full guest lifecycle workflows (post-booking to departure) with a land-and-expand product strategy.\n' +
      '- Cross-platform integrations with external systems (PMS, payments, loyalty, mobile keys).\n' +
      'Responsibilities:\n' +
      '- Design, build, and maintain scalable fullstack apps with Vue, TypeScript, Python, and PostgreSQL/MongoDB.\n' +
      '- Ensure infrastructure reliability and efficiency with cloud and container platforms.\n' +
      '- Optimize application performance for scale and responsiveness.\n' +
      '- Implement and monitor alerting and incident response.\n' +
      '- Partner with PMs to shape roadmap and customer experience.\n' +
      '- Conduct root cause analysis and drive preventative actions.\n' +
      '- Write clean, self-documenting code and maintain strong test coverage.\n' +
      '- Contribute in code reviews and mentor engineers.\n' +
      'Requirements:\n' +
      '- 7+ years of fullstack experience; strong backend focus with solid frontend fluency.\n' +
      '- Advanced Python expertise (Django/Flask or similar) and TypeScript experience.\n' +
      '- Experience with Docker, Kubernetes, Terraform, and cloud providers (AWS preferred).\n' +
      '- Strong SQL skills and database design experience.\n' +
      '- Excellent communication and ownership mindset.\n' +
      '- Advanced English.',
  },
]

export const quizzes: Quiz[] = [
  {
    id: 'fullstack-core',
    title: 'Fullstack Engineer Mock Quiz',
    description: 'Questions based on the interview prep material.',
    intro: [
      '30 multiple-choice questions (5 options each).',
      'Overall and per-question timers run in parallel.',
      'You can advance manually or wait for time to expire.',
      'At the end, you see your score and percentage.',
    ],
    timeLimitSeconds: 1800,
    perQuestionSeconds: 60,
    questions: [
      {
        id: 'q1',
        prompt: 'What is the Event Loop in Node.js?',
        options: [
          'A multi-thread mechanism for real parallelism.',
          'A mechanism that organizes callback queues on a single thread.',
          'An operating system process manager.',
          'A browser-only feature.',
          'A queue dedicated only to Promises.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt:
          'What is the main difference between Promise.then and async/await?',
        options: [
          'async/await is slower and should be avoided.',
          'Promise.then does not allow error handling.',
          'async/await is syntactic sugar and improves readability.',
          'Promise.then is mandatory in Node.js.',
          'async/await only works with callbacks.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'What is the impact of CPU-bound code in Node.js?',
        options: [
          'It improves performance by using internal cache.',
          'It blocks the event loop and degrades performance.',
          'It automatically creates more threads.',
          'It only affects HTTP requests, not internal tasks.',
          'It has no impact, since Node.js is multi-threaded by default.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q4',
        prompt: 'Why use NestJS in larger projects?',
        options: [
          'Because it removes the need for tests.',
          'Because it is the lightest framework.',
          'Because it provides an opinionated architecture, DI, and modularization.',
          'Because it does not depend on TypeScript.',
          'Because it does not need controllers.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q5',
        prompt: 'Guards, Pipes, and Interceptors are used for:',
        options: [
          'Authentication, validation, and logging/metrics.',
          'Rendering HTML, CSS, and JS.',
          'Generating migrations automatically.',
          'Creating Docker containers.',
          'Configuring NoSQL databases.',
        ],
        correctIndex: 0,
      },
      {
        id: 'q6',
        prompt: 'When should you use MongoDB?',
        options: [
          'When you need complex joins and relational integrity.',
          'When data is semi-structured and write-heavy.',
          'When you need strict ACID.',
          'When the schema is rigid and never changes.',
          'When the focus is financial transactions.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q7',
        prompt: 'When should you use PostgreSQL?',
        options: [
          'When you need transactions and complex joins.',
          'When data is semi-structured and schemaless.',
          'When you only need eventual reads with no consistency.',
          'When the application does not need indexes.',
          'When scalability is exclusively horizontal.',
        ],
        correctIndex: 0,
      },
      {
        id: 'q8',
        prompt: 'What are database indexes used for?',
        options: [
          'To remove the need for backups.',
          'To speed up queries by avoiding full table scans.',
          'To limit the number of tables.',
          'To force eventual consistency.',
          'To automatically compress the database.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q9',
        prompt: 'How do you investigate a slow query in Postgres?',
        options: [
          'By disabling logs.',
          'By using EXPLAIN ANALYZE to evaluate cost and indexes.',
          'By removing all indexes.',
          'By always running with LIMIT 1.',
          'By switching databases without analysis.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q10',
        prompt: 'What does eventual consistency mean?',
        options: [
          'Data is always consistent on every write.',
          'Data becomes consistent over time.',
          'Data is permanently inconsistent.',
          'Only SQL databases provide this.',
          'Only NoSQL databases provide this.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q11',
        prompt: 'What are common system bottlenecks?',
        options: [
          'Only CPU.',
          'Only internal network.',
          'Database, external I/O, excessive rendering, and lack of cache.',
          'Only the frontend.',
          'Only Node.js threads.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q12',
        prompt: 'What is a correct approach to backend scalability?',
        options: [
          'Couple services to local state.',
          'Use stateless services and scale horizontally.',
          'Remove the load balancer.',
          'Always avoid cache.',
          'Centralize everything in a single instance.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q13',
        prompt: 'What is the main purpose of cache?',
        options: [
          'Increase latency for stability.',
          'Reduce latency and database load.',
          'Replace the need for tests.',
          'Eliminate memory usage.',
          'Force strong consistency.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q14',
        prompt: 'What is rate limiting?',
        options: [
          'A technique to increase request volume.',
          'A way to limit requests per client.',
          'A payload compression algorithm.',
          'An internal cache strategy.',
          'A vertical scaling mode.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q15',
        prompt:
          'What is the difference between vertical and horizontal scaling?',
        options: [
          'Vertical adds instances; horizontal increases resources.',
          'Vertical increases resources; horizontal adds instances.',
          'Both mean the same thing.',
          'Horizontal only works in NoSQL.',
          'Vertical only works with containers.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q16',
        prompt: 'What should you monitor in production?',
        options: [
          'Only errors.',
          'Only CPU.',
          'Latency, errors, CPU, memory, and throughput.',
          'Only logs.',
          'Only business metrics.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q17',
        prompt: 'Difference between logs and metrics?',
        options: [
          'Logs are aggregated values; metrics are events.',
          'Logs are events; metrics are aggregated values.',
          'Both are exactly the same.',
          'Logs replace metrics.',
          'Metrics are always more detailed than logs.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q18',
        prompt: 'What is an incident?',
        options: [
          'Any lint error.',
          'An event that impacts users or violates an SLO.',
          'A code change without review.',
          'Any warning log.',
          'A local failure without impact.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q19',
        prompt: 'What is Root Cause Analysis?',
        options: [
          'A list of people to blame.',
          'Identification of technical and organizational cause with actions.',
          'A performance metric.',
          'A type of unit test.',
          'A deployment technique.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q20',
        prompt: 'Is human error considered root cause?',
        options: [
          'Yes, always.',
          'Yes, when the team is small.',
          'No; systems should prevent human failures.',
          'Only in production.',
          'Only in critical environments.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q21',
        prompt: 'What is the difference between unit and integration tests?',
        options: [
          'Unit tests communication; integration tests isolated parts.',
          'Unit tests isolated parts; integration tests communication.',
          'They are synonyms.',
          'Integration only tests frontend.',
          'Unit tests only databases.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q22',
        prompt: 'Where should testing priority be focused?',
        options: [
          'Only trivial code.',
          'Business rules and edge cases.',
          'Only external libraries.',
          'Only end-to-end tests.',
          'Only UI tests.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q23',
        prompt: 'Why can mocks be dangerous?',
        options: [
          'Because they make tests faster.',
          'Because they hide real integration problems.',
          'Because they remove the need for CI.',
          'Because they increase coverage automatically.',
          'Because they replace external APIs.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q24',
        prompt: 'What should NOT be tested?',
        options: [
          'Critical business rules.',
          'Edge cases.',
          'Trivial code and external libraries.',
          'Critical integrations.',
          'Core product flows.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q25',
        prompt: 'What does the SRP principle say?',
        options: [
          'A class can have many reasons to change.',
          'A class should have only one reason to change.',
          'Each method should have multiple responsibilities.',
          'Classes should be static.',
          'SRP is a deployment pattern.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q26',
        prompt: 'What is the main benefit of SOLID?',
        options: [
          'Lower coupling and higher testability.',
          'Higher coupling and fewer tests.',
          'Remove the need for documentation.',
          'Increase performance only.',
          'Avoid any design patterns.',
        ],
        correctIndex: 0,
      },
      {
        id: 'q27',
        prompt: 'How to avoid long if/else chains?',
        options: [
          'By duplicating conditions.',
          'By using composition and the Strategy Pattern.',
          'By removing tests.',
          'By ignoring business rules.',
          'By creating huge functions.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q28',
        prompt: 'What is the difference between merge and rebase?',
        options: [
          'Merge rewrites history; rebase preserves it.',
          'Merge preserves history; rebase rewrites it.',
          'Both always rewrite history.',
          'Rebase is mandatory everywhere.',
          'Merge deletes old commits.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q29',
        prompt: 'How to handle merge conflicts?',
        options: [
          'Ignore and force push.',
          'Resolve by understanding context and aligning with the team.',
          'Delete conflicting files.',
          'Revert the entire branch automatically.',
          'Avoid merges forever.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q30',
        prompt: 'What is a rollback practice?',
        options: [
          'Irreversible deploy.',
          'Versioning, reversible deploy, and feature flags.',
          'Remove production logs.',
          'Disable monitoring.',
          'Ignore failures and move on.',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'canary-fullstack',
    title: 'Senior Fullstack Engineer Mock Quiz',
    description: 'Questions aligned with a vertical SaaS stack and culture.',
    intro: [
      '30 multiple-choice questions (5 options each).',
      'Focus on product thinking, scalability, and core fullstack concepts.',
      'Includes data, infrastructure, and operational excellence topics.',
    ],
    timeLimitSeconds: 2400,
    perQuestionSeconds: 70,
    questions: [
      {
        id: 'c1',
        prompt:
          'What does it mean to be a Fullstack Engineer in a B2B SaaS product?',
        options: [
          'Focus only on frontend features and UI polish.',
          'Work across backend and frontend while understanding impact on customers, scale, and business outcomes.',
          'Write infrastructure scripts without touching application code.',
          'Deliver marketing pages and growth experiments.',
          'Own only database schema design.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c2',
        prompt: 'What is the difference between B2B and B2C SaaS products?',
        options: [
          'B2B prioritizes stability, integrations, and security; B2C prioritizes consumer UX and engagement.',
          'B2B focuses only on mobile apps; B2C only on APIs.',
          'B2B always avoids security features; B2C always includes them.',
          'B2B is only for small teams; B2C is for enterprises.',
          'There is no meaningful difference.',
        ],
        correctIndex: 0,
      },
      {
        id: 'c3',
        prompt: 'What is a service-oriented architecture?',
        options: [
          'A single monolith that owns all domains.',
          'Independent services responsible for specific domains, communicating via APIs or events.',
          'A UI-only architecture without backend services.',
          'A design pattern for CSS components.',
          'A database sharding strategy.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c4',
        prompt: 'What does operating at scale mean?',
        options: [
          'Only serving more users without changing anything.',
          'Ensuring performance, availability, fault tolerance, observability, and security under high traffic.',
          'Moving all workloads to a single server.',
          'Reducing monitoring to improve speed.',
          'Shipping features faster without tests.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c5',
        prompt: 'Why is observability critical in SaaS platforms?',
        options: [
          'It reduces the need for authentication.',
          'It helps detect issues early, understand behavior, and maintain SLAs.',
          'It replaces automated tests.',
          'It prevents any outages from happening.',
          'It only matters for frontend performance.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c6',
        prompt: 'What is a land-and-expand strategy?',
        options: [
          'Sell a full suite upfront with heavy implementation.',
          'Sell an initial product with low friction and expand usage with additional modules.',
          'Focus exclusively on enterprise renewals.',
          'Delay product delivery until all features are complete.',
          'Reduce pricing to zero for expansion.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c7',
        prompt:
          'What responsibilities does a Senior Engineer have beyond coding?',
        options: [
          'Only writing tests.',
          'Mentoring, code reviews, architectural decisions, and product collaboration.',
          'Avoiding product discussions.',
          'Focusing exclusively on tickets.',
          'Delegating all technical work to others.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c8',
        prompt: 'What is self-documenting code?',
        options: [
          'Code with as many comments as possible.',
          'Code that is readable and expressive through clear naming and structure.',
          'Code that avoids functions.',
          'Code written only in one language.',
          'Code that compiles without tests.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c9',
        prompt: 'Why is close collaboration with Product Managers important?',
        options: [
          'It helps avoid writing any documentation.',
          'It aligns technical solutions with real customer problems and business priorities.',
          'It removes the need for engineering planning.',
          'It guarantees there will be no bugs.',
          'It shifts all technical decisions to PMs.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c10',
        prompt: 'What defines a well-designed API?',
        options: [
          'Inconsistent naming across endpoints.',
          'Consistency, clarity, proper HTTP semantics, validation, security, and documentation.',
          'Only returning XML responses.',
          'No authentication to simplify access.',
          'Hidden error responses.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c11',
        prompt: 'Why are React and Vue popular frontend frameworks?',
        options: [
          'They only work with server-side rendering.',
          'They provide component-based architectures, reactivity, and scalable UI development.',
          'They remove the need for CSS.',
          'They are database-first frameworks.',
          'They avoid state management entirely.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c12',
        prompt: 'Key architectural difference between React and Vue?',
        options: [
          'React is more flexible and JavaScript-driven; Vue is more opinionated with built-in reactivity.',
          'React uses templates; Vue uses only JavaScript.',
          'Vue does not support components.',
          'React requires a backend framework.',
          'Vue only works for static sites.',
        ],
        correctIndex: 0,
      },
      {
        id: 'c13',
        prompt: 'What is frontend state?',
        options: [
          'Only data stored in localStorage.',
          'Data that affects UI rendering and can change over time.',
          'Only server-side database rows.',
          'Only CSS variables.',
          'A browser cookie.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c14',
        prompt: 'When should global state be used?',
        options: [
          'Only when a single component needs it.',
          'When multiple components need shared access to the same data.',
          'Never; global state is always bad.',
          'Only for styling variables.',
          'Only for routing.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c15',
        prompt: 'What are React hooks?',
        options: [
          'Classes used to define components.',
          'Functions that allow functional components to use state and lifecycle features.',
          'A CSS framework.',
          'A database query helper.',
          'A testing utility only.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c16',
        prompt: 'What is reactivity in Vue?',
        options: [
          'Manual DOM updates for every change.',
          'Automatic UI updates when underlying data changes.',
          'A network protocol for WebSockets.',
          'A CSS preprocessor feature.',
          'A form validation library.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c17',
        prompt: 'How do you handle complex forms in frontend applications?',
        options: [
          'By avoiding validation.',
          'With structured state management, validation, and clear UX feedback.',
          'By pushing all logic to the database.',
          'By using only uncontrolled inputs.',
          'By disabling user input.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c18',
        prompt: 'What are debounce and throttle used for?',
        options: [
          'To force immediate execution of functions.',
          'To limit how often a function executes during frequent events.',
          'To store data in local storage.',
          'To render UI without state.',
          'To secure API endpoints.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c19',
        prompt: 'How can frontend performance be optimized?',
        options: [
          'By rendering everything at once.',
          'Through lazy loading, memoization, minimizing re-renders, and efficient API usage.',
          'By disabling caching.',
          'By removing state management.',
          'By avoiding all animations.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c20',
        prompt: 'Why is accessibility important?',
        options: [
          'It is only required for government sites.',
          'It ensures usability for all users and improves UX quality.',
          'It replaces the need for performance testing.',
          'It only affects SEO.',
          'It applies only to mobile.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c21',
        prompt: 'Why is Python popular for SaaS backend development?',
        options: [
          'Because it lacks libraries.',
          'Because of readability, productivity, and ecosystem support.',
          'Because it is the only compiled language.',
          'Because it avoids testing.',
          'Because it only runs in the browser.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c22',
        prompt: 'What is Django?',
        options: [
          'A frontend framework for mobile apps.',
          'A full-featured Python web framework with ORM, auth, admin, and security tools.',
          'A lightweight JavaScript library.',
          'A database engine.',
          'A message queue.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c23',
        prompt: 'Django vs Flask?',
        options: [
          'Django is opinionated and comprehensive; Flask is lightweight and flexible.',
          'Django is a database; Flask is a UI library.',
          'Flask is more opinionated than Django.',
          'They are identical frameworks.',
          'Django only supports NoSQL.',
        ],
        correctIndex: 0,
      },
      {
        id: 'c24',
        prompt: 'What is an ORM?',
        options: [
          'A monitoring tool.',
          'A tool that maps database tables to objects to avoid raw SQL.',
          'A frontend routing library.',
          'A JavaScript runtime.',
          'An API gateway.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c25',
        prompt: 'How is API authentication typically handled?',
        options: [
          'Using tokens, OAuth, permission checks, and secure validation.',
          'By disabling security headers.',
          'By trusting all requests.',
          'By relying only on query params.',
          'By using plaintext passwords in URLs.',
        ],
        correctIndex: 0,
      },
      {
        id: 'c26',
        prompt: 'What are database migrations?',
        options: [
          'One-time database backups.',
          'Versioned changes to database schemas over time.',
          'A way to delete old data.',
          'A frontend build step.',
          'A log aggregation tool.',
        ],
        correctIndex: 1,
      },
      {
        id: 'c27',
        prompt: 'How do you secure APIs?',
        options: [
          'By validating inputs, enforcing auth, and protecting against common attacks.',
          'By storing tokens in localStorage only.',
          'By avoiding HTTPS.',
          'By removing rate limits.',
          'By skipping authorization checks.',
        ],
        correctIndex: 0,
      },
      {
        id: 'c28',
        prompt: 'What is idempotency?',
        options: [
          'Ensuring repeated identical requests produce the same result.',
          'Allowing the same request to create duplicates.',
          'A database indexing strategy.',
          'A frontend caching rule.',
          'A type of encryption.',
        ],
        correctIndex: 0,
      },
      {
        id: 'c29',
        prompt: 'How should third-party integrations be handled?',
        options: [
          'By isolating them and handling failures gracefully with monitoring.',
          'By tightly coupling them to core logic.',
          'By ignoring their downtime.',
          'By disabling retries.',
          'By embedding secrets in client apps.',
        ],
        correctIndex: 0,
      },
      {
        id: 'c30',
        prompt: 'What is horizontal scalability?',
        options: [
          'Scaling by adding more service instances.',
          'Scaling by increasing CPU on a single server.',
          'Reducing the number of users.',
          'Moving to a single database.',
          'Disabling caching.',
        ],
        correctIndex: 0,
      },
    ],
  },
]
