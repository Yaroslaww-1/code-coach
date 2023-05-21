import { Injectable } from "@nestjs/common";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";

@Injectable()
export class RequestMentorshipCommand {
  constructor (
    private readonly coachRepository: CoachRepository,
  ) {}

  async execute(authenticatedStudentId: string, coachId: string) {
    const coach = await this.coachRepository.findOne(coachId);
    coach.applyForMentorship(authenticatedStudentId);
    await this.coachRepository.save(coach);
  }
}
