import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle2, Clock, Flame, GraduationCap } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type JobCard = {
  id: string
  title: string
  level: string
  area: string
  location: string
  status: 'active' | 'coming-soon'
  quizId?: string
  summary: string
}

type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
}

type Quiz = {
  id: string
  title: string
  description: string
  intro: string[]
  timeLimitSeconds: number
  perQuestionSeconds: number
  questions: QuizQuestion[]
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function App() {
  const [jobs, setJobs] = useState<JobCard[]>([])
  const [selectedJob, setSelectedJob] = useState<JobCard | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [phase, setPhase] = useState<'select' | 'intro' | 'quiz' | 'result'>(
    'select',
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isQuizLoading, setIsQuizLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Array<number | null>>([])
  const [totalLeft, setTotalLeft] = useState(0)
  const [questionLeft, setQuestionLeft] = useState(0)

  const autoAdvanceLock = useRef(0)

  const totalQuestions = quiz?.questions.length ?? 0
  const currentQuestion = quiz?.questions[currentIndex]

  const score = useMemo(() => {
    if (!quiz) return 0
    return quiz.questions.reduce((acc, question, index) => {
      return answers[index] === question.correctIndex ? acc + 1 : acc
    }, 0)
  }, [answers, quiz])

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${API_URL}/jobs`)
        if (!response.ok) {
          throw new Error('Falha ao carregar vagas')
        }
        const data = (await response.json()) as JobCard[]
        setJobs(data)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao carregar vagas'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [])

  useEffect(() => {
    if (phase !== 'quiz' || !quiz) return

    const interval = window.setInterval(() => {
      setTotalLeft((prev) => (prev > 0 ? prev - 1 : 0))
      setQuestionLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => window.clearInterval(interval)
  }, [phase, quiz])

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on index change
  useEffect(() => {
    autoAdvanceLock.current = -1
  }, [currentIndex])

  const finishQuiz = useCallback(() => {
    setPhase('result')
  }, [])

  useEffect(() => {
    if (phase === 'quiz' && totalLeft === 0 && quiz) {
      finishQuiz()
    }
  }, [phase, totalLeft, quiz, finishQuiz])

  const advanceQuestion = useCallback(
    (auto = false) => {
      if (!quiz) return
      if (auto) {
        if (autoAdvanceLock.current === currentIndex) return
        autoAdvanceLock.current = currentIndex
      }

      if (currentIndex >= quiz.questions.length - 1) {
        finishQuiz()
        return
      }

      setCurrentIndex((prev) => prev + 1)
      setQuestionLeft(quiz.perQuestionSeconds)
    },
    [currentIndex, finishQuiz, quiz],
  )

  useEffect(() => {
    if (phase !== 'quiz' || !quiz) return
    if (questionLeft === 0) {
      advanceQuestion(true)
    }
  }, [advanceQuestion, phase, questionLeft, quiz])

  const handleSelectJob = (job: JobCard) => {
    if (job.status !== 'active') return
    setSelectedJob(job)
    setPhase('intro')
  }

  const handleStartQuiz = async () => {
    if (!selectedJob) return
    try {
      setIsQuizLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/jobs/${selectedJob.id}/quiz`)
      if (!response.ok) {
        throw new Error('Falha ao carregar quiz')
      }
      const data = (await response.json()) as Quiz
      setQuiz(data)
      setCurrentIndex(0)
      setAnswers(Array(data.questions.length).fill(null))
      setTotalLeft(data.timeLimitSeconds)
      setQuestionLeft(data.perQuestionSeconds)
      autoAdvanceLock.current = -1
      setPhase('quiz')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao carregar quiz'
      setError(message)
      setPhase('intro')
    } finally {
      setIsQuizLoading(false)
    }
  }

  const handleAnswer = (index: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = index
      return next
    })
  }

  const handleRestart = () => {
    setQuiz(null)
    setSelectedJob(null)
    setAnswers([])
    setCurrentIndex(0)
    setPhase('select')
  }

  if (isLoading && phase === 'select') {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-200">
        Carregando vagas...
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Preparação de entrevista
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Simulado Fullstack Engineer
          </h1>
          <p className="max-w-2xl text-sm text-slate-400">
            App de estudos baseado no PDF com 30 questões, timers e feedback
            final.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
          <Flame className="h-4 w-4 text-orange-400" />
          {quiz ? `${currentIndex + 1}/${totalQuestions}` : '30 questões'}
        </div>
      </header>

      {error ? (
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      {phase === 'select' && (
        <section className="grid gap-6 md:grid-cols-3">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>
                  {job.level} · {job.area}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-300">{job.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    {job.location}
                  </span>
                  <span className="rounded-full bg-slate-800 px-3 py-1">
                    {job.status === 'active' ? 'Disponível' : 'Em breve'}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant={job.status === 'active' ? 'default' : 'secondary'}
                  className="w-full"
                  disabled={job.status !== 'active'}
                  onClick={() => handleSelectJob(job)}
                >
                  {job.status === 'active' ? 'Selecionar vaga' : 'Em breve'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      )}

      {phase === 'intro' && selectedJob && (
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>{selectedJob.title}</CardTitle>
              <CardDescription>
                {selectedJob.level} · {selectedJob.area}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-300">{selectedJob.summary}</p>
              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                <p className="mb-3 font-medium text-white">Como funciona</p>
                <ul className="space-y-2">
                  <li>Uma questão por vez com 5 opções.</li>
                  <li>Timer geral e por questão visíveis.</li>
                  <li>Auto-avanço quando o tempo expira.</li>
                  <li>Resultado final com percentual de acerto.</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleStartQuiz} disabled={isQuizLoading}>
                  {isQuizLoading ? 'Carregando...' : 'Iniciar quiz'}
                </Button>
                <Button variant="ghost" onClick={handleRestart}>
                  Trocar vaga
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Checklist rápido</CardTitle>
              <CardDescription>Antes de começar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Garanta 25-30 min sem interrupções.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Revise conceitos de backend e frontend.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Use o resultado para focar nos gaps.
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {phase === 'quiz' && quiz && currentQuestion && (
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="rounded-full bg-slate-800 px-3 py-1">
                  Questão {currentIndex + 1} de {totalQuestions}
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1">
                  {formatTime(questionLeft)} por questão
                </span>
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-white">
                  {currentQuestion.prompt}
                </h2>
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(index)}
                      className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                        answers[currentIndex] === index
                          ? 'border-emerald-400 bg-emerald-500/10 text-emerald-100'
                          : 'border-slate-800 bg-slate-900/70 text-slate-200 hover:border-slate-600'
                      }`}
                    >
                      <span className="mr-3 font-semibold text-slate-400">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button
                variant="secondary"
                onClick={() => {
                  setCurrentIndex((prev) => Math.max(prev - 1, 0))
                  setQuestionLeft(quiz.perQuestionSeconds)
                }}
                disabled={currentIndex === 0}
              >
                Voltar
              </Button>
              <Button onClick={() => advanceQuestion(false)}>
                {currentIndex === totalQuestions - 1 ? 'Finalizar' : 'Próxima'}
              </Button>
            </CardFooter>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Timers</CardTitle>
              <CardDescription>Controle de tempo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="h-4 w-4" />
                  Tempo geral
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatTime(totalLeft)}
                </p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <GraduationCap className="h-4 w-4" />
                  Tempo da questão
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatTime(questionLeft)}
                </p>
              </div>
              <div className="text-xs text-slate-500">
                Quando o tempo expira, a questão avança automaticamente.
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {phase === 'result' && quiz && (
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Resultado final</CardTitle>
              <CardDescription>Resumo do desempenho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
                <p className="text-sm text-emerald-100">Acertos</p>
                <p className="text-3xl font-semibold text-white">
                  {score} / {totalQuestions}
                </p>
                <p className="text-sm text-emerald-200">
                  {Math.round((score / totalQuestions) * 100)}% de acerto
                </p>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                {quiz.questions.map((question, index) => {
                  const isCorrect = answers[index] === question.correctIndex
                  return (
                    <div
                      key={question.id}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 p-3"
                    >
                      <p className="text-sm text-slate-400">
                        Questão {index + 1}
                      </p>
                      <p className="text-sm text-white">{question.prompt}</p>
                      <p
                        className={`text-xs ${
                          isCorrect ? 'text-emerald-300' : 'text-rose-300'
                        }`}
                      >
                        {isCorrect ? 'Correto' : 'Incorreto'}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleRestart}>Escolher outra vaga</Button>
            </CardFooter>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Próximos passos</CardTitle>
              <CardDescription>Use o resultado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <p>
                Revise os tópicos com erros recorrentes e refaça o simulado em
                outro momento.
              </p>
              <p>
                Considere criar cartões de revisão para conceitos como rate
                limiting, escalabilidade e SOLID.
              </p>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}

export default App
