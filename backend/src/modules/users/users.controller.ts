import { Controller, Get, Param } from "@nestjs/common";
import { GetUserByIdQuery } from "./queries/get-by-id.query";
import { AuthenticatedUser } from "../auth/decorators/authenticated-user.decorator";

@Controller("users")
export class UsersController {
  constructor(
    private readonly getUserByIdQuery: GetUserByIdQuery
  ) {}

  @Get("current")
  getCurrent(@AuthenticatedUser() authenticatedUser: string) {
    return this.getUserByIdQuery.execute(authenticatedUser);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getUserByIdQuery.execute(id);
  }
}
