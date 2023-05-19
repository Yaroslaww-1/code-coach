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

  async login(email: string, password: string): Promise<User> {
    await api.post<any>("/auth/login", { email, password });
    return await this.getById(email);
  }
}

export default new UsersService();