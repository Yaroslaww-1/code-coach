import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { GetAllCommunitiesQuery } from "src/modules/communities/queries/get-all.query";
import { Identity } from "../auth/identity";
import { JoinCommunityCommand } from "./commands/join-community.command";
import { LeaveCommunityCommand } from "./commands/leave-community.command";

@Controller("communities")
export class CommunitiesController {
  constructor(
    private readonly getAllCommunities: GetAllCommunitiesQuery,
    private readonly joinCommunity: JoinCommunityCommand,
    private readonly leaveCommunity: LeaveCommunityCommand,
  ) {}

  @Get()
  getAll() {
    return this.getAllCommunities.execute(Identity.STUDENT);
  }

  @Post(":communityId/join")
  join(@Param("communityId") communityId) {
    return this.joinCommunity.execute(Identity.STUDENT, communityId);
  }

  @Post(":communityId/leave")
  leave(@Param("communityId") communityId) {
    return this.leaveCommunity.execute(Identity.STUDENT, communityId);
  }
}
