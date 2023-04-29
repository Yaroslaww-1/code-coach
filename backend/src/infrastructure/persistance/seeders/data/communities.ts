import { Community } from "src/domain/community/Community";

class Communities {
  public readonly data: Community[];

  constructor() {
    const vue = Community.createNew({ name: "c/Vue", description: "The largest Vue developers community." });
    const react = Community.createNew({ name: "c/React", description: "The largest Vue developers community." });

    const communities = [vue, react];

    vue.join("abe.ryland@gmail.com");
    vue.join("abigail@gmail.com");
    vue.join("barbara.amory@gmail.com");
    vue.join("barbara.franklin@gmail.com");

    react.join("adela.marchmont@gmail.com");
    react.join("beatrice.lippincott@gmail.com");
    react.join("bella.duveen@gmail.com");

    this.data = [vue, react];
  }
}

export default new Communities();
