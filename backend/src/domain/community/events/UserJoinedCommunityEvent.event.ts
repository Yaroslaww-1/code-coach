export class UserJoinedCommunityEvent {
  constructor(
    public readonly userId: string,
    public readonly communityId: string
  ) {}
}