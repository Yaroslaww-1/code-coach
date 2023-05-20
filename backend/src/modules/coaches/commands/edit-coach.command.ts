import { Injectable } from "@nestjs/common";
import { Location } from "src/domain/user/Location";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";

@Injectable()
export class EditCoachCommand {
  constructor (
    private readonly coachRepository: CoachRepository
  ) {}

  async execute(
    authenticatedCoachId: string,
    coach: {
      languages: string[],
      programmingLanguages: string[],
      location: { city: string, country: string },
      name: string
    }
  ) {
    const c = await this.coachRepository.findOne(authenticatedCoachId);

    const { languages, programmingLanguages, name, location } = coach;

    c.edit({
      languages,
      programmingLanguages,
      name,
      location: Location.createNew(location.country, location.city),
      workExperience: c.workExperience,
    });

    await this.coachRepository.save(c);
  }
}
