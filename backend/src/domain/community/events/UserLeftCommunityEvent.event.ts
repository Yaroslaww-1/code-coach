export class UserLeftCommunityEvent {
  constructor(
    public readonly userId: string,
    public readonly communityId: string
  ) {}
}