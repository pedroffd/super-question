import { Injectable, NotFoundException } from '@nestjs/common'
import { jobs, quizzes } from './quiz.data'

@Injectable()
export class QuizService {
  getJobs() {
    return jobs
  }

  getJob(jobId: string) {
    const job = jobs.find((item) => item.id === jobId)
    if (!job) {
      throw new NotFoundException('Job not found')
    }
    return job
  }

  getQuizByJob(jobId: string) {
    const job = this.getJob(jobId)
    if (job.status !== 'active' || !job.quizId) {
      throw new NotFoundException('Quiz not available for this job')
    }
    const quiz = quizzes.find((item) => item.id === job.quizId)
    if (!quiz) {
      throw new NotFoundException('Quiz not found')
    }
    return quiz
  }
}
