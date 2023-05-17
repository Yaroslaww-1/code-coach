import { Entity } from "../../lib/Entity";
import { RemoveMethods } from "../../lib/typings";
import { CoachEmail } from "./CoachEmail";
import { WorkExperience } from "../WorkExperience";
import { Location } from "../Location";
import { StudentEmail } from "../student/StudentEmail";
import { CoachStudent } from "./CoachStudent";
import { Student } from "../student/Student";

export class Coach extends Entity<Coach> {
  public email: CoachEmail;
  public name: string;
  public programmingLanguages: string[];
  public languages: string[];
  public workExperience: WorkExperience[];
  public location: Location;

  public mentorshipRequests: StudentEmail[];
  public students: CoachStudent[];

  public static createNew(coach: Omit<RemoveMethods<Coach>, "students" | "mentorshipRequests">) {
    return new Coach({ ...coach, students: [], mentorshipRequests: [] })
  }

  public static initialize(coach: RemoveMethods<Coach>) {
    return new Coach(coach)
  }

  public yearsOfExperience() {
    return Math.floor(this.workExperience.map(w => w.durationInMonths())
      .reduce((d1, d2) => d1 + d2, 0) / 12);
  }

  public applyForMentorship(student: StudentEmail) {
    this.mentorshipRequests.push(student);
  }

  public approveMentorship(student: StudentEmail) {
    if (!this.mentorshipRequests.includes(student)) throw new Error("Student is not in the applicants list");
    this.students.push(CoachStudent.createNew(student, ""));
    this.mentorshipRequests.filter(s => s !== student);
  }
}