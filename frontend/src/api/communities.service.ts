/* eslint-disable @typescript-eslint/no-explicit-any */
import { Community } from "domain/community";
import api from "./api";

const endpoint = "/communities";

class CommunitiesService {
  async getAll(): Promise<Community[]> {
    const communities = await api.get<any[]>(endpoint);
    return communities.map(({ id, name, description }) => new Community(id, name, description));
  }
}

export default new CommunitiesService();