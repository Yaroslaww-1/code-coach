/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { User } from "domain/user/user";

const endpoint = "/users";

class UsersService {
  async getById(email: string): Promise<User> {
    const { role, name } = await api.get<any>(`${endpoint}/${email}`);
    return new User(
      email,
      role,
      name,
    );
  }
}

export default new UsersService();