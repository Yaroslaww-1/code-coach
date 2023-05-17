import { Location } from "src/domain/user/Location";
import { Coach } from "src/domain/user/coach/Coach";
import { WorkExperience } from "src/domain/user/WorkExperience";

class Coaches {
  public readonly data: Coach[];

  constructor() {
    this.data = [
      Coach.createNew({
        email: "abe.ryland@gmail.com",
        name: "Abe Ryland",
        programmingLanguages: ["Java", "Kotlin"],
        languages: ["English"],
        workExperience: [
          WorkExperience.createFinished("Amazon", new Date(2015, 1), new Date(2022, 10)),
          WorkExperience.createUnfinished("Netflix", new Date(2023, 3)),
        ],
        location: Location.createNew("UK", "London"),
      }),
      Coach.createNew({
        email: "abigail@gmail.com",
        name: "Abigail McGinty",
        programmingLanguages: ["C++", "Rust"],
        languages: ["English", "Spanish"],
        workExperience: [
          WorkExperience.createUnfinished("Google", new Date(2010, 5)),
        ],
        location: Location.createNew("USA", "San Francisco"),
      }),
      Coach.createNew({
        email: "adela.marchmont@gmail.com",
        name: "Adela Marchmont",
        programmingLanguages: ["Python"],
        languages: ["English", "French"],
        workExperience: [
          WorkExperience.createUnfinished("Microsoft", new Date(2017, 10)),
        ],
        location: Location.createNew("USA", "Seattle"),
      }),
    ]
  }
}

export default new Coaches();
