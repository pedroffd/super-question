import fs from 'fs';
import path from 'path';

// The target job has been updated to: Senior Fullstack Frontend Engineer
// Focus: React, Redux, Node.js, Express, Jest, React Testing Library, GraphQL.

console.log("Generating SQL seed script for the paypal frontend-heavy interview...");

const seedHeader = `
-- Seed for PayPal / Taller Interview Prep (Updated for Frontend Engineer role)
insert into quizzes (id, title, description, intro, time_limit_seconds, per_question_seconds)
values
  (
    'paypal-frontend-heavy',
    'PayPal Sr. Fullstack Frontend Engineer Quiz',
    'Interview prep focusing on React, Redux, Testing, and Node.js',
    array[
      'Topics: Expert JS, React Architecture, Redux, Node/Express, Testing (Jest/RTL).',
      'Theoretical questions have 5 options.',
      'Includes practical code components and debugging scenarios.'
    ],
    3600,
    120
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
    'paypal-frontend-heavy',
    'Senior Fullstack Frontend Engineer',
    'Senior',
    'Fullstack (React, Node, Redux)',
    'Remote',
    'active',
    'paypal-frontend-heavy',
    $$Role focus: Scalable web apps, global monetary transactions, UI/UX performance optimization.
Tech Stack: React, Redux, Node.js/Express, Jest, RTL, GraphQL.$$
  )
on conflict (id) do update set
  title = excluded.title,
  level = excluded.level,
  area = excluded.area,
  location = excluded.location,
  status = excluded.status,
  quiz_id = excluded.quiz_id,
  summary = excluded.summary;

-- Ensure questions table has the new columns
ALTER TABLE questions ADD COLUMN IF NOT EXISTS type text DEFAULT 'theory';
ALTER TABLE questions ADD COLUMN IF NOT EXISTS explanation text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS code_snippet text;

insert into questions (id, quiz_id, prompt, options, correct_index, position, type, explanation, code_snippet)
values
`;

