/* eslint-disable @typescript-eslint/no-explicit-any */
import { Community } from "domain/community";
import api from "./api";

const endpoint = "/communities";

class CommunitiesService {
  async getAll(): Promise<Community[]> {
    const communities = await api.get<any[]>(endpoint);
    return communities.map(({ name, description, isJoined, membersCount, logo }) =>
      new Community(name, description, isJoined, membersCount, logo));
  }

  async getById(id: string): Promise<Community> {
    const { name, description, isJoined, membersCount, logo } = await api.get<any>(`${endpoint}/${id}`);
    return new Community(name, description, isJoined, membersCount, logo);
  }

  async joinCommunity(communityId: string): Promise<void> {
    await api.post(`${endpoint}/${communityId}/join`, { });
  }

  async leaveCommunity(communityId: string): Promise<void> {
    await api.post(`${endpoint}/${communityId}/leave`, { });
  }
}

export default new CommunitiesService();