import { Fair } from "src/domain/fair/Fair";
import Students from "./students";
import Coaches from "./coaches";

export class Fairs {
  public readonly data: Fair[];

  constructor() {
    const fair1 = Fair.createNew({
      community: "vue",
    });

    Coaches.data.forEach(coach => fair1.join(coach));

    const fair2 = Fair.createNew({
      community: "react",
    });

    Coaches.data.forEach(coach => fair2.join(coach));

    this.data = [fair1, fair2];
  }
}

export default new Fairs();
