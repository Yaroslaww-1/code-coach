import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { CommunityName } from "./CommunityName";

export class Community extends Entity<Community> {
  public name: CommunityName;
  public description: string;

  public members: string[];

  public static createNew(community: Omit<RemoveMethods<Community>, "members">) {
    return new Community({ ...community, members: [] })
  }

  public join(userEmail: string) {
    this.members.push(userEmail);
    // TODO: emit UserJoinedCommunityEvent()
  }
}