import { Injectable } from "@nestjs/common";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";

@Injectable()
export class RequestMentorshipCommand {
  constructor (
    private readonly coachRepository: CoachRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  async execute(authenticatedStudentId: string, coachId: string) {
    const coach = await this.coachRepository.findOne(coachId);
    coach.applyForMentorship(authenticatedStudentId);
    await this.coachRepository.save(coach);

    const student = await this.studentRepository.findOne(authenticatedStudentId);
    student.applyForMentorship(coachId);
    await this.studentRepository.save(student);
  }
}
