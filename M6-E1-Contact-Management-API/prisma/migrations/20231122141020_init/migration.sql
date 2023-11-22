/*
  Warnings:

  - You are about to drop the `ContactToCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContactToCustomer" DROP CONSTRAINT "ContactToCustomer_contactId_fkey";

-- DropForeignKey
ALTER TABLE "ContactToCustomer" DROP CONSTRAINT "ContactToCustomer_customerId_fkey";

-- DropTable
DROP TABLE "ContactToCustomer";

-- CreateTable
CREATE TABLE "contactToCustomer" (
    "customerId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contactToCustomer_pkey" PRIMARY KEY ("customerId","contactId")
);

-- AddForeignKey
ALTER TABLE "contactToCustomer" ADD CONSTRAINT "contactToCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contactToCustomer" ADD CONSTRAINT "contactToCustomer_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
