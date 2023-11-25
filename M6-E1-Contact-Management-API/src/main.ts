import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
    new ValidationPipe({
      transform: true,
      transformOptions: {
        groups: ['hashingPassword'],
      },
    }),
  )
  app.use

  const config = new DocumentBuilder()
    .setTitle('Contact-Management API')
    .setDescription(
      'Solução eficiente e intuitiva para cadastrar e gerenciamento de clientes e seus respectivos contatos',
    )
    .setVersion('0.0.1')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: false,
      docExpansion: 'list',
    },
  })
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
