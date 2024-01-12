import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as path from 'path'

const dataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}')
  const migrationPath: string = path.join(__dirname, './migrations/**.{ts,js}')

  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
  }
}

export const AppDataSource: DataSource = new DataSource(dataSourceConfig())
