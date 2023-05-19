import { Entity } from "../../lib/Entity";
import { RemoveMethods } from "../../lib/typings";
import { Location } from "../Location";
import { StudentEmail } from "./StudentEmail";

export class Student extends Entity<Student> {
  public email: StudentEmail;
  public passwordHashed: string;

  public name: string;
  public programmingLanguages: string[];
  public languages: string[];
  public location: Location;

  public static createNew(student: { email: string, passwordHashed: string }) {
    return new Student({
      ...student,
      name: student.email.split("@", 1)[0],
      programmingLanguages: [],
      languages: [],
      location: Location.unknown(),
    })
  }
}
