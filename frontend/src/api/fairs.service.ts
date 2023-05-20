/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { Fair } from "domain/fair/Fair";

const endpoint = "/fairs";

class FairsService {
  async getByCommunity(community: string): Promise<Fair> {
    const { membersCount, isJoined } = await api.get<any>(`${endpoint}/${community}`);
    return new Fair(
      community,
      membersCount,
      isJoined,
    );
  }

  async join(communityId: string): Promise<void> {
    await api.post(`${endpoint}/${communityId}/join`, { });
  }

  async leave(communityId: string): Promise<void> {
    await api.post(`${endpoint}/${communityId}/leave`, { });
  }
}

export default new FairsService();