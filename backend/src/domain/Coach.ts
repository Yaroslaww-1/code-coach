import { Location } from "./Location";
import { WorkExperience } from "./WorkExperience";

export class Coach {
  constructor(
    private _email: string,
    private _name: string,
    private _programmingLanguages: string[],
    private _languages: string[],
    private _workExperience: WorkExperience[],
    private _location: Location
  ) {}

  public email() { return this._email; }
  public name() { return this._name; }
  public programmingLanguages() { return this._programmingLanguages; }
  public languages() { return this._languages; }
  public workExperience() { return this._workExperience; }
  public yearsOfExperience() {
    return this._workExperience.map(w => w.durationInMonths())
      .reduce((d1, d2) => d1 + d2, 0) / 12;
  }
  public location() { return this._location; }
}