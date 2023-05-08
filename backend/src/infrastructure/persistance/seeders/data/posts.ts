import { Post } from "src/domain/post/Post";

class Posts {
  public readonly data: Post[];

  constructor() {
    this.data = [
      Post.createNew({
        title: "What should I use - Vite or Nuxt?",
        content: "I'm very new to Vue and I have a couple of questions. I want to start my new pet-project using Vue so that I could add Vue to my resume. And Vite or Nuxt are essentials to have a nice pet-project I guess. My main question is if I choose to use Nuxt does it affect my back-end and do I need to rewrite some code there so that Nuxt would function better?",
        createdBy: "barbara.amory@gmail.com",
        community: "vue",
      }),
      Post.createNew({
        title: "Vue+Nuxt: Scope of .this and context, how do I know I have access to my nuxt module",
        content: `I started working on a little webapp a while ago and one thing I have been struggling with often is the inclusion of any kind of plugin to vue or nuxt.
        I have never quite figured it out, but I guess vue plugins wont work when using nuxt, so I need to register specific nuxt modules? At least I wouldnt know how to access them from my components
        Anyways, my question is actually about the usage of nuxt modules - A while ago I installed i18n (the nuxt module) and I had a really hard time to get access to it until I figured out to import "useContext" and access i18n by using "useContext.app.i18n".
        Now what confuses me even more, I installed nuxt-universal-cookies and blindly followed the documentation.
        Which is why I ended up using this.$nuxtCookies (an alias), which allowed me to access nuxt-universal-cookies.
        I tried the same thing with i18n but it doesnt work, strangely enough even nuxt-universal-cookies works like that only in one of my components and I dont get why.
        TLDR: why do I sometimes have access to modules in my components through "this.$module" and sometimes only through importing "useContext" ?
        Thanks in advance!`,
        createdBy: "barbara.franklin@gmail.com",
        community: "vue",
      }),
    ];
  }
}

export default new Posts();
