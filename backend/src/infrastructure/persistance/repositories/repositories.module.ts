import { Module } from "@nestjs/common";
import { CoachRepository } from "./coach.repository";
import { StudentRepository } from "./student.repository";
import { AwsModule } from "src/infrastructure/aws/aws.module";
import { ChatRepository } from "./chats.repository";
import { CommentRepository } from "./comment.repository";
import { CommunityRepository } from "./community.repository";
import { FairRepository } from "./fair.repository";
import { PostRepository } from "./post.repository";

@Module({
  imports: [AwsModule],
  providers: [
    ChatRepository,
    CoachRepository,
    CommentRepository,
    CommunityRepository,
    FairRepository,
    PostRepository,
    StudentRepository,
  ],
  exports: [
    ChatRepository,
    CoachRepository,
    CommentRepository,
    CommunityRepository,
    FairRepository,
    PostRepository,
    StudentRepository,
  ],
})
export class RepositoriesModule {}