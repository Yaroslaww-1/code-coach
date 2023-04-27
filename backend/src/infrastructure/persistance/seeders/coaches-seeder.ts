import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Location } from "src/domain/coach/Location";
import { Injectable } from "@nestjs/common";
import { Coach } from "src/domain/coach/Coach";
import { WorkExperience } from "src/domain/coach/WorkExperience";
import { CoachEmail } from "src/domain/coach/CoachEmail";

@Injectable()
export class CoachesSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public coaches() {
    return [
      Coach.createNew({
        email: new CoachEmail("abe.ryland@gmail.com"),
        name: "Abe Ryland",
        programmingLanguages: ["Java", "Kotlin"],
        languages: ["English"],
        workExperience: [
          WorkExperience.createFinished("Amazon", new Date(2015, 1), new Date(2022, 10)),
          WorkExperience.createUnfinished("Netflix", new Date(2023, 3)),
        ],
        location: Location.createNew("UK", "London"),
      }),
      Coach.createNew({
        email: new CoachEmail("abigail@gmail.com"),
        name: "Abigail McGinty",
        programmingLanguages: ["C++", "Rust"],
        languages: ["English", "Spanish"],
        workExperience: [
          WorkExperience.createUnfinished("Google", new Date(2010, 5)),
        ],
        location: Location.createNew("USA", "San Francisco"),
      }),
      Coach.createNew({
        email: new CoachEmail("adela.marchmont@gmail.com"),
        name: "Adela Marchmont",
        programmingLanguages: ["Python"],
        languages: ["English", "French"],
        workExperience: [
          WorkExperience.createUnfinished("Microsoft", new Date(2017, 10)),
        ],
        location: Location.createNew("USA", "Seattle"),
      }),
    ]
  }

  public async seed() {
    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Users": this.coaches().map(coach => ({
          PutRequest: {
            Item: {
              pk: `Coach#${coach.email.value}`,
              sk: coach.name,
              programmingLanguages: coach.programmingLanguages,
              languages: coach.languages,
              workExperience: coach.workExperience.map(work => ({
                company: work.company,
                start: work.start.toISOString(),
                end: work.end?.toISOString(),
              })),
              yearsOfExperience: coach.yearsOfExperience(),
              location: coach.location,
            },
          },
        })),
      },
    }));

    console.log("Coaches are seeded")
  }
}