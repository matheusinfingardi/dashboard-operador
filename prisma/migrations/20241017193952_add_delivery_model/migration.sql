/*
  Warnings:

  - You are about to drop the `DroneMission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DroneMission";

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);
