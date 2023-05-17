import { Injectable } from "@nestjs/common";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";

@Injectable()
export class ApproveMentorshipRequestCommand {
  constructor (
    private readonly coachRepository: CoachRepository
  ) {}

  async execute(authenticatedCoachId: string, studentId: string) {
    const coach = await this.coachRepository.findOne(authenticatedCoachId);

    coach.approveMentorship(studentId);

    await this.coachRepository.save(coach);

    return coach.students.filter(s => s.student === studentId)[0];
  }
}
