import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { GetAllCoachesQuery } from "src/modules/coaches/queries/get-all.query";
import { GetCoachByIdQuery } from "./queries/get-by-id.query";
import { ApproveMentorshipRequestCommand } from "./commands/approve-mentorship-request.command";
import { AuthenticatedUser } from "../auth/decorators/authenticated-user.decorator";
import { EditCoachCommand } from "./commands/edit-coach.command";

@Controller("coaches")
export class CoachesController {
  constructor(
    private readonly getAllCoaches: GetAllCoachesQuery,
    private readonly getCoachByIdQuery: GetCoachByIdQuery,
    private readonly approveMentorshipRequestCommand: ApproveMentorshipRequestCommand,
    private readonly editCoachCommand: EditCoachCommand
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
  approveMentorshipRequest(
    @Body("student") student: string,
    @AuthenticatedUser() authenticatedUser: string
  ) {
    return this.approveMentorshipRequestCommand.execute(authenticatedUser, student);
  }

  @Post("self")
  edit(
    @AuthenticatedUser() authenticatedCoach: string,
    @Body("name") name: string,
    @Body("languages") languages: string[],
    @Body("programmingLanguages") programmingLanguages: string[],
    @Body("location") location: any
  ) {
    return this.editCoachCommand.execute(
      authenticatedCoach,
      {
        name,
        languages,
        programmingLanguages,
        location,
      }
    );
  }
}
