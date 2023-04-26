import { Controller, Get } from "@nestjs/common";
import { GetAllFairsQuery } from "./queries/get-all-fairs.query";

@Controller("fairs")
export class FairsController {
  constructor(
    private readonly getAllFairsQuery: GetAllFairsQuery,
  ) {}

  @Get()
  getAll() {
    return this.getAllFairsQuery.execute();
  }
}
