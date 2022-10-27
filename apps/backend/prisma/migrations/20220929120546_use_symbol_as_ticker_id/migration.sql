/*
  Warnings:

  - You are about to drop the column `tickerId` on the `HistoricalData` table. All the data in the column will be lost.
  - The primary key for the `Ticker` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ticker` table. All the data in the column will be lost.
  - Added the required column `tickerSymbol` to the `HistoricalData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HistoricalData" DROP CONSTRAINT "HistoricalData_tickerId_fkey";

-- AlterTable
ALTER TABLE "HistoricalData" DROP COLUMN "tickerId",
ADD COLUMN     "tickerSymbol" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticker" DROP CONSTRAINT "Ticker_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Ticker_pkey" PRIMARY KEY ("symbol");

-- AddForeignKey
ALTER TABLE "HistoricalData" ADD CONSTRAINT "HistoricalData_tickerSymbol_fkey" FOREIGN KEY ("tickerSymbol") REFERENCES "Ticker"("symbol") ON DELETE RESTRICT ON UPDATE CASCADE;
