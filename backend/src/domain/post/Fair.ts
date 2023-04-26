import { nanoid } from "nanoid";

export class Fair {
  private _id: string;
  private _studentsCount: number;
  private _coachesCount: number;

  constructor(
    private _startAt: Date,
    private _endAt: Date,
    private _title: string,
    private _community: string,
  ) {
    this._id = nanoid(8);
    this._coachesCount = 0;
    this._studentsCount = 0;
  }

  public id() { return this._id; }
  public title() { return this._title; }
  public startAt() { return this._startAt; }
  public endAt() { return this._endAt; }
  public community() { return this._community; }
  public studentsCount() { return this._studentsCount; }
  public coachesCount() { return this._coachesCount; }

  public joinAsStudent(student: string) {
    this._studentsCount++;
    // TODO: new StudentJoinedFairEvent()
  }

  public joinAsCoach(coach: string) {
    this._coachesCount++;
    // TODO: new CoachJoinedFairEvent() 
  }
}