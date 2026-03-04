import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common'
// biome-ignore lint/style/useImportType: Nest DI needs runtime import
import { ConfigService } from '@nestjs/config'
import { Pool, type QueryResult, type QueryResultRow } from 'pg'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get<string>('DATABASE_URL')
    this.pool = new Pool({
      connectionString,
    })
  }

  async onModuleInit() {
    // Test the connection
    await this.pool.query('SELECT 1')
  }

  async onModuleDestroy() {
    await this.pool.end()
  }

  async query<
    // biome-ignore lint/suspicious/noExplicitAny: pg handles results as any
    T extends QueryResultRow = any,
  >(
    text: string,
    // biome-ignore lint/suspicious/noExplicitAny: pg takes any as params
    params?: any[],
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(text, params)
  }
}
