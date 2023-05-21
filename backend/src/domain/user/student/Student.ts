import { ChatId } from "src/domain/chat/ChatId";
import { Entity } from "../../lib/Entity";
import { RemoveMethods } from "../../lib/typings";
import { Location } from "../Location";
import { CoachStudent } from "../coach/CoachStudent";
import { StudentEmail } from "./StudentEmail";
import { CoachEmail } from "../coach/CoachEmail";
import { BadRequestException } from "@nestjs/common";


export class Student extends Entity<Student> {
  public email: StudentEmail;
  public passwordHashed: string;

  public name: string;
  public programmingLanguages: string[];
  public languages: string[];
  public location: Location;

  public coaches: CoachStudent[];

  public static createNew(student: { email: string, passwordHashed: string }) {
    return new Student({
      ...student,
      name: "Unknown",
      programmingLanguages: [],
      languages: [],
      location: Location.unknown(),
      coaches: [],
    })
  }

  public static initialize(student: RemoveMethods<Student>) {
    return new Student({
      ...student,
    })
  }

  public edit(student: Omit<RemoveMethods<Student>, "chatWithCoach" | "passwordHashed" | "email" | "coaches">) {
    this.name = student.name;
    this.programmingLanguages = student.programmingLanguages;
    this.languages = student.languages;
    this.location = student.location;
  }

  public joinChatWithCoach(coach: CoachEmail, chat: ChatId) {
    this.coaches.push(CoachStudent.createNew(coach, this.email, chat));
  }
}
