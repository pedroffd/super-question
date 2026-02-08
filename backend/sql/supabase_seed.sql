create table if not exists quizzes (
  id text primary key,
  title text not null,
  description text not null,
  intro text[] not null default '{}',
  time_limit_seconds int not null,
  per_question_seconds int not null
);

create table if not exists jobs (
  id text primary key,
  title text not null,
  level text not null,
  area text not null,
  location text not null,
  status text not null,
  quiz_id text references quizzes (id),
  summary text not null
);

create table if not exists questions (
  id text primary key,
  quiz_id text not null references quizzes (id) on delete cascade,
  prompt text not null,
  options text[] not null,
  correct_index int not null,
  position int not null
);

create index if not exists questions_quiz_id_idx on questions (quiz_id);

insert into quizzes (id, title, description, intro, time_limit_seconds, per_question_seconds)
values
  (
    'fullstack-core',
    'Fullstack Engineer Mock Quiz',
    'Questions based on the interview prep material.',
    array[
      '30 multiple-choice questions (5 options each).',
      'Overall and per-question timers run in parallel.',
      'You can advance manually or wait for time to expire.',
      'At the end, you see your score and percentage.'
    ],
    1800,
    60
  )
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  intro = excluded.intro,
  time_limit_seconds = excluded.time_limit_seconds,
  per_question_seconds = excluded.per_question_seconds;

insert into jobs (id, title, level, area, location, status, quiz_id, summary)
values
  (
    'fullstack-engineer',
    'Fullstack Engineer',
    'Senior / Lead',
    'Backend + Frontend',
    'Remote',
    'active',
    'fullstack-core',
    $$Role focus: Fullstack engineering for scalable SaaS products.
Responsibilities:
- Design, build, and maintain scalable fullstack apps with React, Node.js, NestJS, MongoDB, and PostgreSQL.
- Ensure infrastructure reliability and efficiency.
- Optimize application performance for scale and responsiveness.
- Implement and monitor alerting and monitoring systems.
- Collaborate to identify and remove performance bottlenecks.
- Perform root cause analysis for production incidents and prevent recurrence.
- Build and maintain unit tests for code quality.
- Use Git for version control and collaboration.
Requirements:
- 7+ years of fullstack experience with React and Node.js/NestJS.
- Proficiency in MongoDB and PostgreSQL optimization.
- Strong knowledge of SOLID and CLEAN principles.
- Familiarity with SaaS platforms and delivery.
- Knowledge of unit testing libraries and practices.
- Experience with Git workflows.
- Strong monitoring and incident response experience.
- Advanced English.$$
  ),
  (
    'backend-engineer',
    'Backend Engineer',
    'Senior',
    'Backend',
    'Remote',
    'coming-soon',
    null,
    'Coming soon: distributed systems and performance focus.'
  ),
  (
    'frontend-engineer',
    'Frontend Engineer',
    'Senior',
    'Frontend',
    'Remote',
    'coming-soon',
    null,
    'Coming soon: UI, accessibility, and performance focus.'
  )
on conflict (id) do update set
  title = excluded.title,
  level = excluded.level,
  area = excluded.area,
  location = excluded.location,
  status = excluded.status,
  quiz_id = excluded.quiz_id,
  summary = excluded.summary;

