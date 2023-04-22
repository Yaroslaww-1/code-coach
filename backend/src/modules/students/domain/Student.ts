export class Student {
  constructor(
    private _email: string,
    private _name: string
  ) {}

  public email() { return this._email; }
  public name() { return this._name; }
}