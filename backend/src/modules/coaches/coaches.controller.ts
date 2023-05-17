import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { GetAllCoachesQuery } from "src/modules/coaches/queries/get-all.query";
import { GetCoachByIdQuery } from "./queries/get-by-id.query";
import { ApproveMentorshipRequestCommand } from "./commands/approve-mentorship-request.command";
import { Identity } from "../auth/identity";

@Controller("coaches")
export class CoachesController {
  constructor(
    private readonly getAllCoaches: GetAllCoachesQuery,
    private readonly getCoachByIdQuery: GetCoachByIdQuery,
    private readonly approveMentorshipRequestCommand: ApproveMentorshipRequestCommand,
  ) {}

  @Get()
  getAll() {
    return this.getAllCoaches.execute();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getCoachByIdQuery.execute(id);
  }

  @Post("approveMentorshipRequest")
  approveMentorshipRequest(@Body("student") student: string) {
    return this.approveMentorshipRequestCommand.execute(Identity.COACH, student);
  }
}
