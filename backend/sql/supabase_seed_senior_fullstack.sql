-- Seed for an additional role and quiz (company-agnostic).
insert into quizzes (id, title, description, intro, time_limit_seconds, per_question_seconds)
values
  (
    'canary-fullstack',
    'Senior Fullstack Engineer Mock Quiz',
    'Questions aligned with a vertical SaaS stack and product culture.',
    array[
      '30 multiple-choice questions (5 options each).',
      'Focus on product thinking, scalability, frontend and backend fundamentals.',
      'Includes data, infrastructure, and operational excellence topics.'
    ],
    2400,
    70
  )
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  intro = excluded.intro,
  time_limit_seconds = excluded.time_limit_seconds,
  per_question_seconds = excluded.per_question_seconds;

insert into questions (id, quiz_id, prompt, options, correct_index, position)
values
  (
    'c1',
    'canary-fullstack',
    'What does it mean to be a Fullstack Engineer in a B2B SaaS product?',
    array[
      'Focus only on frontend features and UI polish.',
      'Work across backend and frontend while understanding impact on customers, scale, and business outcomes.',
      'Write infrastructure scripts without touching application code.',
      'Deliver marketing pages and growth experiments.',
      'Own only database schema design.'
    ],
    1,
    1
  ),
  (
    'c2',
    'canary-fullstack',
    'What is the difference between B2B and B2C SaaS products?',
    array[
      'B2B prioritizes stability, integrations, and security; B2C prioritizes consumer UX and engagement.',
      'B2B focuses only on mobile apps; B2C only on APIs.',
      'B2B always avoids security features; B2C always includes them.',
      'B2B is only for small teams; B2C is for enterprises.',
      'There is no meaningful difference.'
    ],
    0,
    2
  ),
  (
    'c3',
    'canary-fullstack',
    'What is a service-oriented architecture?',
    array[
      'A single monolith that owns all domains.',
      'Independent services responsible for specific domains, communicating via APIs or events.',
      'A UI-only architecture without backend services.',
      'A design pattern for CSS components.',
      'A database sharding strategy.'
    ],
    1,
    3
  ),
  (
    'c4',
    'canary-fullstack',
    'What does operating at scale mean?',
    array[
      'Only serving more users without changing anything.',
      'Ensuring performance, availability, fault tolerance, observability, and security under high traffic.',
      'Moving all workloads to a single server.',
      'Reducing monitoring to improve speed.',
      'Shipping features faster without tests.'
    ],
    1,
    4
  ),
  (
    'c5',
    'canary-fullstack',
    'Why is observability critical in SaaS platforms?',
    array[
      'It reduces the need for authentication.',
      'It helps detect issues early, understand behavior, and maintain SLAs.',
      'It replaces automated tests.',
      'It prevents any outages from happening.',
      'It only matters for frontend performance.'
    ],
    1,
    5
  ),
  (
    'c6',
    'canary-fullstack',
    'What is a land-and-expand strategy?',
    array[
      'Sell a full suite upfront with heavy implementation.',
      'Sell an initial product with low friction and expand usage with additional modules.',
      'Focus exclusively on enterprise renewals.',
      'Delay product delivery until all features are complete.',
      'Reduce pricing to zero for expansion.'
    ],
    1,
    6
  ),
  (
    'c7',
    'canary-fullstack',
    'What responsibilities does a Senior Engineer have beyond coding?',
    array[
      'Only writing tests.',
      'Mentoring, code reviews, architectural decisions, and product collaboration.',
      'Avoiding product discussions.',
      'Focusing exclusively on tickets.',
      'Delegating all technical work to others.'
    ],
    1,
    7
  ),
  (
    'c8',
    'canary-fullstack',
    'What is self-documenting code?',
    array[
      'Code with as many comments as possible.',
      'Code that is readable and expressive through clear naming and structure.',
      'Code that avoids functions.',
      'Code written only in one language.',
      'Code that compiles without tests.'
    ],
    1,
    8
  ),
  (
    'c9',
    'canary-fullstack',
    'Why is close collaboration with Product Managers important?',
    array[
      'It helps avoid writing any documentation.',
      'It aligns technical solutions with real customer problems and business priorities.',
      'It removes the need for engineering planning.',
      'It guarantees there will be no bugs.',
      'It shifts all technical decisions to PMs.'
    ],
    1,
    9
  ),
  (
    'c10',
    'canary-fullstack',
    'What defines a well-designed API?',
    array[
      'Inconsistent naming across endpoints.',
      'Consistency, clarity, proper HTTP semantics, validation, security, and documentation.',
      'Only returning XML responses.',
      'No authentication to simplify access.',
      'Hidden error responses.'
    ],
    1,
    10
  ),
  (
    'c11',
    'canary-fullstack',
    'Why are React and Vue popular frontend frameworks?',
    array[
      'They only work with server-side rendering.',
      'They provide component-based architectures, reactivity, and scalable UI development.',
      'They remove the need for CSS.',
      'They are database-first frameworks.',
      'They avoid state management entirely.'
    ],
    1,
    11
  ),
  (
    'c12',
    'canary-fullstack',
    'Key architectural difference between React and Vue?',
    array[
      'React is more flexible and JavaScript-driven; Vue is more opinionated with built-in reactivity.',
      'React uses templates; Vue uses only JavaScript.',
      'Vue does not support components.',
      'React requires a backend framework.',
      'Vue only works for static sites.'
    ],
    0,
    12
  ),
  (
    'c13',
    'canary-fullstack',
    'What is frontend state?',
    array[
      'Only data stored in localStorage.',
      'Data that affects UI rendering and can change over time.',
      'Only server-side database rows.',
      'Only CSS variables.',
      'A browser cookie.'
    ],
    1,
    13
  ),
  (
    'c14',
    'canary-fullstack',
    'When should global state be used?',
    array[
      'Only when a single component needs it.',
      'When multiple components need shared access to the same data.',
      'Never; global state is always bad.',
      'Only for styling variables.',
      'Only for routing.'
    ],
    1,
    14
  ),
  (
    'c15',
    'canary-fullstack',
    'What are React hooks?',
    array[
      'Classes used to define components.',
      'Functions that allow functional components to use state and lifecycle features.',
      'A CSS framework.',
      'A database query helper.',
      'A testing utility only.'
    ],
    1,
    15
  ),
  (
    'c16',
    'canary-fullstack',
    'What is reactivity in Vue?',
    array[
      'Manual DOM updates for every change.',
      'Automatic UI updates when underlying data changes.',
      'A network protocol for WebSockets.',
      'A CSS preprocessor feature.',
      'A form validation library.'
    ],
    1,
    16
  ),
  (
    'c17',
    'canary-fullstack',
    'How do you handle complex forms in frontend applications?',
    array[
      'By avoiding validation.',
      'With structured state management, validation, and clear UX feedback.',
      'By pushing all logic to the database.',
      'By using only uncontrolled inputs.',
      'By disabling user input.'
    ],
    1,
    17
  ),
  (
    'c18',
    'canary-fullstack',
    'What are debounce and throttle used for?',
    array[
      'To force immediate execution of functions.',
      'To limit how often a function executes during frequent events.',
      'To store data in local storage.',
      'To render UI without state.',
      'To secure API endpoints.'
    ],
    1,
    18
  ),
  (
    'c19',
    'canary-fullstack',
    'How can frontend performance be optimized?',
    array[
      'By rendering everything at once.',
      'Through lazy loading, memoization, minimizing re-renders, and efficient API usage.',
      'By disabling caching.',
      'By removing state management.',
      'By avoiding all animations.'
    ],
    1,
    19
  ),
  (
    'c20',
    'canary-fullstack',
    'Why is accessibility important?',
    array[
      'It is only required for government sites.',
      'It ensures usability for all users and improves UX quality.',
      'It replaces the need for performance testing.',
      'It only affects SEO.',
      'It applies only to mobile.'
    ],
    1,
    20
  ),
  (
    'c21',
    'canary-fullstack',
    'Why is Python popular for SaaS backend development?',
    array[
      'Because it lacks libraries.',
      'Because of readability, productivity, and ecosystem support.',
      'Because it is the only compiled language.',
      'Because it avoids testing.',
      'Because it only runs in the browser.'
    ],
    1,
    21
  ),
  (
    'c22',
    'canary-fullstack',
    'What is Django?',
    array[
      'A frontend framework for mobile apps.',
      'A full-featured Python web framework with ORM, auth, admin, and security tools.',
      'A lightweight JavaScript library.',
      'A database engine.',
      'A message queue.'
    ],
    1,
    22
  ),
  (
    'c23',
    'canary-fullstack',
    'Django vs Flask?',
    array[
      'Django is opinionated and comprehensive; Flask is lightweight and flexible.',
      'Django is a database; Flask is a UI library.',
      'Flask is more opinionated than Django.',
      'They are identical frameworks.',
      'Django only supports NoSQL.'
    ],
    0,
    23
  ),
  (
    'c24',
    'canary-fullstack',
    'What is an ORM?',
    array[
      'A monitoring tool.',
      'A tool that maps database tables to objects to avoid raw SQL.',
      'A frontend routing library.',
      'A JavaScript runtime.',
      'An API gateway.'
    ],
    1,
    24
  ),
  (
    'c25',
    'canary-fullstack',
    'How is API authentication typically handled?',
    array[
      'Using tokens, OAuth, permission checks, and secure validation.',
      'By disabling security headers.',
      'By trusting all requests.',
      'By relying only on query params.',
      'By using plaintext passwords in URLs.'
    ],
    0,
    25
  ),
  (
    'c26',
    'canary-fullstack',
    'What are database migrations?',
    array[
      'One-time database backups.',
      'Versioned changes to database schemas over time.',
      'A way to delete old data.',
      'A frontend build step.',
      'A log aggregation tool.'
    ],
    1,
    26
  ),
  (
    'c27',
    'canary-fullstack',
    'How do you secure APIs?',
    array[
      'By validating inputs, enforcing auth, and protecting against common attacks.',
      'By storing tokens in localStorage only.',
      'By avoiding HTTPS.',
      'By removing rate limits.',
      'By skipping authorization checks.'
    ],
    0,
    27
  ),
  (
    'c28',
    'canary-fullstack',
    'What is idempotency?',
    array[
      'Ensuring repeated identical requests produce the same result.',
      'Allowing the same request to create duplicates.',
      'A database indexing strategy.',
      'A frontend caching rule.',
      'A type of encryption.'
    ],
    0,
    28
  ),
  (
    'c29',
    'canary-fullstack',
    'How should third-party integrations be handled?',
    array[
      'By isolating them and handling failures gracefully with monitoring.',
      'By tightly coupling them to core logic.',
      'By ignoring their downtime.',
      'By disabling retries.',
      'By embedding secrets in client apps.'
    ],
    0,
    29
  ),
  (
    'c30',
    'canary-fullstack',
    'What is horizontal scalability?',
    array[
      'Scaling by adding more service instances.',
      'Scaling by increasing CPU on a single server.',
      'Reducing the number of users.',
      'Moving to a single database.',
      'Disabling caching.'
    ],
    0,
    30
  )
