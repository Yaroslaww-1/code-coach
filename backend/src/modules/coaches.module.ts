import { Module } from "@nestjs/common";
import { CoachesController } from "src/controllers/coaches.controller";
import { GetAllCoachesQuery } from "src/queries/coaches/get-all.query";

@Module({
  imports: [],
  controllers: [CoachesController],
  providers: [GetAllCoachesQuery],
})
export class CoachesModule {}
