/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { Post } from "domain/post";

const endpoint = "/posts";

class PostsService {
  async getFeed(): Promise<Post[]> {
    const posts = await api.get<any[]>(`${endpoint}/feed`);
    return posts.map((
      { id, title, content, community, createdBy, createdAt }) =>
      new Post(id, title, content, community, createdBy, new Date(Date.parse(createdAt))));
  }

  async getByCommunity(communityId: string): Promise<Post[]> {
    const posts = await api.get<any[]>(endpoint, { communityId });
    return posts.map((
      { id, title, content, community, createdBy, createdAt }) =>
      new Post(id, title, content, community, createdBy, new Date(Date.parse(createdAt))));
  }
}

export default new PostsService();