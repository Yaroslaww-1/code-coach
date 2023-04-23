import { differenceInMonths } from "date-fns";

export class WorkExperience {
  constructor(
    private _company: string,
    private _start: Date,
    private _end?: Date,
  ) {}

  public company() { return this._company; }
  public start() { return this._start; }
  public end() { return this._end; }
  public durationInMonths() {
    return differenceInMonths(this._start, this._end || Date.now());
  }
}