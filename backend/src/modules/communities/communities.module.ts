import { Module } from "@nestjs/common";
import { CommunitiesController } from "src/modules/communities/communities.controller";
import { GetAllCommunitiesQuery } from "src/modules/communities/queries/get-all.query";

@Module({
  imports: [],
  controllers: [CommunitiesController],
  providers: [GetAllCommunitiesQuery],
})
export class CommunitiesModule {}
