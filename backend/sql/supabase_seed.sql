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
    'Preparação Fullstack Engineer',
    'Questões baseadas no material de preparação para entrevista.',
    array[
      'São 30 questões de múltipla escolha (5 opções).',
      'O timer geral e o timer por questão rodam em paralelo.',
      'Você pode avançar manualmente ou deixar o tempo expirar.',
      'No fim, mostramos acertos e percentual.'
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
    'Simulado completo com conceitos essenciais de backend e frontend.'
  ),
  (
    'backend-engineer',
    'Backend Engineer',
    'Senior',
    'Backend',
    'Remote',
    'coming-soon',
    null,
    'Em breve: foco em sistemas distribuídos e performance.'
  ),
  (
    'frontend-engineer',
    'Frontend Engineer',
    'Senior',
    'Frontend',
    'Remote',
    'coming-soon',
    null,
    'Em breve: foco em UI, acessibilidade e performance.'
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
    'O que é o Event Loop no Node.js?',
    array[
      'Um mecanismo de múltiplas threads para paralelismo real.',
      'Um mecanismo que organiza filas de callbacks em uma única thread.',
      'Um gerenciador de processos do sistema operacional.',
      'Um recurso exclusivo do navegador.',
      'Uma fila dedicada apenas a Promises.'
    ],
    1,
    1
  ),
  (
    'q2',
    'fullstack-core',
    'Qual a diferença principal entre Promise.then e async/await?',
    array[
      'async/await é mais lento e deve ser evitado.',
      'Promise.then não permite tratamento de erros.',
      'async/await é açúcar sintático e melhora a legibilidade.',
      'Promise.then é obrigatório em Node.js.',
      'async/await só funciona com callbacks.'
    ],
    2,
    2
  ),
  (
    'q3',
    'fullstack-core',
    'Qual o impacto de código CPU-bound no Node.js?',
    array[
      'Melhora a performance por usar cache interno.',
      'Bloqueia o event loop e degrada a performance.',
      'Cria mais threads automaticamente.',
      'Só afeta requisições HTTP, não tarefas internas.',
      'Não tem impacto, pois Node.js é multi-thread por padrão.'
    ],
    1,
    3
  ),
  (
    'q4',
    'fullstack-core',
    'Por que usar NestJS em projetos maiores?',
    array[
      'Porque elimina a necessidade de testes.',
      'Porque é o framework mais leve do mercado.',
      'Porque impõe arquitetura opinativa, DI e modularização.',
      'Porque não depende de TypeScript.',
      'Porque não precisa de controllers.'
    ],
    2,
    4
  ),
  (
    'q5',
    'fullstack-core',
    'Guards, Pipes e Interceptors são usados para:',
    array[
      'Autenticação, validação e logging/métricas.',
      'Renderização de HTML, CSS e JS.',
      'Gerar migrations automaticamente.',
      'Criar containers Docker.',
      'Configurar bancos NoSQL.'
    ],
    0,
    5
  ),
  (
    'q6',
    'fullstack-core',
    'Quando usar MongoDB?',
    array[
      'Quando há joins complexos e integridade relacional.',
      'Quando há dados semi-estruturados e alto volume de escrita.',
      'Quando há necessidade de ACID estrito.',
      'Quando o schema é rígido e não muda.',
      'Quando o foco é em transações financeiras.'
    ],
    1,
    6
  ),
  (
    'q7',
    'fullstack-core',
    'Quando usar PostgreSQL?',
    array[
      'Quando precisa de transações e joins complexos.',
      'Quando dados são semi-estruturados e sem schema.',
      'Quando só há leitura eventual e sem consistência.',
      'Quando a aplicação não precisa de índices.',
      'Quando a escalabilidade é exclusivamente horizontal.'
    ],
    0,
    7
  ),
  (
    'q8',
    'fullstack-core',
    'Para que servem índices em bancos de dados?',
    array[
      'Para remover a necessidade de backups.',
      'Para acelerar consultas evitando full table scans.',
      'Para limitar o número de tabelas.',
      'Para forçar consistência eventual.',
      'Para comprimir automaticamente a base.'
    ],
    1,
    8
  ),
  (
    'q9',
    'fullstack-core',
    'Como investigar uma query lenta no Postgres?',
    array[
      'Desativando logs.',
      'Usando EXPLAIN ANALYZE para avaliar custo e índices.',
      'Removendo todos os índices.',
      'Executando sempre com LIMIT 1.',
      'Trocando o banco sem análise.'
    ],
    1,
    9
  ),
  (
    'q10',
    'fullstack-core',
    'O que significa consistência eventual?',
    array[
      'Dados sempre consistentes a cada escrita.',
      'Dados ficam consistentes ao longo do tempo.',
      'Dados inconsistentes permanentemente.',
      'Somente bancos SQL oferecem isso.',
      'Somente bancos NoSQL oferecem isso.'
    ],
    1,
    10
  ),
  (
    'q11',
    'fullstack-core',
    'Quais são gargalos comuns em sistemas?',
    array[
      'Somente CPU.',
      'Somente rede interna.',
      'Banco de dados, I/O externo, renderizações excessivas e cache.',
      'Somente o frontend.',
      'Somente threads do Node.js.'
    ],
    2,
    11
  ),
  (
    'q12',
    'fullstack-core',
    'Qual uma abordagem correta para escalabilidade backend?',
    array[
      'Acoplar serviços ao estado local.',
      'Usar serviços stateless e escalar horizontalmente.',
      'Remover o load balancer.',
      'Evitar cache sempre.',
      'Centralizar tudo em uma única instância.'
    ],
    1,
    12
  ),
  (
    'q13',
    'fullstack-core',
    'Qual o objetivo principal de cache?',
    array[
      'Aumentar latência para estabilidade.',
      'Reduzir latência e carga no banco.',
      'Substituir a necessidade de testes.',
      'Eliminar o uso de memória.',
      'Forçar consistência forte.'
    ],
    1,
    13
  ),
  (
    'q14',
    'fullstack-core',
    'O que é rate limiting?',
    array[
      'Uma técnica para aumentar o número de requisições.',
      'Uma forma de limitar requisições por cliente.',
      'Um algoritmo de compressão de payload.',
      'Uma estratégia de cache interno.',
      'Um modo de escalar verticalmente.'
    ],
    1,
    14
  ),
  (
    'q15',
    'fullstack-core',
    'Qual a diferença entre escala vertical e horizontal?',
    array[
      'Vertical adiciona instâncias, horizontal aumenta recursos.',
      'Vertical aumenta recursos, horizontal adiciona instâncias.',
      'Ambas significam a mesma coisa.',
      'Horizontal só funciona em bancos NoSQL.',
      'Vertical só funciona com containers.'
    ],
    1,
    15
  ),
  (
    'q16',
    'fullstack-core',
    'O que monitorar em produção?',
    array[
      'Somente erros.',
      'Somente CPU.',
      'Latência, erros, CPU, memória e throughput.',
      'Somente logs.',
      'Somente métricas de negócio.'
    ],
    2,
    16
  ),
  (
    'q17',
    'fullstack-core',
    'Diferença entre logs e métricas?',
    array[
      'Logs são valores agregados; métricas são eventos.',
      'Logs são eventos; métricas são valores agregados.',
      'Ambos são exatamente iguais.',
      'Logs substituem métricas.',
      'Métricas são mais detalhadas que logs sempre.'
    ],
    1,
    17
  ),
  (
    'q18',
    'fullstack-core',
    'O que é um incidente?',
    array[
      'Qualquer erro de lint.',
      'Evento que impacta usuários ou viola SLO.',
      'Mudança de código sem revisão.',
      'Qualquer log de warning.',
      'Uma falha local sem impacto.'
    ],
    1,
    18
  ),
  (
    'q19',
    'fullstack-core',
    'O que é Root Cause Analysis?',
    array[
      'Uma lista de culpados do incidente.',
      'Identificação da causa técnica e organizacional com ações.',
      'Uma métrica de performance.',
      'Um tipo de teste unitário.',
      'Uma técnica de deploy.'
    ],
    1,
    19
  ),
  (
    'q20',
    'fullstack-core',
    'Erro humano é considerado causa raiz?',
    array[
      'Sim, sempre.',
      'Sim, quando o time é pequeno.',
      'Não; sistemas devem prevenir falhas humanas.',
      'Somente em produção.',
      'Somente em ambientes críticos.'
    ],
    2,
    20
  ),
  (
    'q21',
    'fullstack-core',
    'Qual a diferença entre teste unitário e integração?',
    array[
      'Unitário testa comunicação; integração testa isolado.',
      'Unitário testa partes isoladas; integração testa comunicação.',
      'São sinônimos.',
      'Integração só testa frontend.',
      'Unitário só testa banco de dados.'
    ],
    1,
    21
  ),
  (
    'q22',
    'fullstack-core',
    'Onde focar a prioridade em testes?',
    array[
      'Somente em código trivial.',
      'Regras de negócio e edge cases.',
      'Somente em bibliotecas externas.',
      'Somente em testes end-to-end.',
      'Somente em testes de UI.'
    ],
    1,
    22
  ),
  (
    'q23',
    'fullstack-core',
    'Por que mocks podem ser perigosos?',
    array[
      'Porque tornam os testes mais rápidos.',
      'Porque escondem problemas reais de integração.',
      'Porque eliminam a necessidade de CI.',
      'Porque aumentam a cobertura automaticamente.',
      'Porque substituem APIs externas.'
    ],
    1,
    23
  ),
  (
    'q24',
    'fullstack-core',
    'O que NÃO deve ser testado?',
    array[
      'Regras de negócio críticas.',
      'Edge cases.',
      'Código trivial e bibliotecas externas.',
      'Integrações críticas.',
      'Fluxos principais do produto.'
    ],
    2,
    24
  ),
  (
    'q25',
    'fullstack-core',
    'O que diz o princípio SRP?',
    array[
      'Uma classe pode ter vários motivos para mudar.',
      'Uma classe deve ter apenas um motivo para mudar.',
      'Cada método deve ter múltiplas responsabilidades.',
      'Classes devem ser estáticas.',
      'SRP é um padrão de deploy.'
    ],
    1,
    25
  ),
  (
    'q26',
    'fullstack-core',
    'Qual o benefício principal do SOLID?',
    array[
      'Menor acoplamento e maior testabilidade.',
      'Maior acoplamento e menos testes.',
      'Remover a necessidade de documentação.',
      'Aumentar apenas a performance.',
      'Evitar qualquer padrão de projeto.'
    ],
    0,
    26
  ),
  (
    'q27',
    'fullstack-core',
    'Como evitar longos if/else?',
    array[
      'Duplicando condições.',
      'Usando composição e Strategy Pattern.',
      'Removendo testes.',
      'Ignorando regras de negócio.',
      'Criando funções gigantes.'
    ],
    1,
    27
  ),
  (
    'q28',
    'fullstack-core',
    'Qual a diferença entre merge e rebase?',
    array[
      'Merge reescreve o histórico; rebase preserva.',
      'Merge preserva histórico; rebase o reescreve.',
      'Ambos sempre reescrevem histórico.',
      'Rebase é obrigatório em todas as empresas.',
      'Merge apaga commits antigos.'
    ],
    1,
    28
  ),
  (
    'q29',
    'fullstack-core',
    'Como lidar com conflitos de merge?',
    array[
      'Ignorar e fazer force push.',
      'Resolver entendendo o contexto e alinhando com o time.',
      'Apagar arquivos conflitantes.',
      'Reverter todo o branch automaticamente.',
      'Evitar merges para sempre.'
    ],
    1,
    29
  ),
  (
    'q30',
    'fullstack-core',
    'Qual é uma prática de rollback?',
    array[
      'Deploy irreversível.',
      'Versionamento, deploy reversível e feature flags.',
      'Remover logs de produção.',
      'Desativar monitoramento.',
      'Ignorar falhas e seguir em frente.'
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
