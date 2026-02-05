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
    summary: 'Complete mock test covering core backend and frontend concepts.',
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
]
