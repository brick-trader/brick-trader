import { Injectable, InternalServerErrorException } from "@nestjs/common";
import yahooFinance from "yahoo-finance2";

@Injectable()
export class SearchService {
  public async search(query: string) {
    if (!query) query = "";
    try {
      return (
        await yahooFinance.search(query, {
          quotesCount: 6,
          newsCount: 0,
        })
      ).quotes.filter((quote) => quote.symbol !== undefined);
    } catch (e) {
      throw new InternalServerErrorException("Failed to search for symbols");
    }
  }
}
