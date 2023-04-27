import { Entity } from "./lib/Entity";
import { RemoveMethods } from "./lib/typings";

export class Community extends Entity<Community> {
  public name: string;
  public description: string;
  public membersCount: number;

  public static createNew(community: Omit<RemoveMethods<Community>, "membersCount">) {
    return new Community({ ...community, membersCount: 0 })
  }

  public join(userEmail: string) {
    this.membersCount++;
    // TODO: emit UserJoinedCommunityEvent()
  }
}