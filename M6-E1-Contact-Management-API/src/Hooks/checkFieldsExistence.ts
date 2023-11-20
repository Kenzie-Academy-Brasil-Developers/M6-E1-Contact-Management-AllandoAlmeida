// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaClient, Prisma } from '@prisma/client'
import { ConflictException } from '@nestjs/common'

interface RepositoryWithFindFirst<T> {
  findFirst: (params: {
    where: T extends { where: infer U } ? U : Record<string, any>
  }) => Promise<any>
}

export const checkFieldsExistence = async (
  fieldName: string,
  value: string,
  errorMessage: string,
  repository: RepositoryWithFindFirst<PrismaClient>,
): Promise<void> => {
  const condition = { [fieldName]: value }
  const customerExists = await repository.findFirst({
    where: condition,
  })

  if (customerExists) {
    throw new ConflictException(errorMessage)
  }
}
