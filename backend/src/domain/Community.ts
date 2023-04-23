export class Community {
  constructor(
    private _name: string,
    private _description: string,
    private _membersCount: number
  ) {}

  public name() { return this._name; }
  public description() { return this._description; }
  public membersCount() { return this._membersCount; }

  public join(userEmail: string) {
    this._membersCount++;
    // TODO: emit UserJoinedCommunityEvent()
  }
}