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
  public mentorshipRequests: CoachEmail[];

  public static createNew(student: { email: string, passwordHashed: string }) {
    return new Student({
      ...student,
      name: "Unknown",
      programmingLanguages: [],
      languages: [],
      location: Location.unknown(),
      coaches: [],
      mentorshipRequests: [],
    })
  }

  public static initialize(student: RemoveMethods<Student>) {
    return new Student({
      ...student,
    })
  }

  public edit(student: Omit<RemoveMethods<Student>, "chatWithCoach" | "passwordHashed" | "email" | "coaches" | "mentorshipRequests">) {
    this.name = student.name;
    this.programmingLanguages = student.programmingLanguages;
    this.languages = student.languages;
    this.location = student.location;
  }

  public applyForMentorship(coach: CoachEmail) {
    this.mentorshipRequests.push(coach);
  }

  public joinChatWithCoach(coach: CoachEmail, chat: ChatId) {
    this.coaches.push(CoachStudent.createNew(coach, this.email, chat));
    this.mentorshipRequests = this.mentorshipRequests.filter(s => s !== coach);
  }
}
