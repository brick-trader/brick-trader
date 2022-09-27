import { Module } from "@nestjs/common";
import { PrismaModule } from "nestjs-prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HistoricalDataModule } from "./historical-data/historical-data.module";
import { PrismaService } from "./prisma.service";
import { TickerModule } from "./ticker/ticker.module";

@Module({
  imports: [TickerModule, HistoricalDataModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
