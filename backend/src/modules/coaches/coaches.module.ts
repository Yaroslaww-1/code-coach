import { Module } from "@nestjs/common";
import { CoachesController } from "src/modules/coaches/coaches.controller";
import { GetAllCoachesQuery } from "src/modules/coaches/queries/get-all.query";

@Module({
  imports: [],
  controllers: [CoachesController],
  providers: [GetAllCoachesQuery],
})
export class CoachesModule {}
