/* eslint-disable @typescript-eslint/no-explicit-any */
import { Community } from "domain/community";
import api from "./api";

const endpoint = "/communities";

class CommunitiesService {
  async getAll(): Promise<Community[]> {
    const communities = await api.get<any[]>(endpoint);
    return communities.map(({ name, description, isJoined }) => new Community(name, description, isJoined));
  }

  async joinCommunity(communityId: string): Promise<void> {
    await api.post(`${endpoint}/${communityId}/join`, { });
  }

  async leaveCommunity(communityId: string): Promise<void> {
    await api.post(`${endpoint}/${communityId}/leave`, { });
  }
}

export default new CommunitiesService();