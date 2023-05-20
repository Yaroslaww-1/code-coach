import { Injectable } from "@nestjs/common";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";
import { Location } from "src/domain/user/Location";

@Injectable()
export class EditStudentCommand {
  constructor (
    private readonly studentRepository: StudentRepository
  ) {}

  async execute(
    authenticatedStudentId: string,
    student: {
      languages: string[],
      programmingLanguages: string[],
      location: { city: string, country: string },
      name: string
    }
  ) {
    const s = await this.studentRepository.findOne(authenticatedStudentId);

    const { languages, programmingLanguages, name, location } = student;

    s.edit({ languages, programmingLanguages, name, location: Location.createNew(location.country, location.city) });

    await this.studentRepository.save(s);
  }
}
