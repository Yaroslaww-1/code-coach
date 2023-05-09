import { Controller, Get, Param } from "@nestjs/common";
import { GetUserByIdQuery } from "./queries/get-by-id.query";

@Controller("users")
export class UsersController {
  constructor(
    private readonly getUserByIdQuery: GetUserByIdQuery
  ) {}

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getUserByIdQuery.execute(id);
  }
}
