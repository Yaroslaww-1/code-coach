import { CommunityName } from "src/domain/community/CommunityName";
import { CoachEmail } from "src/domain/user/coach/CoachEmail";

export class CoachLeftFairEvent {
  constructor(
    public readonly coachId: CoachEmail,
    public readonly communityId: CommunityName
  ) {}
}