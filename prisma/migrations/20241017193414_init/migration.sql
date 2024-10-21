-- CreateTable
CREATE TABLE "DroneMission" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DroneMission_pkey" PRIMARY KEY ("id")
);
