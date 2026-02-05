import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
// biome-ignore lint/style/useImportType: Nest DI needs runtime import
import { SupabaseService } from '../supabase/supabase.service'
import { type JobCard, type Quiz, jobs, quizzes } from './quiz.data'

@Injectable()
export class QuizService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getJobs(): Promise<JobCard[]> {
    const client = this.supabaseService.getClient()
    if (!client) {
      throw new InternalServerErrorException('Supabase not configured')
    }

    const { data, error } = await client
      .from('jobs')
      .select('id,title,level,area,location,status,quiz_id,summary')
      .order('title', { ascending: true })

    if (error) {
      throw new InternalServerErrorException('Failed to load jobs')
    }

    return (data ?? []).map((job) => ({
      id: job.id,
      title: job.title,
      level: job.level,
      area: job.area,
      location: job.location,
      status: job.status,
      quizId: job.quiz_id ?? undefined,
      summary: job.summary,
    }))
  }

  async getJob(jobId: string): Promise<JobCard> {
    const client = this.supabaseService.getClient()
    if (!client) {
      throw new InternalServerErrorException('Supabase not configured')
    }

    const { data, error } = await client
      .from('jobs')
      .select('id,title,level,area,location,status,quiz_id,summary')
      .eq('id', jobId)
      .single()

    if (error || !data) {
      throw new NotFoundException('Job not found')
    }

    return {
      id: data.id,
      title: data.title,
      level: data.level,
      area: data.area,
      location: data.location,
      status: data.status,
      quizId: data.quiz_id ?? undefined,
      summary: data.summary,
    }
  }

  async getQuizByJob(jobId: string): Promise<Quiz> {
    const client = this.supabaseService.getClient()
    if (!client) {
      throw new InternalServerErrorException('Supabase not configured')
    }

    const { data, error } = await client
      .from('jobs')
      .select(
        'id,status,quiz_id,quiz:quizzes(id,title,description,intro,time_limit_seconds,per_question_seconds,questions:questions(id,prompt,options,correct_index,position))',
      )
      .eq('id', jobId)
      .single()

    if (error || !data) {
      throw new NotFoundException('Job not found')
    }

    const quizRecord = Array.isArray(data.quiz) ? data.quiz[0] : data.quiz

    if (data.status !== 'active' || !quizRecord) {
      throw new NotFoundException('Quiz not available for this job')
    }

    const questions = (quizRecord.questions ?? [])
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((question) => ({
        id: question.id,
        prompt: question.prompt,
        options: question.options ?? [],
        correctIndex: question.correct_index ?? 0,
      }))

    return {
      id: quizRecord.id,
      title: quizRecord.title,
      description: quizRecord.description,
      intro: quizRecord.intro ?? [],
      timeLimitSeconds: quizRecord.time_limit_seconds,
      perQuestionSeconds: quizRecord.per_question_seconds,
      questions,
    }
  }
}
