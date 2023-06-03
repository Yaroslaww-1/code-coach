import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { GetAllCommunitiesQuery } from "src/modules/communities/queries/get-all.query";
import { JoinCommunityCommand } from "./commands/join-community.command";
import { LeaveCommunityCommand } from "./commands/leave-community.command";
import { GetByIdCommunityQuery } from "./queries/get-by-id.query";
import { AuthenticatedUser } from "../auth/decorators/authenticated-user.decorator";
import { CreateCommunityCommand } from "./commands/create-community.command";

@Controller("communities")
export class CommunitiesController {
  constructor(
    private readonly getAllCommunities: GetAllCommunitiesQuery,
    private readonly getByIdCommunityQuery: GetByIdCommunityQuery,
    private readonly joinCommunity: JoinCommunityCommand,
    private readonly leaveCommunity: LeaveCommunityCommand,
    private readonly createCommunityCommand: CreateCommunityCommand,
  ) {}

  @Get()
  getAll(@AuthenticatedUser() authenticatedUser: string) {
    return this.getAllCommunities.execute(authenticatedUser);
  }

  @Get(":id")
  getById(@Param("id") id: string, @AuthenticatedUser() authenticatedUser: string) {
    return this.getByIdCommunityQuery.execute(authenticatedUser, id);
  }

  @Post("")
  create(@AuthenticatedUser() authenticatedUser: string, @Body("name") name: string, @Body("description") description: string) {
    return this.createCommunityCommand.execute(authenticatedUser, name, description);
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
