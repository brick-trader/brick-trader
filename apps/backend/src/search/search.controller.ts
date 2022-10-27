import { Controller, Get, Param, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("search")
  public async search(@Query("query") query: string) {
    return await this.searchService.search(query);
  }
}
