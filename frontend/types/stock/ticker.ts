import { HistoricalData } from "./historical-data";

export interface Ticker {
  historicalData: HistoricalData[];
  id: number;
  name: string;
  symbol: string;
  updatedAt: Date;
}
