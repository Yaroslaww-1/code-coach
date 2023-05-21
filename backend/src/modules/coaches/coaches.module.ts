import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { CoachesController } from "src/modules/coaches/coaches.controller";
import { GetAllCoachesQuery } from "src/modules/coaches/queries/get-all.query";
import { GetCoachByIdQuery } from "./queries/get-by-id.query";
import { ApproveMentorshipRequestCommand } from "./commands/approve-mentorship-request.command";
import { EditCoachCommand } from "./commands/edit-coach.command";
import { RequestMentorshipCommand } from "./commands/request-mentorship.command";

@Module({
  imports: [InfrastructureModule],
  controllers: [CoachesController],
  providers: [
    GetAllCoachesQuery,
    GetCoachByIdQuery,
    ApproveMentorshipRequestCommand,
    EditCoachCommand,
    RequestMentorshipCommand],
})
export class CoachesModule {}
