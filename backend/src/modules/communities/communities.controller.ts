import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { GetAllCommunitiesQuery } from "src/modules/communities/queries/get-all.query";
import { JoinCommunityCommand } from "./commands/join-community.command";
import { LeaveCommunityCommand } from "./commands/leave-community.command";
import { GetByIdCommunityQuery } from "./queries/get-by-id.query";
import { AuthenticatedUser } from "../auth/decorators/authenticated-user.decorator";

@Controller("communities")
export class CommunitiesController {
  constructor(
    private readonly getAllCommunities: GetAllCommunitiesQuery,
    private readonly getByIdCommunityQuery: GetByIdCommunityQuery,
    private readonly joinCommunity: JoinCommunityCommand,
    private readonly leaveCommunity: LeaveCommunityCommand,
  ) {}

  @Get()
  getAll(@AuthenticatedUser() authenticatedUser: string) {
    return this.getAllCommunities.execute(authenticatedUser);
  }

  @Get(":id")
  getById(@Param("id") id: string, @AuthenticatedUser() authenticatedUser: string) {
    return this.getByIdCommunityQuery.execute(authenticatedUser, id);
  }

  @Post(":id/join")
  join(@Param("id") id, @AuthenticatedUser() authenticatedUser: string) {
    return this.joinCommunity.execute(authenticatedUser, id);
  }

  @Post(":id/leave")
  leave(@Param("id") id, @AuthenticatedUser() authenticatedUser: string) {
    return this.leaveCommunity.execute(authenticatedUser, id);
  }
}
