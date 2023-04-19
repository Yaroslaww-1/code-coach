import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllCommunitiesQuery {
  execute() {
    return [
      {
        id: "id1",
        name: "r/React",
        description: "React developers community",
      },
      {
        id: "id2",
        name: "r/Vue",
        description: "Vue developers community",
      },
    ];
  }
}
