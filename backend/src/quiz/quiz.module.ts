import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { QuizController } from './quiz.controller'
import { QuizService } from './quiz.service'

@Module({
  imports: [DatabaseModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
