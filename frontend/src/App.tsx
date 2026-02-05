import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  Moon,
  Sun,
} from 'lucide-react'
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
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
  const [showPartial, setShowPartial] = useState(false)

  const autoAdvanceLock = useRef(0)

  const totalQuestions = quiz?.questions.length ?? 0
  const currentQuestion = quiz?.questions[currentIndex]

  const score = useMemo(() => {
    if (!quiz) return 0
    return quiz.questions.reduce((acc, question, index) => {
      return answers[index] === question.correctIndex ? acc + 1 : acc
    }, 0)
  }, [answers, quiz])

  const answeredCount = useMemo(
    () => answers.filter((answer) => answer !== null).length,
    [answers],
  )

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
      return
    }

    const prefersDark = window.matchMedia?.(
      '(prefers-color-scheme: dark)',
    ).matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${API_URL}/jobs`)
        if (!response.ok) {
          throw new Error('Failed to load roles')
        }
        const data = (await response.json()) as JobCard[]
        setJobs(data)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to load roles'
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
        throw new Error('Failed to load quiz')
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
      const message = err instanceof Error ? err.message : 'Failed to load quiz'
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
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading roles...
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 text-app">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-subtle">
            Interview prep
          </p>
          <h1 className="text-3xl font-semibold text-app">
            Fullstack Engineer Mock Test
          </h1>
          <p className="max-w-2xl text-sm text-subtle">
            Study app based on the PDF with 30 questions, timers, and final
            feedback.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full border border-panel bg-panel px-4 py-2 text-sm text-muted">
            <Flame className="h-4 w-4 text-orange-400" />
            {quiz ? `${currentIndex + 1}/${totalQuestions}` : '30 questions'}
          </div>
          <Button
            variant="ghost"
            className="border border-card"
            onClick={() =>
              setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
            }
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4" />
                Light
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark
              </>
            )}
          </Button>
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
                <p className="text-sm text-muted">{job.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs text-subtle">
                  <span className="rounded-full bg-panel px-3 py-1">
                    {job.location}
                  </span>
                  <span className="rounded-full bg-panel px-3 py-1">
                    {job.status === 'active' ? 'Available' : 'Coming soon'}
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
                  {job.status === 'active' ? 'Select role' : 'Coming soon'}
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
              <p className="text-sm text-muted">{selectedJob.summary}</p>
              <div className="rounded-lg border border-panel bg-panel p-4 text-sm text-muted">
                <p className="mb-3 font-medium text-app">How it works</p>
                <ul className="space-y-2">
                  <li>One question at a time with 5 options.</li>
                  <li>Overall and per-question timers are visible.</li>
                  <li>Auto-advance when time expires.</li>
                  <li>Final result with score percentage.</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleStartQuiz} disabled={isQuizLoading}>
                  {isQuizLoading ? 'Loading...' : 'Start quiz'}
                </Button>
                <Button variant="ghost" onClick={handleRestart}>
                  Change role
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Quick checklist</CardTitle>
              <CardDescription>Before you start</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Block 25-30 minutes without interruptions.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Review backend and frontend concepts.
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Use the result to focus on gaps.
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
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="rounded-full bg-panel px-3 py-1">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="rounded-full bg-panel px-3 py-1">
                  {formatTime(questionLeft)} per question
                </span>
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-app">
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
                          ? theme === 'dark'
                            ? 'border-emerald-400 bg-emerald-500/10 text-emerald-100'
                            : 'border-emerald-400 bg-emerald-500/20 text-emerald-900'
                          : 'border-card bg-card text-app hover:border-panel'
                      }`}
                    >
                      <span className="mr-3 font-semibold text-subtle">
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
                Back
              </Button>
              <Button onClick={() => advanceQuestion(false)}>
                {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
              </Button>
            </CardFooter>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Timers</CardTitle>
              <CardDescription>Time control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-panel bg-panel p-4">
                <div className="flex items-center gap-2 text-sm text-subtle">
                  <Clock className="h-4 w-4" />
                  Overall time
                </div>
                <p className="mt-2 text-2xl font-semibold text-app">
                  {formatTime(totalLeft)}
                </p>
              </div>
              <div className="rounded-lg border border-panel bg-panel p-4">
                <div className="flex items-center gap-2 text-sm text-subtle">
                  <GraduationCap className="h-4 w-4" />
                  Question time
                </div>
                <p className="mt-2 text-2xl font-semibold text-app">
                  {formatTime(questionLeft)}
                </p>
              </div>
              <div className="text-xs text-subtle">
                When time expires, the question advances automatically.
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setShowPartial((prev) => !prev)}
              >
                {showPartial ? 'Hide partial results' : 'View partial results'}
              </Button>
              {showPartial && (
                <div className="rounded-lg border border-panel bg-panel p-4 text-sm text-muted">
                  <p className="text-sm text-subtle">Progress</p>
                  <p className="mt-2 text-2xl font-semibold text-app">
                    {score} / {answeredCount}
                  </p>
                  <p className="text-xs text-subtle">
                    {answeredCount} answered out of {totalQuestions}
                  </p>
                  <div className="mt-3 space-y-2 text-xs">
                    {quiz.questions.map((question, index) => {
                      if (answers[index] === null) return null
                      const isCorrect = answers[index] === question.correctIndex
                      return (
                        <div
                          key={question.id}
                          className="flex items-center justify-between"
                        >
                          <span className="text-subtle">Q{index + 1}</span>
                          <span
                            className={
                              isCorrect ? 'text-emerald-400' : 'text-rose-400'
                            }
                          >
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {phase === 'result' && quiz && (
        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Final result</CardTitle>
              <CardDescription>Performance summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
                <p className="text-sm text-emerald-100">Correct answers</p>
                <p className="text-3xl font-semibold text-app">
                  {score} / {totalQuestions}
                </p>
                <p className="text-sm text-emerald-200">
                  {Math.round((score / totalQuestions) * 100)}% correct
                </p>
              </div>
              <div className="space-y-3 text-sm text-muted">
                {quiz.questions.map((question, index) => {
                  const isCorrect = answers[index] === question.correctIndex
                  return (
                    <div
                      key={question.id}
                      className="rounded-lg border border-card bg-card p-3"
                    >
                      <p className="text-sm text-subtle">
                        Question {index + 1}
                      </p>
                      <p className="text-sm text-app">{question.prompt}</p>
                      <p
                        className={`text-xs ${
                          isCorrect ? 'text-emerald-300' : 'text-rose-300'
                        }`}
                      >
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleRestart}>Choose another role</Button>
            </CardFooter>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
              <CardDescription>Use the result</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted">
              <p>Review the topics you missed and retake the mock later.</p>
              <p>
                Consider creating flashcards for topics like rate limiting,
                scalability, and SOLID.
              </p>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}

export default App
