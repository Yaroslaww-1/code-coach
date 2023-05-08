import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { CommunitiesController } from "src/modules/communities/communities.controller";
import { GetAllCommunitiesQuery } from "src/modules/communities/queries/get-all.query";
import { AuthModule } from "../auth/auth.module";
import { JoinCommunityCommand } from "./commands/join-community.command";
import { LeaveCommunityCommand } from "./commands/leave-community.command";
import { GetByIdCommunityQuery } from "./queries/get-by-id.query";

@Module({
  imports: [InfrastructureModule, AuthModule],
  controllers: [CommunitiesController],
  providers: [GetAllCommunitiesQuery, GetByIdCommunityQuery, JoinCommunityCommand, LeaveCommunityCommand],
})
export class CommunitiesModule {}
