import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { StudentEmail } from "./StudentEmail";

export class Student extends Entity<Student> {
  public email: StudentEmail;
  public name: string;

  public static createNew(student: RemoveMethods<Student>) {
    return new Student(student)
  }
}