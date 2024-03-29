import { ValueObject } from "src/domain/lib/ValueObject";
import { StudentEmail } from "../student/StudentEmail";
import { CoachEmail } from "./CoachEmail";

export class CoachStudent extends ValueObject<CoachStudent> {
  public readonly coach: CoachEmail;
  public readonly student: StudentEmail;
  public readonly chat: string;
  
  public static createNew(coach: CoachEmail, student: StudentEmail, chat: string) {
    return new CoachStudent({ coach, student, chat })
  }
}