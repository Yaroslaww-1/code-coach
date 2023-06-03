import communitiesService from "api/communities.service";
import { makeAutoObservable } from "mobx";

export class Community {
  constructor(
    public name: string,
    public description: string,
    public isJoined: boolean,
    public membersCount: number,
    public logo: string,
  ) {
    makeAutoObservable(this);
  }

  public join() {
    this.isJoined = true;
    communitiesService.joinCommunity(this.name);
  }

  public leave() {
    this.isJoined = false;
    communitiesService.leaveCommunity(this.name);
  }
}