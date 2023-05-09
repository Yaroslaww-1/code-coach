import { differenceInMonths } from "date-fns";
import { ValueObject } from "../lib/ValueObject";

export class WorkExperience extends ValueObject<WorkExperience> {
  public readonly company: string;
  public readonly start: Date;
  public readonly end?: Date;

  public static createFinished(company: string, start: Date, end: Date) {
    return new WorkExperience({ company, start, end })
  }

  public static createUnfinished(company: string, start: Date) {
    return new WorkExperience({ company, start })
  }

  public durationInMonths() {
    return differenceInMonths(this.end || Date.now(), this.start);
  }
}