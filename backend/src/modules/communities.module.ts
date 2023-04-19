import { Module } from "@nestjs/common";
import { CommunitiesController } from "src/controllers/communities.controller";
import { GetAllCommunitiesQuery } from "src/queries/communities/get-all.query";

@Module({
  imports: [],
  controllers: [CommunitiesController],
  providers: [GetAllCommunitiesQuery],
})
export class CommunitiesModule {}
