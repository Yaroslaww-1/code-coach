import { Controller, Get } from "@nestjs/common";
import { GetAllCoachesQuery } from "src/queries/coaches/get-all.query";

@Controller("coaches")
export class CoachesController {
  constructor(
    private readonly getAllCoaches: GetAllCoachesQuery
  ) {}

  @Get()
  getAll() {
    return this.getAllCoaches.execute();
  }
}
