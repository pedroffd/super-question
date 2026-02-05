import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

@Injectable()
export class SupabaseService {
  private client: SupabaseClient | null = null

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('SUPABASE_URL')
    const key =
      this.configService.get<string>('SUPABASE_SECRET_KEY') ??
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')

    if (url && key) {
      this.client = createClient(url, key, {
        auth: { persistSession: false },
      })
    }
  }

  getClient() {
    return this.client
  }
}
