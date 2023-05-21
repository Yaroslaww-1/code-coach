import { Controller, Get, Param, Post } from "@nestjs/common";
import { AuthenticatedUser } from "../auth/decorators/authenticated-user.decorator";
import { GetByCommunityFairQuery } from "./queries/get-by-community.query";
import { JoinFairCommand } from "./commands/join-fair.command";
import { LeaveFairCommand } from "./commands/leave-fair.command";
import { GetAllMembersQuery } from "./queries/get-all-members.query";
import { GetAllMembersRankedQuery } from "./queries/get-all-members-ranked.query";

@Controller("fairs")
export class FairsController {
  constructor(
    private readonly getByCommunityFairQuery: GetByCommunityFairQuery,
    private readonly getAllMembersQuery: GetAllMembersQuery,
    private readonly getAllMembersRankedQuery: GetAllMembersRankedQuery,
    private readonly joinFairCommand: JoinFairCommand,
    private readonly leaveFairCommand: LeaveFairCommand,
  ) {}

  @Get(":community")
  getByCommunity(@AuthenticatedUser() user: string, @Param("community") community: string) {
    return this.getByCommunityFairQuery.execute(user, community);
  }

  @Get("all/members")
  getAllMembers(@AuthenticatedUser() student: string) {
    return this.getAllMembersQuery.execute(student);
  }

  @Get("all/members/ranked")
  getAllMembersRanked(@AuthenticatedUser() student: string) {
    return this.getAllMembersRankedQuery.execute(student);
  }

  @Post(":community/join")
  join(@Param("community") community: string, @AuthenticatedUser() authenticatedUser: string) {
    return this.joinFairCommand.execute(authenticatedUser, community);
  }

  @Post(":community/leave")
  leave(@Param("community") community: string, @AuthenticatedUser() authenticatedUser: string) {
    return this.leaveFairCommand.execute(authenticatedUser, community);
  }
}
