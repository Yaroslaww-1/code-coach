import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { CoachesController } from "src/modules/coaches/coaches.controller";
import { GetAllCoachesQuery } from "src/modules/coaches/queries/get-all.query";
import { GetCoachByIdQuery } from "./queries/get-by-id.query";

@Module({
  imports: [InfrastructureModule],
  controllers: [CoachesController],
  providers: [GetAllCoachesQuery, GetCoachByIdQuery],
})
export class CoachesModule {}
