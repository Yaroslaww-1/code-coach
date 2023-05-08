import communitiesService from "api/communities.service";
import { makeAutoObservable } from "mobx";

export class Community {
  constructor(
    public name: string,
    public description: string,
    public isJoined: boolean,
  ) {
    makeAutoObservable(this);
  }

  public logoUrl() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
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