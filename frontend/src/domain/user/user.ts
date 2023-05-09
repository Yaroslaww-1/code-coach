import { Location } from "./location";
import { WorkExperience } from "./work-experience";

export class User {
  constructor(
    public email: string,
    public role: string,

    public name: string,
    public location: Location,
    public languages: string[],
    public programmingLanguages: string[],
    public workExperience?: WorkExperience[],
  ){}

  public avatar() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
  }
}