export class Community {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string,
  ) {}

  public id(): string { return this._id; }
  public name(): string { return this._name; }
  public description(): string { return this._description; }
}