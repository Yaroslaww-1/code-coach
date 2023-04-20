import { Controller, Get } from "@nestjs/common";
import { GetAllCommunitiesQuery } from "src/modules/communities/queries/get-all.query";

@Controller("communities")
export class CommunitiesController {
  constructor(
    private readonly getAllCommunities: GetAllCommunitiesQuery
  ) {}

  @Get()
  getAll() {
    return this.getAllCommunities.execute();
  }
}
