import { Student } from "src/domain/student/Student";

class Students {
  public readonly data: Student[];

  constructor() {
    this.data = [
      Student.createNew({ email: "barbara.amory@gmail.com", name: "Barbara Amory" }),
      Student.createNew({ email: "barbara.franklin@gmail.com", name: "Barbara Franklin" }),
      Student.createNew({ email: "beatrice.lippincott@gmail.com", name: "Beatrice Lippincott" }),
      Student.createNew({ email: "bella.duveen@gmail.com", name: "Bella Duveen" }),
    ]
  }
}

export default new Students();
