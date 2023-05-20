import { Injectable } from "@nestjs/common";
import { Post } from "src/domain/post/Post";
import { PostRepository } from "src/infrastructure/persistance/repositories/post.repository";

@Injectable()
export class CreateNewPostCommand {
  constructor (
    private readonly postRepository: PostRepository
  ) {}

  async execute(authenticatedUserId: string, title: string, content: string, community: string) {
    const post = Post.createNew({ title, content, community, createdBy: authenticatedUserId })

    await this.postRepository.save(post);

    return { id: post.id };
  }
}
