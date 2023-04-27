import { Entity } from "./lib/Entity";
import { RemoveMethods } from "./lib/typings";

export class Student extends Entity<Student> {
  public email: string;
  public name: string;

  public static createNew(student: RemoveMethods<Student>) {
    return new Student(student)
  }
}