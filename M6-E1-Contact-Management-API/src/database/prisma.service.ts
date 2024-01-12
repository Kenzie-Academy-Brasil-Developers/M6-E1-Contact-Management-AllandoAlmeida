import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect()
      console.log('Connected to PrismaClient')
    } catch (error) {
      console.error('Error connecting to PrismaClient:', error)
      process.exit(1) // Encerra a aplicação em caso de falha na conexão
    }
  }
}
