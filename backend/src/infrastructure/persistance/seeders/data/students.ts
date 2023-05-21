import { Location } from "src/domain/user/Location";
import { Student } from "src/domain/user/student/Student";
import * as bcrypt from "bcrypt";

class Students {
  public readonly data: Student[];

  constructor() {
    // this.data = [
    //   Student.createNew({
    //     email: "barbara.amory@gmail.com",
    //     name: "Barbara Amory",
    //     programmingLanguages: ["Python"],
    //     languages: ["English", "French"],
    //     location: Location.createNew("USA", "Washington"),
    //   }),
    //   Student.createNew({
    //     email: "barbara.franklin@gmail.com",
    //     name: "Barbara Franklin",
    //     programmingLanguages: ["Rust", "JS"],
    //     languages: ["English", "French"],
    //     location: Location.createNew("France", "Paris"),
    //   }),
    //   Student.createNew({
    //     email: "beatrice.lippincott@gmail.com",
    //     name: "Beatrice Lippincott",
    //     programmingLanguages: ["Scala"],
    //     languages: ["English", "Italian"],
    //     location: Location.createNew("Italy", "Rome"),
    //   }),
    //   Student.createNew({
    //     email: "bella.duveen@gmail.com", 
    //     name: "Bella Duveen",
    //     programmingLanguages: ["Haskell", "Scala"],
    //     languages: ["English"],
    //     location: Location.createNew("UK", "London"),
    //   }),
    // ]

    const student1 = Student.createNew({
      email: "barbara.amory@gmail.com",
      passwordHashed: bcrypt.hashSync("barbara@student", 10),
    });
    student1.edit({
      name: "Barbara Amory",
      programmingLanguages: ["Python"],
      languages: ["English", "French"],
      location: Location.createNew("USA", "Washington"),
    });

    const student2 = Student.createNew({
      email: "barbara.franklin@gmail.com",
      passwordHashed: bcrypt.hashSync("barbara@student", 10),
    });
    student2.edit({
      name: "Barbara Franklin",
      programmingLanguages: ["Rust", "JS"],
      languages: ["English", "French"],
      location: Location.createNew("France", "Paris"),
    });

    const student3 = Student.createNew({
      email: "beatrice.lippincott@gmail.com",
      passwordHashed: bcrypt.hashSync("beatrice@student", 10),
    });
    student3.edit({
      name: "Beatrice Lippincott",
      programmingLanguages: ["Scala", "Java"],
      languages: ["English", "Italian"],
      location: Location.createNew("Italy", "Rome"),
    });

    const student4 = Student.createNew({
      email: "bella.duveen@gmail.com",
      passwordHashed: bcrypt.hashSync("bella@student", 10),
    });
    student4.edit({
      name: "Bella Duveen",
      programmingLanguages: ["Kotlin", "Scala"],
      languages: ["English"],
      location: Location.createNew("UK", "London"),
    });

    this.data = [student1, student2, student3, student4];
  }
}

export default new Students();
