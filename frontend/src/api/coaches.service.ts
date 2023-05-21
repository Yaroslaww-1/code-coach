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
        new WorkExperience(w.company, new Date(Date.parse(w.start)), w.end && new Date(Date.parse(w.end)))),
      mentorshipRequests,
      students.map((s: any) =>
        new CoachStudent(s.coach, s.student, s.chat)),
    );
  }

  async approveMentorship(coach: string, student: string): Promise<CoachStudent> {
    const { chat } = await api.post<any>(`${endpoint}/approveMentorshipRequest`, { student });
    return new CoachStudent(coach, student, chat);
  }

  async requestMentorship(coach: string) {
    await api.post(`${endpoint}/${coach}/requestMentorship`, {});
  } 

  async edit(coach: Coach): Promise<void> {
    await api.post<any>(`${endpoint}/self`, coach);
  }
}

export default new CoachesService();