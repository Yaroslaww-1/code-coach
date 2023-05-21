import { Select } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDbService } from "src/infrastructure/aws/dynamodb.service";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { FairRepository } from "src/infrastructure/persistance/repositories/fair.repository";

@Injectable()
export class JoinFairCommand {
  constructor (
    private readonly fairRepository: FairRepository,
    private readonly coachRepository: CoachRepository
  ) {}

  async execute(authenticatedCoachId: string, community: string) {
    const fair = await this.fairRepository.findOne(community);
    const coach = await this.coachRepository.findOne(authenticatedCoachId);

    fair.join(coach);

    await this.fairRepository.save(fair);
  }
}
