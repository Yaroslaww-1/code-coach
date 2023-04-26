import { BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDbService } from "../../aws/dynamodb.service";
import { Post } from "src/domain/post/Post";
import { Comment } from "src/domain/post/Comment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsSeeder {
  constructor (
    private readonly dynamoDb: DynamoDbService
  ) {}

  public async seed() {
    const post1 = new Post(
      "What should I use - Vite or Nuxt?",
      "I'm very new to Vue and I have a couple of questions. I want to start my new pet-project using Vue so that I could add Vue to my resume. And Vite or Nuxt are essentials to have a nice pet-project I guess. My main question is if I choose to use Nuxt does it affect my back-end and do I need to rewrite some code there so that Nuxt would function better?",
      "barbara.amory@gmail.com",
      "c/Vue",
      3);

    const post2 = new Post(
      "Vue+Nuxt: Scope of .this and context, how do I know I have access to my nuxt module",
      `I started working on a little webapp a while ago and one thing I have been struggling with often is the inclusion of any kind of plugin to vue or nuxt.
      I have never quite figured it out, but I guess vue plugins wont work when using nuxt, so I need to register specific nuxt modules? At least I wouldnt know how to access them from my components
      Anyways, my question is actually about the usage of nuxt modules - A while ago I installed i18n (the nuxt module) and I had a really hard time to get access to it until I figured out to import "useContext" and access i18n by using "useContext.app.i18n".
      Now what confuses me even more, I installed nuxt-universal-cookies and blindly followed the documentation.
      Which is why I ended up using this.$nuxtCookies (an alias), which allowed me to access nuxt-universal-cookies.
      I tried the same thing with i18n but it doesnt work, strangely enough even nuxt-universal-cookies works like that only in one of my components and I dont get why.
      TLDR: why do I sometimes have access to modules in my components through "this.$module" and sometimes only through importing "useContext" ?
      Thanks in advance!`,
      "barbara.franklin@gmail.com",
      "c/Vue",
      0);

    const posts = [post1, post2];

    const comment1 = Comment.replyToPost(post1, "Nuxt has a lot of things already setup like routing, so I would go with that", "adela.marchmont@gmail.com");
    const comment2 = Comment.replyToOtherComment(comment1, "Thank you!", "barbara.amory@gmail.com");
    const comment3 = Comment.replyToPost(post1, "I guess if you want to learn the different parts that Nuxt just handled out of the box, you can start a Vue project with Vite.", "abe.ryland@gmail.com");

    const comments = [comment1, comment2, comment3];

    await this.dynamoDb.client().send(new BatchWriteCommand({
      RequestItems: {
        "Posts": [
          ...posts.map(post => ({
            PutRequest: {
              Item: {
                pk: `Post#${post.id()}`,
                sk: "Identity",
                title: post.title(),
                content: post.content(),
                createdAt: post.createdAt().toISOString(),
                createdBy: post.createdBy(),
                commentsCount: post.commentsCount(),
                community: post.community(),
              },
            },
          })),
          ...comments.map(comment => ({
            PutRequest: {
              Item: {
                pk: `Post#${comment.postId()}`,
                sk: `Comment#${comment.id()}`,
                content: comment.content(),
                createdAt: comment.createdAt().toISOString(),
                createdBy: comment.createdBy(),
                replyTo: comment.replyTo(),
              },
            },
          })),
        ] },
    }));

    console.log("Posts are seeded")
  }
}