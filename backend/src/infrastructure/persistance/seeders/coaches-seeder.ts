import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Coach } from "src/domain/Coach";
import { WorkExperience } from "src/domain/WorkExperience";
import { Location } from "src/domain/Location";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CoachesSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public coaches() {
    return [
      new Coach(
        "abe.ryland@gmail.com",
        "Abe Ryland",
        ["Java", "Kotlin"],
        ["English"],
        [
          new WorkExperience("Amazon", new Date(2015, 1), new Date(2022, 10)),
          new WorkExperience("Netflix", new Date(2023, 3), null),
        ],
        new Location("UK", "London")),
      new Coach(
        "abigail@gmail.com",
        "Abigail McGinty",
        ["C++", "Rust"],
        ["English", "Spanish"],
        [
          new WorkExperience("Google", new Date(2010, 5), null),
        ],
        new Location("USA", "San Francisco")),
      new Coach(
        "adela.marchmont@gmail.com",
        "Adela Marchmont",
        ["Python"],
        ["English", "French"],
        [
          new WorkExperience("Microsoft", new Date(2017, 10), null),
        ],
        new Location("USA", "Seattle")),
    ]
  }

  public async seed() {
    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Users": this.coaches().map(coach => ({
          PutRequest: {
            Item: {
              pk: `Coach#${coach.email()}`,
              sk: coach.name(),
              programmingLanguages: coach.programmingLanguages(),
              languages: coach.languages(),
              workExperience: coach.workExperience().map(work => ({
                company: work.company(),
                start: work.start().toISOString(),
                end: work.end()?.toISOString(),
              })),
              yearsOfExperience: coach.yearsOfExperience(),
              location: coach.location(),
            },
          },
        })),
      },
    }));

    console.log("Coaches are seeded")
  }
}