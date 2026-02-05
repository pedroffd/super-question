import { Controller, Get, Param } from '@nestjs/common'
import { QuizService } from './quiz.service'

@Controller('api')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('jobs')
  async getJobs() {
    return this.quizService.getJobs()
  }

  @Get('jobs/:jobId')
  async getJob(@Param('jobId') jobId: string) {
    return this.quizService.getJob(jobId)
  }

  @Get('jobs/:jobId/quiz')
  async getQuiz(@Param('jobId') jobId: string) {
    return this.quizService.getQuizByJob(jobId)
  }
}
