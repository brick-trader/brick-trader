import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { PrismaService } from "src/prisma.service";
import { HistoricalDataController } from "./historical-data.controller";
import { HistoricalDataService } from "./historical-data.service";

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: { log: ["info"] },
        explicitConnect: true,
      },
    }),
  ],
  controllers: [HistoricalDataController],
  providers: [HistoricalDataService, PrismaService],
})
export class HistoricalDataModule {}