const tailoredQuestions = [
  // React & Redux
  {
    id: 'pf1',
    prompt: 'In a large-scale React application using Redux, what is the primary benefit of using "Selectors" (e.g., with Reselect)?',
    options: [
      'They allow you to bypass the Redux store and access state directly from components.',
      'They convert Redux actions into React Hooks automatically.',
      'They provide memoization to prevent unnecessary re-computations and re-renders when only unrelated parts of the state change.',
      'They are used to handle asynchronous API calls inside the reducer.',
      'They replace the need for the "connect" HOC or "useSelector" hook.'
    ],
    correct_index: 2,
    type: 'theory',
    explanation: 'Selectors (especially memoized ones using libraries like Reselect) help performance by ensuring that components only re-render when the specific slice of state they need actually changes. They also encapsulate state structure, making it easier to refactor state without changing every component.',
    code_snippet: null
  },
  {
    id: 'pf2',
    prompt: 'Implement a custom hook "usePrevious" that tracks the previous value of a prop or state variable.',
    options: [],
    correct_index: -1,
    type: 'code',
    explanation: 'Testing your understanding of useRef and useEffect. useRef is perfect here because it persists values across renders without triggering a re-render when the value changes.',
    code_snippet: `
import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]); // Update ref only after render
  
  return ref.current; // Returns value from previous render
}
`
  },
  // Testing (Jest/RTL)
  {
    id: 'pf3',
    prompt: 'When testing a component with React Testing Library, why is "findBy*" preferred over "getBy*" for elements that appear after an API call?',
    options: [
      'findBy* is faster because it uses a direct DOM query.',
      'findBy* returns a Promise and automatically waits (up to a timeout) for the element to appear in the DOM.',
      'getBy* is deprecated in the latest version of RTL.',
      'findBy* only works with class components.',
      'There is no difference; they are aliases for each other.'
    ],
    correct_index: 1,
    type: 'theory',
    explanation: 'getBy* queries expect the element to be present immediately and throw an error if it isn\'t. findBy* is a combination of getBy* and waitFor, making it the standard way to handle asynchronous elements in testing.',
    code_snippet: null
  },
  {
    id: 'pf4',
    prompt: 'Write a basic Jest test to mock an axios call and verify the data is displayed.',
    options: [],
    correct_index: -1,
    type: 'code',
    explanation: 'Demonstrating proficiency in mocking modules and handling async tests. Critical for PayPal\'s requirement for "comprehensive unit and integration tests".',
    code_snippet: `
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MyComponent from './MyComponent';

jest.mock('axios');

test('fetches and displays user data', async () => {
  const user = { name: 'Pedro' };
  axios.get.mockResolvedValueOnce({ data: user });

  render(<MyComponent />);

  await waitFor(() => {
    expect(screen.getByText('Pedro')).toBeInTheDocument();
  });
});
`
  },
  // Node.js & Express
  {
    id: 'pf5',
    prompt: 'In an Express.js application, what is the role of "Error-handling middleware"?',
    options: [
      'It stops the server whenever an error occurs.',
      'It is any middleware that logs requests to the console.',
      'It is middleware defined with four arguments (err, req, res, next) that catches errors passed via next(err).',
      'It automatically fixes syntax errors in your code.',
      'It is a frontend component that displays error boundaries.'
    ],
    correct_index: 2,
    type: 'theory',
    explanation: 'Express recognizes error-handling middleware specifically by the number of arguments (4). It allows you to centralize error logic, ensuring your API consistently returns correct status codes and JSON error bodies instead of crashing or leaking stack traces.',
    code_snippet: null
  },
  // JS Expert / Asynchronous
  {
    id: 'pf6',
    prompt: 'What is the "Temporal Dead Zone" (TDZ) in JavaScript?',
    options: [
      'The time it takes for an API request to time out.',
      'The state where a "var" variable is hoisted but not yet assigned.',
      'The period between entering a scope and the actual declaration of a "let" or "const" variable, where accessing it throws a ReferenceError.',
      'A specific phase in the Event Loop where callbacks are purged.',
      'The time between a user click and the event handler execution.'
    ],
    correct_index: 2,
    type: 'theory',
    explanation: 'Unlike var, let and const are not initialized with undefined when hoisted. They exist in the TDZ from the start of the block until the line where they are declared. This helps catch bugs caused by using variables before they have been defined.',
    code_snippet: null
  },
  // Performance / CSS (Nice to have)
  {
    id: 'pf7',
    prompt: 'How would you optimize a high-transaction transaction list to handle thousands of items without slowing down the browser?',
    options: [
      'By using "display: none" for all items initially.',
      'By using Windowing or Virtualization (e.g., react-window) to only render items currently visible in the viewport.',
      'By decreasing the font size so more items fit on one screen.',
      'By converting the entire list into a single JPG image.',
      'By disabling JavaScript while the list is rendering.'
    ],
    correct_index: 1,
    type: 'theory',
    explanation: 'Rendering thousands of DOM nodes is expensive and leads to "jank". List virtualization solves this by keeping only a small number of nodes in the DOM and swapping their content as the user scrolls. This is essential for a "Senior Fullstack Frontend" role at a company like PayPal.',
    code_snippet: null
  }
];

const sqlValues = tailoredQuestions.map((q, i) => {
  const optionsArray = q.options.length > 0 
    ? `array[${q.options.map(o => `'${o.replace(/'/g, "''")}'`).join(', ')}]`
    : `'{}'`;
    
  const codeSnippet = q.code_snippet ? `$$${q.code_snippet.trim()}$$` : 'null';
  
  return `  (
    '${q.id}',
    '${q.quiz_id || 'paypal-frontend-heavy'}',
    '${q.prompt.replace(/'/g, "''")}',
    ${optionsArray},
    ${q.correct_index},
    ${i + 1},
    '${q.type}',
    '${q.explanation.replace(/'/g, "''")}',
    ${codeSnippet}
  )`;
}).join(',\n');

const finalSql = seedHeader + sqlValues + `
on conflict (id) do update set
  quiz_id = excluded.quiz_id,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_index = excluded.correct_index,
  position = excluded.position,
  type = excluded.type,
  explanation = excluded.explanation,
  code_snippet = excluded.code_snippet;
`;

fs.writeFileSync(path.join(process.cwd(), 'backend/sql/supabase_seed_paypal.sql'), finalSql);
console.log("SQL seed script written to backend/sql/supabase_seed_paypal.sql");
