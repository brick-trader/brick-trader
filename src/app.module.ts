import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HistoricalDataController } from "./historical-data/historical-data.controller";
import { HistoricalDataService } from "./historical-data/historical-data.service";
import { PrismaService } from "./prisma.service";
import { TickerController } from "./ticker/ticker.controller";
import { TickerService } from "./ticker/ticker.service";

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: { log: ["info"] },
        explicitConnect: true,
      },
    }),
  ],
  controllers: [AppController, TickerController, HistoricalDataController],
  providers: [AppService, PrismaService, TickerService, HistoricalDataService],
})
export class AppModule {}
