
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
  (
    'pf1',
    'paypal-frontend-heavy',
    'In a large-scale React application using Redux, what is the primary benefit of using "Selectors" (e.g., with Reselect)?',
    array['They allow you to bypass the Redux store and access state directly from components.', 'They convert Redux actions into React Hooks automatically.', 'They provide memoization to prevent unnecessary re-computations and re-renders when only unrelated parts of the state change.', 'They are used to handle asynchronous API calls inside the reducer.', 'They replace the need for the "connect" HOC or "useSelector" hook.'],
    2,
    1,
    'theory',
    '### 🎯 O Poder dos Selectors
Em aplicações **Redux de larga escala**, os Selectors são fundamentais para manter a performance e a organização.

#### Por que usar?
1.  **Memoização (Reselect):** Evita cálculos caros se o estado não mudou. O componente só renderiza se o *resultado* do seletor mudar.
2.  **Encapsulamento:** Os componentes não precisam saber a estrutura exata do estado. Se você mudar o formato do seu "store", só altera o seletor.
3.  **Composição:** Você pode combinar seletores simples para criar dados complexos e derivados.

```javascript
// Exemplo com Reselect
const selectUser = state => state.user;
const selectTransactions = state => state.transactions;

export const selectUserTotalBalance = createSelector(
  [selectTransactions],
  (txns) => txns.reduce((acc, t) => acc + t.amount, 0)
);
```

> [!TIP]
> Use seletores sempre que precisar de dados "calculados" a partir do estado bruto.',
    null
  ),
  (
    'pf2',
    'paypal-frontend-heavy',
    'Implement a custom hook "usePrevious" that tracks the previous value of a prop or state variable.',
    '{}',
    -1,
    2,
    'code',
    '### 🧩 Desvendando o `usePrevious`
Este é um teste clássico de entendimento do ciclo de vida do React e do comportamento do `useRef`.

#### Como funciona?
1.  **`useRef` para persistência:** O valor no `ref.current` persiste entre renderizações sem disparar um novo ciclo de renderização quando alterado.
2.  **`useEffect` para o "atraso":** O efeito é executado **após** a renderização. Ou seja, ele salva o valor atual no ref *depois* que o componente já renderizou e retornou o valor antigo do ref.

```javascript
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value; // Atualiza DEPOIS da renderização
  }, [value]);
  
  return ref.current; // Retorna o valor de ANTES da atualização do useEffect
}
```

Este padrão é útil para comparar props antigas com novas em lógica de transição ou animação.',
    $$import { useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]); // Update ref only after render
  
  return ref.current; // Returns value from previous render
}$$
  ),
  (
    'pf3',
    'paypal-frontend-heavy',
    'When testing a component with React Testing Library, why is "findBy*" preferred over "getBy*" for elements that appear after an API call?',
    array['findBy* is faster because it uses a direct DOM query.', 'findBy* returns a Promise and automatically waits (up to a timeout) for the element to appear in the DOM.', 'getBy* is deprecated in the latest version of RTL.', 'findBy* only works with class components.', 'There is no difference; they are aliases for each other.'],
    1,
    3,
    'theory',
    '### 🧪 Testes Assíncronos no RTL
Entender a diferença entre `get`, `query` e `find` é essencial para qualquer desenvolvedor Senior.

| Prefixo | Espera? | Erra se não achar? | Uso Principal |
| :--- | :--- | :--- | :--- |
| **getBy** | Não | Sim | Elementos estáticos (títulos, botões fixos) |
| **queryBy** | Não | Não (null) | Verificar que algo **NÃO** está na tela |
| **findBy** | **Sim** | Sim (timeout) | Dados que vêm de APIs ou timers |

```javascript
// Jeito Certo (Assíncrono)
const user = await screen.findByText(/pedro/i);
expect(user).toBeInTheDocument();
```

> [!IMPORTANT]
> `findBy` é basicamente um `waitFor` + `getBy` encapsulados.',
    null
  ),
  (
    'pf4',
    'paypal-frontend-heavy',
    'Write a basic Jest test to mock an axios call and verify the data is displayed.',
    '{}',
    -1,
    4,
    'code',
    '### 🤡 Mocking com Jest
Mocks são cruciais para testes de integração rápidos e determinísticos. Você não quer bater na API real durante o teste.

#### Pontos Chave:
1.  **`jest.mock(''axios'')`:** Diz ao Jest para substituir o módulo real por um objeto de mock.
2.  **`mockResolvedValueOnce`:** Configura o que o axios deve retornar especificamente para este teste.
3.  **`waitFor`:** Dá tempo ao React para processar a promessa e re-renderizar o componente com os dados.

```javascript
test(''exemplo de sucesso'', async () => {
  axios.get.mockResolvedValueOnce({ data: { name: ''PayPal'' } });
  render(<MyComp />);
  const text = await screen.findByText(''PayPal'');
});
```',
    $$import { render, screen, waitFor } from '@testing-library/react';
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
});$$
  ),
  (
    'pf5',
    'paypal-frontend-heavy',
    'In an Express.js application, what is the role of "Error-handling middleware"?',
    array['It stops the server whenever an error occurs.', 'It is any middleware that logs requests to the console.', 'It is middleware defined with four arguments (err, req, res, next) that catches errors passed via next(err).', 'It automatically fixes syntax errors in your code.', 'It is a frontend component that displays error boundaries.'],
    2,
    5,
    'theory',
    '### 🛡️ Tratamento de Erros Estruturado
O middleware de erro do Express é único porque possui **quatro argumentos** em vez de três.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: ''Algo deu errado!'' });
});
```

#### Por que centralizar?
- **Segurança:** Evita vazar mensagens técnicas (stack traces) para o cliente.
- **Consistência:** Garante que todos os erros retornem o mesmo formato JSON.
- **Manutenibilidade:** Você altera a lógica de LOG ou notificação em um só lugar.',
    null
  ),
  (
    'pf6',
    'paypal-frontend-heavy',
    'What is the "Temporal Dead Zone" (TDZ) in JavaScript?',
    array['The time it takes for an API request to time out.', 'The state where a "var" variable is hoisted but not yet assigned.', 'The period between entering a scope and the actual declaration of a "let" or "const" variable, where accessing it throws a ReferenceError.', 'A specific phase in the Event Loop where callbacks are purged.', 'The time between a user click and the event handler execution.'],
    2,
    6,
    'theory',
    '### 💀 Temporal Dead Zone (TDZ)
A TDZ é um comportamento introduzido no ES6 para tornar o código mais previsível e evitar os "erros silenciosos" do `var`.

#### Com `var`:
Ocorre o *hoisting* e a variável é inicializada como `undefined`. Acessá-la antes da linha de declaração **não** dá erro.

#### Com `let` / `const`:
A variável sofre *hoisting*, mas **NÃO** é inicializada. Ela entra na TDZ.

```javascript
{
  // --- Início da TDZ ---
  console.log(x); // REFERENCE ERROR!
  // ...
  let x = 10;     // --- Fim da TDZ ---
}
```

> [!NOTE]
> Isso força uma boa prática de declarar variáveis antes de usá-las.',
    null
  ),
  (
    'pf7',
    'paypal-frontend-heavy',
    'How would you optimize a high-transaction transaction list to handle thousands of items without slowing down the browser?',
    array['By using "display: none" for all items initially.', 'By using Windowing or Virtualization (e.g., react-window) to only render items currently visible in the viewport.', 'By decreasing the font size so more items fit on one screen.', 'By converting the entire list into a single JPG image.', 'By disabling JavaScript while the list is rendering.'],
    1,
    7,
    'theory',
    '### 💡 Explicação
Quando você tem **milhares de itens em uma lista**, o maior problema não é apenas os dados, mas **quantos elementos DOM o navegador precisa renderizar**.

Se você fizer algo como:
```javascript
transactions.map(t => <TransactionItem />)
```
e tiver **10.000 itens**, o React e o browser vão:
- criar **10.000 elementos DOM**
- calcular layout
- pintar tudo na tela
- manter isso na memória

Isso **destrói a performance**.

---

### 🚀 A solução: Virtualização (Windowing)
A ideia é simples:
👉 Renderizar **apenas os itens visíveis na tela**.

Se o usuário vê apenas **10 itens**, o sistema renderiza **10-20**, não **10.000**.
Quando o usuário faz scroll:
- os itens antigos são removidos
- novos itens são renderizados

Ou seja:
`DOM pequeno + scroll simulado`

---

### 📊 Exemplo prático
**Sem virtualização:**
- Lista com 10.000 itens
- DOM = 10.000 elementos
- Performance ruim

**Com virtualização:**
- Lista com 10.000 itens
- DOM = ~20 elementos

---

### 🧠 Exemplo com `react-window`
```typescript
import { FixedSizeList as List } from ''react-window''

<List
  height={500}
  itemCount={10000}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      Transaction {index}
    </div>
  )}
</List>
```
**O que acontece:**
- Só os itens visíveis são renderizados
- Scroll continua funcionando
- Performance melhora drasticamente

---

### ❌ Por que as outras estão erradas?
- **A — Diminuir fonte:** Não resolve o problema do **DOM grande**.
- **B — Desabilitar JavaScript:** Impossível na prática e não resolve renderização.
- **D — Converter em JPG:** Perde interatividade e não resolve scroll.
- **E — display: none:** Os elementos **ainda existem no DOM**, então o custo continua.

---

### 🧠 Dica de entrevista (muito importante)
Se essa pergunta aparecer numa entrevista, a resposta ideal inclui palavras como:
- **List Virtualization**
- **Windowing**
- **Recycling DOM nodes**',
    null
  )
on conflict (id) do update set
  quiz_id = excluded.quiz_id,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_index = excluded.correct_index,
  position = excluded.position,
  type = excluded.type,
  explanation = excluded.explanation,
  code_snippet = excluded.code_snippet;
