import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HistoricalDataService } from "./historical_data.service";
import { PrismaService } from "./prisma.service";
import { TickerService } from "./ticker.service";

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        prismaOptions: { log: ["info"] },
        explicitConnect: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, TickerService, HistoricalDataService],
})
export class AppModule {}
