import { Fair } from "src/domain/fair/Fair";
import Students from "./students";
import Coaches from "./coaches";

export class Fairs {
  public readonly data: Fair[];

  constructor() {
    const fair = Fair.createNew({
      startAt: new Date(2023, 4, 20),
      endAt: new Date(2023, 4, 21),
      title: "Weekly Fair",
      community: "c/Vue",
    });

    Students.data.forEach(student => fair.joinAsStudent(student));
    Coaches.data.forEach(coach => fair.joinAsCoach(coach));

    this.data = [fair];
  }
}

export default new Fairs();
