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
      role, name, location, languages, programmingLanguages, coaches, mentorshipRequests, avatar,
    } = student;
    return new Student(
      email,
      role,
      name,
      avatar,
      new Location(location.city, location.country),
      languages,
      programmingLanguages,
      coaches,
      mentorshipRequests,
    );
  }

  async edit(student: Student): Promise<void> {
    await api.post<any>(`${endpoint}/self`, student);
  }
}

export default new StudentsService();