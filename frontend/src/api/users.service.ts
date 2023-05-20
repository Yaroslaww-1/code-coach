/* eslint-disable @typescript-eslint/no-explicit-any */
import { Coach } from "domain/user/coach/coach";
import api from "./api";
import { Student } from "domain/user/student";
import coachesService from "./coaches.service";
import studentsService from "./students.service";

const endpoint = "/users";

class UsersService {
  // async getById(email: string): Promise<User> {
  //   const user = await api.get<any>(`${endpoint}/${email}`);
  //   if (!coach?.role) return null;
  //   const {
  //     role, name, location, languages, programmingLanguages, mentorshipRequests, students, workExperience,
  //   } = coach;
  //   return new Coach(
  //     email,
  //     role,
  //     name,
  //     new Location(location.city, location.country),
  //     languages,
  //     programmingLanguages,
  //     workExperience.map((w: any) =>
  //       new WorkExperience(w.company, new Date(Date.parse(w.start)), new Date(Date.parse(w.end)))),
  //     mentorshipRequests,
  //     students.map((s: any) =>
  //       new CoachStudent(s.student, s.chat)),
  //   );

  //   const { role, name, location } = await api.get<any>(`${endpoint}/${email}`);
  //   return new User(
  //     email,
  //     role,
  //     name,
  //   );
  // }

  async login(email: string, password: string): Promise<Coach | Student> {
    await api.post<any>("/auth/login", { email, password });
    const coach = await coachesService.getById(email);
    const student = await studentsService.getById(email);
    return (coach ?? student)!;
  }
}

export default new UsersService();