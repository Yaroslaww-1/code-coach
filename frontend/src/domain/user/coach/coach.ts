import { Location } from "../location";
import { WorkExperience } from "../work-experience";
import { CoachStudent } from "./coach-student";

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
  ){}

  public avatar() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
  }
}