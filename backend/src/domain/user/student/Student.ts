import { Entity } from "../../lib/Entity";
import { RemoveMethods } from "../../lib/typings";
import { Location } from "../Location";
import { StudentEmail } from "./StudentEmail";

export class Student extends Entity<Student> {
  public email: StudentEmail;
  public name: string;
  public programmingLanguages: string[];
  public languages: string[];
  public location: Location;

  public static createNew(student: RemoveMethods<Student>) {
    return new Student(student)
  }
}
