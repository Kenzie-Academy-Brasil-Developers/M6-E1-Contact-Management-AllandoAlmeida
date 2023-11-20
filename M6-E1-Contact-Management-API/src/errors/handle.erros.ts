/* /* import { AppError } from './AppError.errors'
import { NextFunction, Response, Request } from 'express'
import 'express-async-errors'

export const HandleError = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message })
  }
  console.log(err)
  return response.status(500).json({ message: 'Internal Server Error' })
}


import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { AppError } from './app-error.errors'
import { Response } from 'express'

@Catch(AppError)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const status = exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      message: exception.message,
    })
  }
}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppExceptionFilter } from './path-para-seu-filtro/app-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Registra o filtro global de exceções
  app.useGlobalFilters(new AppExceptionFilter())

  await app.listen(3000)
}
bootstrap()

import { AppError } from './path-para-seu-filtro/app-error.errors'

async function exemploComPrisma() {
  try {
    // Lógica com o Prisma que pode lançar erros
    // Exemplo: const resultado = await prisma.modelo.create(...);
  } catch (error) {
    if (error instanceof AppError) {
      // Trata o erro de acordo com a lógica do seu código
      console.error(error.message)
    } else {
      // Trata outros tipos de erro
      console.error('Erro inesperado:', error)
    }
  }
}
 */
