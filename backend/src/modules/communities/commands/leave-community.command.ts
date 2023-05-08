import { Injectable } from "@nestjs/common";
import { CommunityRepository } from "src/infrastructure/persistance/repositories/community.repository";

@Injectable()
export class LeaveCommunityCommand {
  constructor (
    private readonly communityRepository: CommunityRepository,
  ) {}

  async execute(userId: string, communityId: string) {
    const community = await this.communityRepository.findOne(communityId);

    community.leave(userId);

    await this.communityRepository.save(community);
  }
}
