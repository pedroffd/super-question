import { Module } from '@nestjs/common'
import { SupabaseModule } from '../supabase/supabase.module'
import { QuizController } from './quiz.controller'
import { QuizService } from './quiz.service'

@Module({
  imports: [SupabaseModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
