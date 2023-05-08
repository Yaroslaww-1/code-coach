import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { CommunityName } from "./CommunityName";
import { UserJoinedCommunityEvent } from "./events/UserJoinedCommunityEvent.event";
import { UserLeftCommunityEvent } from "./events/UserLeftCommunityEvent.event";

export class Community extends Entity<Community> {
  public name: CommunityName;
  public description: string;

  public static createNew(community: RemoveMethods<Community>) {
    return new Community({ ...community })
  }

  public join(userId: string) {
    this.events.push(new UserJoinedCommunityEvent(userId, this.name));
  }

  public leave(userId: string) {
    this.events.push(new UserLeftCommunityEvent(userId, this.name));
  }
}