/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { Location } from "domain/user/location";
import { Coach } from "domain/user/coach/coach";
import { WorkExperience } from "domain/user/work-experience";
import { CoachStudent } from "domain/user/coach/coach-student";

const endpoint = "/coaches";

class CoachesService {
  async getById(email: string): Promise<Coach | null> {
    const coach = await api.get<any>(`${endpoint}/${email}`);
    if (!coach?.role) return null;
    const {
      role, name, location, languages, programmingLanguages, mentorshipRequests, students, workExperience,
    } = coach;
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

  async approveMentorship(student: string): Promise<CoachStudent> {
    const { chat } = await api.post<any>(`${endpoint}/approveMentorshipRequest`, { student });
    return new CoachStudent(student, chat);
  }
}

export default new CoachesService();