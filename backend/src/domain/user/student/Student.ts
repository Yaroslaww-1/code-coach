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

  public chatWithCoach?: string;

  public static createNew(student: { email: string, passwordHashed: string }) {
    return new Student({
      ...student,
      name: "Unknown",
      programmingLanguages: [],
      languages: [],
      location: Location.unknown(),
    })
  }

  public edit(student: Omit<RemoveMethods<Student>, "chatWithCoach" | "passwordHashed" | "email">) {
    this.name = student.name;
    this.programmingLanguages = student.programmingLanguages;
    this.languages = student.languages;
    this.location = student.location;
  }

  public joinChatWithCoach(chatId: string) {
    this.chatWithCoach = chatId;
  }
}
