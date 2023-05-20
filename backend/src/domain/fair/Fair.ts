import { CommunityName } from "../community/CommunityName";
import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { Coach } from "../user/coach/Coach";
import { FairCoach } from "./FairCoach";
import { CoachJoinedFairEvent } from "./events/CoachJoinedFairEvent.event";
import { CoachLeftFairEvent } from "./events/CoachLeftFairEvent.event";

export class Fair extends Entity<Fair> {
  public community: CommunityName;
  public membersCount: number;

  public static createNew(fair: Omit<RemoveMethods<Fair>, "coaches" | "membersCount">) {
    return new Fair({ ...fair, membersCount: 0 })
  }

  public static initialize(fair: RemoveMethods<Fair>) {
    return new Fair({ ...fair })
  }

  public join(coach: Coach) {
    this.events.push(new CoachJoinedFairEvent(coach.email, this.community));
    this.membersCount++;
  }

  public leave(coach: Coach) {
    this.events.push(new CoachLeftFairEvent(coach.email, this.community));
    this.membersCount--;
  }
}