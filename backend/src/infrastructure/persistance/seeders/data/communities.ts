import { Community } from "src/domain/community/Community";
import fairs from "./fairs";

class Communities {
  public readonly data: Community[];

  constructor() {
    const vue = Community.createNew({
      name: "vue",
      description: "The largest Vue developers community.",
      logo: "https://codecoach.s3.eu-central-1.amazonaws.com/data/images/vue.png",
    }, fairs.data[0]);
    const react = Community.createNew({
      name: "react",
      description: "The largest Vue developers community.",
      logo: "https://codecoach.s3.eu-central-1.amazonaws.com/data/images/react.png",
    }, fairs.data[1]);

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
