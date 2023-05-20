import { Entity } from "../../lib/Entity";
import { RemoveMethods } from "../../lib/typings";
import { CoachEmail } from "./CoachEmail";
import { WorkExperience } from "../WorkExperience";
import { Location } from "../Location";
import { StudentEmail } from "../student/StudentEmail";
import { CoachStudent } from "./CoachStudent";
import { Student } from "../student/Student";
import { ChatId } from "src/domain/chat/ChatId";

export class Coach extends Entity<Coach> {
  public email: CoachEmail;
  public passwordHashed: string;

  public nickname: string;
  public name: string;
  public programmingLanguages: string[];
  public languages: string[];
  public workExperience: WorkExperience[];
  public location: Location;

  public mentorshipRequests: StudentEmail[];
  public students: CoachStudent[];

  public static createNew(coach: { email: string, passwordHashed: string }) {
    return new Coach({
      ...coach,
      name: "unknown",
      nickname: coach.email.split("@", 1)[0],
      programmingLanguages: [],
      languages: [],
      workExperience: [],
      location: Location.unknown(),
      mentorshipRequests: [],
      students: [],
    })
  }

  public static initialize(coach: RemoveMethods<Coach>) {
    return new Coach(coach)
  }

  public edit(coach: Omit<RemoveMethods<Coach>, "students" | "mentorshipRequests" | "passwordHashed" | "email" | "nickname">) {
    this.name = coach.name;
    this.programmingLanguages = coach.programmingLanguages;
    this.languages = coach.languages;
    this.location = coach.location;
    this.workExperience = coach.workExperience;
  }

  public yearsOfExperience() {
    return Math.floor(this.workExperience.map(w => w.durationInMonths())
      .reduce((d1, d2) => d1 + d2, 0) / 12);
  }

  public applyForMentorship(student: StudentEmail) {
    this.mentorshipRequests.push(student);
  }

  public approveMentorship(student: StudentEmail, chat: ChatId) {
    if (!this.mentorshipRequests.includes(student)) throw new Error("Student is not in the applicants list");
    this.students.push(CoachStudent.createNew(student, chat));
    this.mentorshipRequests = this.mentorshipRequests.filter(s => s !== student);
  }
}