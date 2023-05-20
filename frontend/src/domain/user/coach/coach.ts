import coachesService from "api/coaches.service";
import { Location } from "../location";
import { WorkExperience } from "../work-experience";
import { CoachStudent } from "./coach-student";
import { makeAutoObservable } from "mobx";

export class Coach {
  constructor(
    public email: string,
    public role: string,

    public name: string,

    public location: Location,
    public languages: string[],
    public programmingLanguages: string[],
    public workExperience: WorkExperience[],

    public mentorshipRequests: string[],
    public students: CoachStudent[],
  ){
    makeAutoObservable(this);
  }

  public avatar() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
  }

  public async approveMentorship(student: string) {
    const coachStudent = await coachesService.approveMentorship(student);
    this.mentorshipRequests = this.mentorshipRequests.filter(a => a !== student);
    this.students.push(coachStudent);
  }
}