on conflict (id) do update set
  quiz_id = excluded.quiz_id,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_index = excluded.correct_index,
  position = excluded.position;

insert into jobs (id, title, level, area, location, status, quiz_id, summary)
values
  (
    'sr-fullstack-engineer',
    'Senior Fullstack Engineer',
    'Senior / Lead',
    'Backend + Frontend',
    'Remote',
    'active',
    'canary-fullstack',
    $$Role focus: senior IC building and scaling a vertical SaaS platform across the full customer journey.
Scope:
- Full guest lifecycle workflows (post-booking to departure) with a land-and-expand product strategy.
- Cross-platform integrations with external systems (PMS, payments, loyalty, mobile keys).
Responsibilities:
- Design, build, and maintain scalable fullstack apps with Vue, TypeScript, Python, and PostgreSQL/MongoDB.
- Ensure infrastructure reliability and efficiency with cloud and container platforms.
- Optimize application performance for scale and responsiveness.
- Implement and monitor alerting and incident response.
- Partner with PMs to shape roadmap and customer experience.
- Conduct root cause analysis and drive preventative actions.
- Write clean, self-documenting code and maintain strong test coverage.
- Contribute in code reviews and mentor engineers.
Requirements:
- 7+ years of fullstack experience; strong backend focus with solid frontend fluency.
- Advanced Python expertise (Django/Flask or similar) and TypeScript experience.
- Experience with Docker, Kubernetes, Terraform, and cloud providers (AWS preferred).
- Strong SQL skills and database design experience.
- Excellent communication and ownership mindset.
- Advanced English.$$
  )
on conflict (id) do update set
  title = excluded.title,
  level = excluded.level,
  area = excluded.area,
  location = excluded.location,
  status = excluded.status,
  quiz_id = excluded.quiz_id,
  summary = excluded.summary;
