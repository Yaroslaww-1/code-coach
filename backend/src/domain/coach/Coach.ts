import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { Location } from "./Location";
import { WorkExperience } from "./WorkExperience";

export class Coach extends Entity<Coach> {
  public email: string;
  public name: string;
  public programmingLanguages: string[];
  public languages: string[];
  public workExperience: WorkExperience[];
  public location: Location;

  public static createNew(coach: RemoveMethods<Coach>) {
    return new Coach(coach)
  }

  public yearsOfExperience() {
    return Math.floor(this.workExperience.map(w => w.durationInMonths())
      .reduce((d1, d2) => d1 + d2, 0) / 12);
  }
}