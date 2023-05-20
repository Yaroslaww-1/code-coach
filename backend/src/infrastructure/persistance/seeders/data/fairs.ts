import { Fair } from "src/domain/fair/Fair";
import Students from "./students";
import Coaches from "./coaches";

export class Fairs {
  public readonly data: Fair[];

  constructor() {
    const fair = Fair.createNew({
      community: "vue",
    });

    Coaches.data.forEach(coach => fair.join(coach));

    this.data = [fair];
  }
}

export default new Fairs();
