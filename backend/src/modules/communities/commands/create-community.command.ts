import { BadRequestException, Injectable } from "@nestjs/common";
import { Community } from "src/domain/community/Community";
import { Fair } from "src/domain/fair/Fair";
import { CommunityRepository } from "src/infrastructure/persistance/repositories/community.repository";
import { FairRepository } from "src/infrastructure/persistance/repositories/fair.repository";

@Injectable()
export class CreateCommunityCommand {
  constructor (
    private readonly communityRepository: CommunityRepository,
    private readonly fairRepository: FairRepository
  ) {}

  async execute(userId: string, name: string, description: string) {
    const exists = await this.communityRepository.findOne(name);
    if (exists) throw new BadRequestException("Community with this name already exists!");

    const fair = Fair.createNew({ community: name });

    const community = Community.createNew(
      { name, description, logo: "https://codecoach.s3.eu-central-1.amazonaws.com/data/images/new-community.png" },
      fair)

    await this.fairRepository.save(fair);
    await this.communityRepository.save(community);
  }
}
