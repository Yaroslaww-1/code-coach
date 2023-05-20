import fairsService from "api/fairs.service";
import { Coach } from "domain/user/coach/coach";
import { makeAutoObservable } from "mobx";

export class Fair  {
  constructor(
    public community: string,
    public membersCount: number,
    public isJoined: boolean,
  ) {
    makeAutoObservable(this);
  }

  public async join(coach: Coach) {
    this.membersCount += 1;
    this.isJoined = true;
    await fairsService.join(this.community);
  }

  public async leave(coach: Coach) {
    this.membersCount -= 1;
    this.isJoined = false;
    await fairsService.leave(this.community);
  }
}