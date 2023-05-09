/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { User } from "domain/user/user";
import { Location } from "domain/user/location";

const endpoint = "/users";

class UsersService {
  async getById(email: string): Promise<User> {
    const { role, name, location, languages, programmingLanguages } = await api.get<any>(`${endpoint}/${email}`);
    return new User(
      email,
      role,
      name,
      new Location(location.city, location.country),
      languages,
      programmingLanguages,
    );
  }
}

export default new UsersService();