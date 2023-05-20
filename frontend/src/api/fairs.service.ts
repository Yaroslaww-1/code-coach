/* eslint-disable @typescript-eslint/no-explicit-any */
import { FairCoach } from "domain/fair/FairCoach";
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

  async getMembers(): Promise<FairCoach[]> {
    const coaches = await api.get<any[]>(`${endpoint}/all/members`);
    return coaches.map(({ email, communities }) => new FairCoach(email, communities));
  }

  async join(communityId: string): Promise<void> {
    await api.post(`${endpoint}/${communityId}/join`, { });
  }

  async leave(communityId: string): Promise<void> {
    await api.post(`${endpoint}/${communityId}/leave`, { });
  }
}

export default new FairsService();