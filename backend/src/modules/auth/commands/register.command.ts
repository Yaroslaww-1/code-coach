import { Injectable } from "@nestjs/common";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { Coach } from "src/domain/user/coach/Coach";
import * as bcrypt from "bcrypt";
import { Student } from "src/domain/user/student/Student";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";

@Injectable()
export class RegisterCommand {
  constructor (
    private readonly coachRepository: CoachRepository,
    private readonly studentRepository: StudentRepository
  ) {}

  async execute(email: string, password: string, role: string) {
    const passwordHashed = await bcrypt.hash(password, 10);

    if (role.toLowerCase() === "coach") {
      const coach = Coach.createNew({ email, passwordHashed });
      await this.coachRepository.save(coach);
    }

    if (role.toLowerCase() === "student") {
      const student = Student.createNew({ email, passwordHashed });
      await this.studentRepository.save(student);
    }
  }
}
