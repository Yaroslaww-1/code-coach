import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { CommunityName } from "./CommunityName";
import { UserJoinedCommunityEvent } from "./events/UserJoinedCommunityEvent.event";
import { UserLeftCommunityEvent } from "./events/UserLeftCommunityEvent.event";

export class Community extends Entity<Community> {
  public name: CommunityName;
  public description: string;
  public membersCount: number;

  public static createNew(community: Omit<RemoveMethods<Community>, "membersCount">) {
    return new Community({ ...community, membersCount: 0 })
  }

  public join(userId: string) {
    this.events.push(new UserJoinedCommunityEvent(userId, this.name));
    this.membersCount++;
  }

  public leave(userId: string) {
    this.events.push(new UserLeftCommunityEvent(userId, this.name));
    this.membersCount--;
  }
}