import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { GetAllCommunitiesQuery } from "src/modules/communities/queries/get-all.query";
import { Identity } from "../auth/identity";
import { JoinCommunityCommand } from "./commands/join-community.command";
import { LeaveCommunityCommand } from "./commands/leave-community.command";
import { GetByIdCommunityQuery } from "./queries/get-by-id.query";

@Controller("communities")
export class CommunitiesController {
  constructor(
    private readonly getAllCommunities: GetAllCommunitiesQuery,
    private readonly getByIdCommunityQuery: GetByIdCommunityQuery,
    private readonly joinCommunity: JoinCommunityCommand,
    private readonly leaveCommunity: LeaveCommunityCommand,
  ) {}

  @Get()
  getAll() {
    return this.getAllCommunities.execute(Identity.STUDENT);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getByIdCommunityQuery.execute(Identity.STUDENT, id);
  }

  @Post(":id/join")
  join(@Param("id") id) {
    return this.joinCommunity.execute(Identity.STUDENT, id);
  }

  @Post(":id/leave")
  leave(@Param("id") id) {
    return this.leaveCommunity.execute(Identity.STUDENT, id);
  }
}
