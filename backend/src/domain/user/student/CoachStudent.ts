import { ValueObject } from "src/domain/lib/ValueObject";
import { StudentEmail } from "../student/StudentEmail";

export class CoachStudent extends ValueObject<CoachStudent> {
  public readonly student: StudentEmail;
  public readonly chat: string;
  
  public static createNew(student: StudentEmail, chat: string) {
    return new CoachStudent({ student, chat })
  }
}