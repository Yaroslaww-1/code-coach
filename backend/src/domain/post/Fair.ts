import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { CoachEmail } from "../coach/CoachEmail";
import { StudentEmail } from "../student/StudentEmail";

export class Fair extends Entity<Fair> {
  public id: string;
  
  public startAt: Date;
  public endAt: Date;

  public title: string;
  public community: string;

  public studentsCount: number;
  public coachesCount: number;

  public static createNew(fair: Omit<RemoveMethods<Fair>, "id" | "studentsCount" | "coachesCount">) {
    return new Fair({ ...fair, id: nanoid(8), studentsCount: 0, coachesCount: 0 })
  }

  public joinAsStudent(student: StudentEmail) {
    this.studentsCount++;
    // TODO: new StudentJoinedFairEvent()
  }

  public joinAsCoach(coach: CoachEmail) {
    this.coachesCount++;
    // TODO: new CoachJoinedFairEvent() 
  }
}