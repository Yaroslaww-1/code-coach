/* eslint-disable @typescript-eslint/no-explicit-any */
import { Coach } from "domain/user/coach/coach";
import api from "./api";
import { Student } from "domain/user/student";
import coachesService from "./coaches.service";
import studentsService from "./students.service";

const endpoint = "/users";

class UsersService {
  async login(email: string, password: string): Promise<Coach | Student | null> {
    const login = await api.post<any>("/auth/login", { email, password });
    if (login.error) return null;
    const coach = await coachesService.getById(email);
    const student = await studentsService.getById(email);
    return coach ?? student ?? null;
  }

  async register(email: string, password: string, role: string): Promise<any> {
    return await api.post<any>("/auth/register", { email, password, role });
  }
}

export default new UsersService();