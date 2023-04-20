import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllCoachesQuery {
  execute() {
    return [
      {
        email: "sam@gmail.com",
        name: "Sam Spade",
      },
      {
        email: "joel@gmail.com",
        name: "Joel Cairo",
      },
    ] 
  }
}
