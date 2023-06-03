/* eslint-disable @typescript-eslint/no-explicit-any */
import { Comment } from "domain/comment";
import api from "./api";
import { Post } from "domain/post";

const endpoint = "/posts";

class PostsService {
  async getFeed(): Promise<Post[]> {
    const posts = await api.get<any[]>(`${endpoint}/feed`);
    return posts.map((
      { id, title, content, community, communityLogo, createdBy, createdByAvatar, createdAt }) =>
      new Post(id, title, content, community, communityLogo, createdBy, createdByAvatar, new Date(Date.parse(createdAt))));
  }

  async getByCommunity(communityId: string): Promise<Post[]> {
    const posts = await api.get<any[]>(endpoint, { communityId });
    return posts.map((
      { id, title, content, community, communityLogo, createdBy, createdByAvatar, createdAt }) =>
      new Post(id, title, content, community, communityLogo, createdBy, createdByAvatar, new Date(Date.parse(createdAt))));
  }

  async getById(postId: string): Promise<Post> {
    const { id, title, content, community, communityLogo, createdBy, createdByAvatar, createdAt } = await api.get<any>(`${endpoint}/${postId}`);
    return new Post(id, title, content, community, communityLogo, createdBy, createdByAvatar, new Date(Date.parse(createdAt)));
  }

  async getComments(postId: string): Promise<Comment[]> {
    const comments = await api.get<any[]>(`${endpoint}/${postId}/comments`);
    return comments.map((
      { id, content, createdBy, createdByAvatar, createdAt, replyTo }) =>
      new Comment(id, content, createdBy, createdByAvatar, new Date(Date.parse(createdAt)), replyTo));
  }

  async replyToPost(postId: string, content: string): Promise<void> {
    await api.post<any[]>(`${endpoint}/${encodeURIComponent(postId)}/reply`, { content });
  }

  async create(title: string, content: string, community: string): Promise<Post> {
    const newPost = await api.post<any>(endpoint, { title, content, community });
    return await this.getById(newPost.id);
  }
}

export default new PostsService();