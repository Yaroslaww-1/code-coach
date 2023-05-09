import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { Student } from "../user/student/Student";
import { Coach } from "../user/coach/Coach";
import { StudentEmail } from "../user/student/StudentEmail";
import { CoachEmail } from "../user/coach/CoachEmail";

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