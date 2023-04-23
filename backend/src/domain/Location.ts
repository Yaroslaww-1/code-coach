export class Location {
  constructor(
    private _country: string,
    private _city: string
  ) {}

  public country() { return this._country; }
  public city() { return this._city; }
}