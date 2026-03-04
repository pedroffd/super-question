import { Injectable, NotFoundException } from '@nestjs/common'
// biome-ignore lint/style/useImportType: Nest DI needs runtime import
import { DatabaseService } from '../database/database.service'
import type { JobCard, Quiz, QuizQuestion } from './quiz.data'

@Injectable()
export class QuizService {
  constructor(private readonly db: DatabaseService) {}

  private shuffle<T>(items: T[]) {
    const result = [...items]
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1))
      const temp = result[index]
      result[index] = result[swapIndex]
      result[swapIndex] = temp
    }
    return result
  }

  async getJobs(): Promise<JobCard[]> {
    const query = `
      SELECT id, title, level, area, location, status, quiz_id, summary 
      FROM jobs 
      ORDER BY title ASC
    `
    const { rows } = await this.db.query(query)

    return rows.map((job) => ({
      id: job.id,
      title: job.title,
      level: job.level,
      area: job.area,
      location: job.location,
      status: job.status,
      quizId: job.quiz_id,
      summary: job.summary,
    }))
  }

  async getJob(jobId: string): Promise<JobCard> {
    const query = `
      SELECT id, title, level, area, location, status, quiz_id, summary 
      FROM jobs 
      WHERE id = $1
    `
    const { rows } = await this.db.query(query, [jobId])

    if (rows.length === 0) {
      throw new NotFoundException('Job not found')
    }

    const data = rows[0]
    return {
      id: data.id,
      title: data.title,
      level: data.level,
      area: data.area,
      location: data.location,
      status: data.status,
      quizId: data.quiz_id,
      summary: data.summary,
    }
  }

  async getQuizByJob(jobId: string): Promise<Quiz> {
    const jobQuery = `
      SELECT id, status, quiz_id 
      FROM jobs 
      WHERE id = $1
    `
    const { rows: jobRows } = await this.db.query(jobQuery, [jobId])

    if (jobRows.length === 0) {
      throw new NotFoundException('Job not found')
    }

    const job = jobRows[0]
    if (job.status !== 'active' || !job.quiz_id) {
      throw new NotFoundException('Quiz not available for this job')
    }

    const quizQuery = `
      SELECT id, title, description, intro, time_limit_seconds, per_question_seconds
      FROM quizzes
      WHERE id = $1
    `
    const { rows: quizRows } = await this.db.query(quizQuery, [job.quiz_id])

    if (quizRows.length === 0) {
      throw new NotFoundException('Quiz not found')
    }

    const quizData = quizRows[0]

    const questionsQuery = `
      SELECT id, prompt, options, correct_index, position
      FROM questions
      WHERE quiz_id = $1
      ORDER BY position ASC
    `
    const { rows: questionsRows } = await this.db.query(questionsQuery, [
      job.quiz_id,
    ])

    const questions: QuizQuestion[] = questionsRows.map((question) => {
      const rawOptions = Array.isArray(question.options) ? question.options : []
      const options = rawOptions.map((option) => String(option))
      const shuffledOptions = this.shuffle(
        options.map((option, index) => ({
          option,
          index,
        })),
      )
      const correctIndex = shuffledOptions.findIndex(
        (entry: { option: string; index: number }) =>
          entry.index === (question.correct_index ?? 0),
      )

      return {
        id: question.id,
        prompt: question.prompt,
        options: shuffledOptions.map(
          (entry: { option: string; index: number }) => entry.option,
        ),
        correctIndex: correctIndex === -1 ? 0 : correctIndex,
      }
    })

    const randomizedQuestions = this.shuffle(questions)

    return {
      id: quizData.id,
      title: quizData.title,
      description: quizData.description,
      intro: quizData.intro ?? [],
      timeLimitSeconds: quizData.time_limit_seconds,
      perQuestionSeconds: quizData.per_question_seconds,
      questions: randomizedQuestions,
    }
  }
}
