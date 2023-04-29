import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { Student } from "../student/Student";
import { Coach } from "../coach/Coach";
import { StudentEmail } from "../student/StudentEmail";
import { CoachEmail } from "../coach/CoachEmail";

export class Fair extends Entity<Fair> {
  public id: string;
  
  public startAt: Date;
  public endAt: Date;

  public title: string;
  public community: string;

  public students: StudentEmail[];
  public coaches: CoachEmail[];

  public static createNew(fair: Omit<RemoveMethods<Fair>, "id" | "students" | "coaches">) {
    return new Fair({ ...fair, id: nanoid(8), students: [], coaches: [] })
  }

  public joinAsStudent(student: Student) {
    this.students.push(student.email);
    // TODO: new StudentJoinedFairEvent()
  }

  public joinAsCoach(coach: Coach) {
    this.coaches.push(coach.email);
    // TODO: new CoachJoinedFairEvent() 
  }
}