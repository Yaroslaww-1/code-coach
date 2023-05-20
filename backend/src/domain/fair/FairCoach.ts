import { ValueObject } from "../lib/ValueObject";
import { CoachEmail } from "../user/coach/CoachEmail";

export class FairCoach extends ValueObject<FairCoach> {
  public readonly email: CoachEmail;
  
  public static createNew(email: CoachEmail) {
    return new FairCoach({ email })
  }
}