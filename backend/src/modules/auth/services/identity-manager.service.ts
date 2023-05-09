import { Injectable } from "@nestjs/common";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { Student } from "src/domain/user/student/Student";
import { Coach } from "src/domain/user/coach/Coach";

@Injectable()
export class IdentityManagerService {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly coachRepository: CoachRepository
  ) {}

  async getAuthenticatedUser(authenticatedUserId: string): Promise<Coach | Student> {
    return this.studentRepository.findOne(authenticatedUserId);
  }
}
