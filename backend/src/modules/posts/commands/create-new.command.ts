import { Injectable } from "@nestjs/common";
import { Post } from "src/domain/post/Post";
import { CoachRepository } from "src/infrastructure/persistance/repositories/coach.repository";
import { CommunityRepository } from "src/infrastructure/persistance/repositories/community.repository";
import { PostRepository } from "src/infrastructure/persistance/repositories/post.repository";
import { StudentRepository } from "src/infrastructure/persistance/repositories/student.repository";

@Injectable()
export class CreateNewPostCommand {
  constructor (
    private readonly postRepository: PostRepository,
    private readonly coachRepository: CoachRepository,
    private readonly studentRepository: StudentRepository,
    private readonly communityRepository: CommunityRepository
  ) {}

  async execute(authenticatedUserId: string, title: string, content: string, community: string) {
    const user = (await this.coachRepository.findOne(authenticatedUserId)) ||
    (await this.studentRepository.findOne(authenticatedUserId));

    const c = await this.communityRepository.findOne(community);

    const post = Post.createNew({
      title,
      content,
      community,
      createdBy: authenticatedUserId,
      createdByAvatar: user.avatar,
      communityLogo: c.logo,
    })

    await this.postRepository.save(post);

    return { id: post.id };
  }
}
