import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HistoricalDataModule } from "./historical-data/historical-data.module";
import { TickerModule } from "./ticker/ticker.module";
import { SearchModule } from "./search/search.module";

@Module({
  imports: [TickerModule, HistoricalDataModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
