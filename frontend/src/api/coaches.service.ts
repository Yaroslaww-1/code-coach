/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { Location } from "domain/user/location";
import { Coach } from "domain/user/coach/coach";
import { WorkExperience } from "domain/user/work-experience";
import { CoachStudent } from "domain/user/coach/coach-student";

const endpoint = "/coaches";

class CoachesService {
  async getById(email: string): Promise<Coach> {
    const {
      role, name, location, languages, programmingLanguages, mentorshipRequests, students, workExperience,
    } = await api.get<any>(`${endpoint}/${email}`);
    return new Coach(
      email,
      role,
      name,
      new Location(location.city, location.country),
      languages,
      programmingLanguages,
      workExperience.map((w: any) =>
        new WorkExperience(w.company, new Date(Date.parse(w.start)), new Date(Date.parse(w.end)))),
      mentorshipRequests,
      students.map((s: any) =>
        new CoachStudent(s.student, s.chat)),
    );
  }
}

export default new CoachesService();