insert into questions (id, quiz_id, prompt, options, correct_index, position)
values
  (
    'q1',
    'fullstack-core',
    'What is the Event Loop in Node.js?',
    array[
      'A multi-thread mechanism for real parallelism.',
      'A mechanism that organizes callback queues on a single thread.',
      'An operating system process manager.',
      'A browser-only feature.',
      'A queue dedicated only to Promises.'
    ],
    1,
    1
  ),
  (
    'q2',
    'fullstack-core',
    'What is the main difference between Promise.then and async/await?',
    array[
      'async/await is slower and should be avoided.',
      'Promise.then does not allow error handling.',
      'async/await is syntactic sugar and improves readability.',
      'Promise.then is mandatory in Node.js.',
      'async/await only works with callbacks.'
    ],
    2,
    2
  ),
  (
    'q3',
    'fullstack-core',
    'What is the impact of CPU-bound code in Node.js?',
    array[
      'It improves performance by using internal cache.',
      'It blocks the event loop and degrades performance.',
      'It automatically creates more threads.',
      'It only affects HTTP requests, not internal tasks.',
      'It has no impact, since Node.js is multi-threaded by default.'
    ],
    1,
    3
  ),
  (
    'q4',
    'fullstack-core',
    'Why use NestJS in larger projects?',
    array[
      'Because it removes the need for tests.',
      'Because it is the lightest framework.',
      'Because it provides an opinionated architecture, DI, and modularization.',
      'Because it does not depend on TypeScript.',
      'Because it does not need controllers.'
    ],
    2,
    4
  ),
  (
    'q5',
    'fullstack-core',
    'Guards, Pipes, and Interceptors are used for:',
    array[
      'Authentication, validation, and logging/metrics.',
      'Rendering HTML, CSS, and JS.',
      'Generating migrations automatically.',
      'Creating Docker containers.',
      'Configuring NoSQL databases.'
    ],
    0,
    5
  ),
  (
    'q6',
    'fullstack-core',
    'When should you use MongoDB?',
    array[
      'When you need complex joins and relational integrity.',
      'When data is semi-structured and write-heavy.',
      'When you need strict ACID.',
      'When the schema is rigid and never changes.',
      'When the focus is financial transactions.'
    ],
    1,
    6
  ),
  (
    'q7',
    'fullstack-core',
    'When should you use PostgreSQL?',
    array[
      'When you need transactions and complex joins.',
      'When data is semi-structured and schemaless.',
      'When you only need eventual reads with no consistency.',
      'When the application does not need indexes.',
      'When scalability is exclusively horizontal.'
    ],
    0,
    7
  ),
  (
    'q8',
    'fullstack-core',
    'What are database indexes used for?',
    array[
      'To remove the need for backups.',
      'To speed up queries by avoiding full table scans.',
      'To limit the number of tables.',
      'To force eventual consistency.',
      'To automatically compress the database.'
    ],
    1,
    8
  ),
  (
    'q9',
    'fullstack-core',
    'How do you investigate a slow query in Postgres?',
    array[
      'By disabling logs.',
      'By using EXPLAIN ANALYZE to evaluate cost and indexes.',
      'By removing all indexes.',
      'By always running with LIMIT 1.',
      'By switching databases without analysis.'
    ],
    1,
    9
  ),
  (
    'q10',
    'fullstack-core',
    'What does eventual consistency mean?',
    array[
      'Data is always consistent on every write.',
      'Data becomes consistent over time.',
      'Data is permanently inconsistent.',
      'Only SQL databases provide this.',
      'Only NoSQL databases provide this.'
    ],
    1,
    10
  ),
  (
    'q11',
    'fullstack-core',
    'What are common system bottlenecks?',
    array[
      'Only CPU.',
      'Only internal network.',
      'Database, external I/O, excessive rendering, and lack of cache.',
      'Only the frontend.',
      'Only Node.js threads.'
    ],
    2,
    11
  ),
  (
    'q12',
    'fullstack-core',
    'What is a correct approach to backend scalability?',
    array[
      'Couple services to local state.',
      'Use stateless services and scale horizontally.',
      'Remove the load balancer.',
      'Always avoid cache.',
      'Centralize everything in a single instance.'
    ],
    1,
    12
  ),
  (
    'q13',
    'fullstack-core',
    'What is the main purpose of cache?',
    array[
      'Increase latency for stability.',
      'Reduce latency and database load.',
      'Replace the need for tests.',
      'Eliminate memory usage.',
      'Force strong consistency.'
    ],
    1,
    13
  ),
  (
    'q14',
    'fullstack-core',
    'What is rate limiting?',
    array[
      'A technique to increase request volume.',
      'A way to limit requests per client.',
      'A payload compression algorithm.',
      'An internal cache strategy.',
      'A vertical scaling mode.'
    ],
    1,
    14
  ),
  (
    'q15',
    'fullstack-core',
    'What is the difference between vertical and horizontal scaling?',
    array[
      'Vertical adds instances; horizontal increases resources.',
      'Vertical increases resources; horizontal adds instances.',
      'Both mean the same thing.',
      'Horizontal only works in NoSQL.',
      'Vertical only works with containers.'
    ],
    1,
    15
  ),
  (
    'q16',
    'fullstack-core',
    'What should you monitor in production?',
    array[
      'Only errors.',
      'Only CPU.',
      'Latency, errors, CPU, memory, and throughput.',
      'Only logs.',
      'Only business metrics.'
    ],
    2,
    16
  ),
  (
    'q17',
    'fullstack-core',
    'Difference between logs and metrics?',
    array[
      'Logs are aggregated values; metrics are events.',
      'Logs are events; metrics are aggregated values.',
      'Both are exactly the same.',
      'Logs replace metrics.',
      'Metrics are always more detailed than logs.'
    ],
    1,
    17
  ),
  (
    'q18',
    'fullstack-core',
    'What is an incident?',
    array[
      'Any lint error.',
      'An event that impacts users or violates an SLO.',
      'A code change without review.',
      'Any warning log.',
      'A local failure without impact.'
    ],
    1,
    18
  ),
  (
    'q19',
    'fullstack-core',
    'What is Root Cause Analysis?',
    array[
      'A list of people to blame.',
      'Identification of technical and organizational cause with actions.',
      'A performance metric.',
      'A type of unit test.',
      'A deployment technique.'
    ],
    1,
    19
  ),
  (
    'q20',
    'fullstack-core',
    'Is human error considered root cause?',
    array[
      'Yes, always.',
      'Yes, when the team is small.',
      'No; systems should prevent human failures.',
      'Only in production.',
      'Only in critical environments.'
    ],
    2,
    20
  ),
  (
    'q21',
    'fullstack-core',
    'What is the difference between unit and integration tests?',
    array[
      'Unit tests communication; integration tests isolated parts.',
      'Unit tests isolated parts; integration tests communication.',
      'They are synonyms.',
      'Integration only tests frontend.',
      'Unit tests only databases.'
    ],
    1,
    21
  ),
  (
    'q22',
    'fullstack-core',
    'Where should testing priority be focused?',
    array[
      'Only trivial code.',
      'Business rules and edge cases.',
      'Only external libraries.',
      'Only end-to-end tests.',
      'Only UI tests.'
    ],
    1,
    22
  ),
  (
    'q23',
    'fullstack-core',
    'Why can mocks be dangerous?',
    array[
      'Because they make tests faster.',
      'Because they hide real integration problems.',
      'Because they remove the need for CI.',
      'Because they increase coverage automatically.',
      'Because they replace external APIs.'
    ],
    1,
    23
  ),
  (
    'q24',
    'fullstack-core',
    'What should NOT be tested?',
    array[
      'Critical business rules.',
      'Edge cases.',
      'Trivial code and external libraries.',
      'Critical integrations.',
      'Core product flows.'
    ],
    2,
    24
  ),
  (
    'q25',
    'fullstack-core',
    'What does the SRP principle say?',
    array[
      'A class can have many reasons to change.',
      'A class should have only one reason to change.',
      'Each method should have multiple responsibilities.',
      'Classes should be static.',
      'SRP is a deployment pattern.'
    ],
    1,
    25
  ),
  (
    'q26',
    'fullstack-core',
    'What is the main benefit of SOLID?',
    array[
      'Lower coupling and higher testability.',
      'Higher coupling and fewer tests.',
      'Remove the need for documentation.',
      'Increase performance only.',
      'Avoid any design patterns.'
    ],
    0,
    26
  ),
  (
    'q27',
    'fullstack-core',
    'How to avoid long if/else chains?',
    array[
      'By duplicating conditions.',
      'By using composition and the Strategy Pattern.',
      'By removing tests.',
      'By ignoring business rules.',
      'By creating huge functions.'
    ],
    1,
    27
  ),
  (
    'q28',
    'fullstack-core',
    'What is the difference between merge and rebase?',
    array[
      'Merge rewrites history; rebase preserves it.',
      'Merge preserves history; rebase rewrites it.',
      'Both always rewrite history.',
      'Rebase is mandatory everywhere.',
      'Merge deletes old commits.'
    ],
    1,
    28
  ),
  (
    'q29',
    'fullstack-core',
    'How to handle merge conflicts?',
    array[
      'Ignore and force push.',
      'Resolve by understanding context and aligning with the team.',
      'Delete conflicting files.',
      'Revert the entire branch automatically.',
      'Avoid merges forever.'
    ],
    1,
    29
  ),
  (
    'q30',
    'fullstack-core',
    'What is a rollback practice?',
    array[
      'Irreversible deploy.',
      'Versioning, reversible deploy, and feature flags.',
      'Remove production logs.',
      'Disable monitoring.',
      'Ignore failures and move on.'
    ],
    1,
    30
  )
on conflict (id) do update set
  quiz_id = excluded.quiz_id,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_index = excluded.correct_index,
  position = excluded.position;
