-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "plu" TEXT NOT NULL,
    "stockId" INTEGER,
    "shopId" INTEGER,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
