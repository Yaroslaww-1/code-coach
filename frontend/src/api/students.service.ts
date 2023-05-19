/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from "domain/user/student";
import api from "./api";
import { Location } from "domain/user/location";

const endpoint = "/students";

class StudentsService {
  async getById(email: string): Promise<Student | null> {
    const student = await api.get<any>(`${endpoint}/${email}`);
    if (!student?.role) return null;
    const {
      role, name, location, languages, programmingLanguages, chatWithCoach,
    } = student;
    return new Student(
      email,
      role,
      name,
      new Location(location.city, location.country),
      languages,
      programmingLanguages,
      chatWithCoach,
    );
  }
}

export default new StudentsService();