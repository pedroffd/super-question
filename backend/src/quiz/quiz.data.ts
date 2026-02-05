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
      'Simulado completo com conceitos essenciais de backend e frontend.',
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    level: 'Senior',
    area: 'Backend',
    location: 'Remote',
    status: 'coming-soon',
    summary: 'Em breve: foco em sistemas distribuídos e performance.',
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer',
    level: 'Senior',
    area: 'Frontend',
    location: 'Remote',
    status: 'coming-soon',
    summary: 'Em breve: foco em UI, acessibilidade e performance.',
  },
]

export const quizzes: Quiz[] = [
  {
    id: 'fullstack-core',
    title: 'Preparação Fullstack Engineer',
    description:
      'Questões baseadas no material de preparação para entrevista.',
    intro: [
      'São 30 questões de múltipla escolha (5 opções).',
      'O timer geral e o timer por questão rodam em paralelo.',
      'Você pode avançar manualmente ou deixar o tempo expirar.',
      'No fim, mostramos acertos e percentual.',
    ],
    timeLimitSeconds: 1800,
    perQuestionSeconds: 60,
    questions: [
      {
        id: 'q1',
        prompt: 'O que é o Event Loop no Node.js?',
        options: [
          'Um mecanismo de múltiplas threads para paralelismo real.',
          'Um mecanismo que organiza filas de callbacks em uma única thread.',
          'Um gerenciador de processos do sistema operacional.',
          'Um recurso exclusivo do navegador.',
          'Uma fila dedicada apenas a Promises.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Qual a diferença principal entre Promise.then e async/await?',
        options: [
          'async/await é mais lento e deve ser evitado.',
          'Promise.then não permite tratamento de erros.',
          'async/await é açúcar sintático e melhora a legibilidade.',
          'Promise.then é obrigatório em Node.js.',
          'async/await só funciona com callbacks.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q3',
        prompt: 'Qual o impacto de código CPU-bound no Node.js?',
        options: [
          'Melhora a performance por usar cache interno.',
          'Bloqueia o event loop e degrada a performance.',
          'Cria mais threads automaticamente.',
          'Só afeta requisições HTTP, não tarefas internas.',
          'Não tem impacto, pois Node.js é multi-thread por padrão.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q4',
        prompt: 'Por que usar NestJS em projetos maiores?',
        options: [
          'Porque elimina a necessidade de testes.',
          'Porque é o framework mais leve do mercado.',
          'Porque impõe arquitetura opinativa, DI e modularização.',
          'Porque não depende de TypeScript.',
          'Porque não precisa de controllers.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q5',
        prompt: 'Guards, Pipes e Interceptors são usados para:',
        options: [
          'Autenticação, validação e logging/métricas.',
          'Renderização de HTML, CSS e JS.',
          'Gerar migrations automaticamente.',
          'Criar containers Docker.',
          'Configurar bancos NoSQL.',
        ],
        correctIndex: 0,
      },
      {
        id: 'q6',
        prompt: 'Quando usar MongoDB?',
        options: [
          'Quando há joins complexos e integridade relacional.',
          'Quando há dados semi-estruturados e alto volume de escrita.',
          'Quando há necessidade de ACID estrito.',
          'Quando o schema é rígido e não muda.',
          'Quando o foco é em transações financeiras.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q7',
        prompt: 'Quando usar PostgreSQL?',
        options: [
          'Quando precisa de transações e joins complexos.',
          'Quando dados são semi-estruturados e sem schema.',
          'Quando só há leitura eventual e sem consistência.',
          'Quando a aplicação não precisa de índices.',
          'Quando a escalabilidade é exclusivamente horizontal.',
        ],
        correctIndex: 0,
      },
      {
        id: 'q8',
        prompt: 'Para que servem índices em bancos de dados?',
        options: [
          'Para remover a necessidade de backups.',
          'Para acelerar consultas evitando full table scans.',
          'Para limitar o número de tabelas.',
          'Para forçar consistência eventual.',
          'Para comprimir automaticamente a base.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q9',
        prompt: 'Como investigar uma query lenta no Postgres?',
        options: [
          'Desativando logs.',
          'Usando EXPLAIN ANALYZE para avaliar custo e índices.',
          'Removendo todos os índices.',
          'Executando sempre com LIMIT 1.',
          'Trocando o banco sem análise.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q10',
        prompt: 'O que significa consistência eventual?',
        options: [
          'Dados sempre consistentes a cada escrita.',
          'Dados ficam consistentes ao longo do tempo.',
          'Dados inconsistentes permanentemente.',
          'Somente bancos SQL oferecem isso.',
          'Somente bancos NoSQL oferecem isso.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q11',
        prompt: 'Quais são gargalos comuns em sistemas?',
        options: [
          'Somente CPU.',
          'Somente rede interna.',
          'Banco de dados, I/O externo, renderizações excessivas e cache.',
          'Somente o frontend.',
          'Somente threads do Node.js.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q12',
        prompt: 'Qual uma abordagem correta para escalabilidade backend?',
        options: [
          'Acoplar serviços ao estado local.',
          'Usar serviços stateless e escalar horizontalmente.',
          'Remover o load balancer.',
          'Evitar cache sempre.',
          'Centralizar tudo em uma única instância.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q13',
        prompt: 'Qual o objetivo principal de cache?',
        options: [
          'Aumentar latência para estabilidade.',
          'Reduzir latência e carga no banco.',
          'Substituir a necessidade de testes.',
          'Eliminar o uso de memória.',
          'Forçar consistência forte.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q14',
        prompt: 'O que é rate limiting?',
        options: [
          'Uma técnica para aumentar o número de requisições.',
          'Uma forma de limitar requisições por cliente.',
          'Um algoritmo de compressão de payload.',
          'Uma estratégia de cache interno.',
          'Um modo de escalar verticalmente.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q15',
        prompt: 'Qual a diferença entre escala vertical e horizontal?',
        options: [
          'Vertical adiciona instâncias, horizontal aumenta recursos.',
          'Vertical aumenta recursos, horizontal adiciona instâncias.',
          'Ambas significam a mesma coisa.',
          'Horizontal só funciona em bancos NoSQL.',
          'Vertical só funciona com containers.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q16',
        prompt: 'O que monitorar em produção?',
        options: [
          'Somente erros.',
          'Somente CPU.',
          'Latência, erros, CPU, memória e throughput.',
          'Somente logs.',
          'Somente métricas de negócio.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q17',
        prompt: 'Diferença entre logs e métricas?',
        options: [
          'Logs são valores agregados; métricas são eventos.',
          'Logs são eventos; métricas são valores agregados.',
          'Ambos são exatamente iguais.',
          'Logs substituem métricas.',
          'Métricas são mais detalhadas que logs sempre.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q18',
        prompt: 'O que é um incidente?',
        options: [
          'Qualquer erro de lint.',
          'Evento que impacta usuários ou viola SLO.',
          'Mudança de código sem revisão.',
          'Qualquer log de warning.',
          'Uma falha local sem impacto.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q19',
        prompt: 'O que é Root Cause Analysis?',
        options: [
          'Uma lista de culpados do incidente.',
          'Identificação da causa técnica e organizacional com ações.',
          'Uma métrica de performance.',
          'Um tipo de teste unitário.',
          'Uma técnica de deploy.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q20',
        prompt: 'Erro humano é considerado causa raiz?',
        options: [
          'Sim, sempre.',
          'Sim, quando o time é pequeno.',
          'Não; sistemas devem prevenir falhas humanas.',
          'Somente em produção.',
          'Somente em ambientes críticos.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q21',
        prompt: 'Qual a diferença entre teste unitário e integração?',
        options: [
          'Unitário testa comunicação; integração testa isolado.',
          'Unitário testa partes isoladas; integração testa comunicação.',
          'São sinônimos.',
          'Integração só testa frontend.',
          'Unitário só testa banco de dados.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q22',
        prompt: 'Onde focar a prioridade em testes?',
        options: [
          'Somente em código trivial.',
          'Regras de negócio e edge cases.',
          'Somente em bibliotecas externas.',
          'Somente em testes end-to-end.',
          'Somente em testes de UI.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q23',
        prompt: 'Por que mocks podem ser perigosos?',
        options: [
          'Porque tornam os testes mais rápidos.',
          'Porque escondem problemas reais de integração.',
          'Porque eliminam a necessidade de CI.',
          'Porque aumentam a cobertura automaticamente.',
          'Porque substituem APIs externas.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q24',
        prompt: 'O que NÃO deve ser testado?',
        options: [
          'Regras de negócio críticas.',
          'Edge cases.',
          'Código trivial e bibliotecas externas.',
          'Integrações críticas.',
          'Fluxos principais do produto.',
        ],
        correctIndex: 2,
      },
      {
        id: 'q25',
        prompt: 'O que diz o princípio SRP?',
        options: [
          'Uma classe pode ter vários motivos para mudar.',
          'Uma classe deve ter apenas um motivo para mudar.',
          'Cada método deve ter múltiplas responsabilidades.',
          'Classes devem ser estáticas.',
          'SRP é um padrão de deploy.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q26',
        prompt: 'Qual o benefício principal do SOLID?',
        options: [
          'Menor acoplamento e maior testabilidade.',
          'Maior acoplamento e menos testes.',
          'Remover a necessidade de documentação.',
          'Aumentar apenas a performance.',
          'Evitar qualquer padrão de projeto.',
        ],
        correctIndex: 0,
      },
      {
        id: 'q27',
        prompt: 'Como evitar longos if/else?',
        options: [
          'Duplicando condições.',
          'Usando composição e Strategy Pattern.',
          'Removendo testes.',
          'Ignorando regras de negócio.',
          'Criando funções gigantes.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q28',
        prompt: 'Qual a diferença entre merge e rebase?',
        options: [
          'Merge reescreve o histórico; rebase preserva.',
          'Merge preserva histórico; rebase o reescreve.',
          'Ambos sempre reescrevem histórico.',
          'Rebase é obrigatório em todas as empresas.',
          'Merge apaga commits antigos.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q29',
        prompt: 'Como lidar com conflitos de merge?',
        options: [
          'Ignorar e fazer force push.',
          'Resolver entendendo o contexto e alinhando com o time.',
          'Apagar arquivos conflitantes.',
          'Reverter todo o branch automaticamente.',
          'Evitar merges para sempre.',
        ],
        correctIndex: 1,
      },
      {
        id: 'q30',
        prompt: 'Qual é uma prática de rollback?',
        options: [
          'Deploy irreversível.',
          'Versionamento, deploy reversível e feature flags.',
          'Remover logs de produção.',
          'Desativar monitoramento.',
          'Ignorar falhas e seguir em frente.',
        ],
        correctIndex: 1,
      },
    ],
  },
]
