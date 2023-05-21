import { Coach } from "src/domain/user/coach/Coach";
import * as bcrypt from "bcrypt";
import { WorkExperience } from "src/domain/user/WorkExperience";
import { Location } from "src/domain/user/Location";

class Coaches {
  public readonly data: Coach[];

  constructor() {
    // this.data = [
    //   Coach.createNew({
    //     email: "abe.ryland@gmail.com",
    //     name: "Abe Ryland",
    //     programmingLanguages: ["Java", "Kotlin"],
    //     languages: ["English"],
    //     workExperience: [
    //       WorkExperience.createFinished("Amazon", new Date(2015, 1), new Date(2022, 10)),
    //       WorkExperience.createUnfinished("Netflix", new Date(2023, 3)),
    //     ],
    //     location: Location.createNew("UK", "London"),
    //   }),
    //   Coach.createNew({
    //     email: "abigail@gmail.com",
    //     name: "Abigail McGinty",
    //     programmingLanguages: ["C++", "Rust"],
    //     languages: ["English", "Spanish"],
    //     workExperience: [
    //       WorkExperience.createUnfinished("Google", new Date(2010, 5)),
    //     ],
    //     location: Location.createNew("USA", "San Francisco"),
    //   }),
    //   Coach.createNew({
    //     email: "adela.marchmont@gmail.com",
    //     name: "Adela Marchmont",
    //     programmingLanguages: ["Python"],
    //     languages: ["English", "French"],
    //     workExperience: [
    //       WorkExperience.createUnfinished("Microsoft", new Date(2017, 10)),
    //     ],
    //     location: Location.createNew("USA", "Seattle"),
    //   }),
    // ]

    const coach1 = Coach.createNew({
      email: "abe.ryland@gmail.com",
      passwordHashed: bcrypt.hashSync("abe@coach", 10),
    });
    coach1.edit({
      name: "Abe Ryland",
      programmingLanguages: ["Java", "Kotlin"],
      languages: ["English"],
      workExperience: [
        WorkExperience.createFinished("Amazon", new Date(2015, 1), new Date(2022, 10)),
        WorkExperience.createUnfinished("Netflix", new Date(2023, 3)),
      ],
      location: Location.createNew("UK", "London"),
    });

    const coach2 = Coach.createNew({
      email: "abigail@gmail.com",
      passwordHashed: bcrypt.hashSync("abigail@coach", 10),
    });
    coach2.edit({
      name: "Abigail McGinty",
      programmingLanguages: ["C++", "Rust"],
      languages: ["English", "Spanish"],
      workExperience: [
        WorkExperience.createUnfinished("Google", new Date(2010, 5)),
      ],
      location: Location.createNew("USA", "San Francisco"),
    });

    const coach3 = Coach.createNew({
      email: "adela.marchmont@gmail.com",
      passwordHashed: bcrypt.hashSync("adela@coach", 10),
    });
    coach3.edit({
      name: "Adela Marchmont",
      programmingLanguages: ["Python"],
      languages: ["English", "French"],
      workExperience: [
        WorkExperience.createUnfinished("Microsoft", new Date(2017, 10)),
      ],
      location: Location.createNew("USA", "Seattle"),
    });

    const coach4 = Coach.createNew({
      email: "carl.reiter@gmail.com",
      passwordHashed: bcrypt.hashSync("carl@coach", 10),
    });
    coach4.edit({
      name: "Carl Reiter",
      programmingLanguages: ["Python", "C++"],
      languages: ["English", "Japanese"],
      workExperience: [
        WorkExperience.createUnfinished("Tesla", new Date(2018, 10)),
      ],
      location: Location.createNew("USA", "San Francisco"),
    });

    const coach5 = Coach.createNew({
      email: "carlotta.adams@gmail.com",
      passwordHashed: bcrypt.hashSync("carlotta@coach", 10),
    });
    coach5.edit({
      name: "Carlotta Adams",
      programmingLanguages: ["C++", "Assembly"],
      languages: ["English", "German"],
      workExperience: [
        WorkExperience.createUnfinished("Mercedes", new Date(2012, 8)),
      ],
      location: Location.createNew("Germany", "Berlin"),
    });
        
    this.data = [coach1, coach2, coach3, coach4, coach5];
  }
}

export default new Coaches();
