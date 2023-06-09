import "reflect-metadata";
import { MyContext } from './../types';
import { Post } from './../entities/Post';
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() ctx: MyContext): Promise<Post[]> {
        return ctx.em.find(Post, {})
    }

    // returning graphql types and typescript types
    @Query(() => Post, { nullable: true })
    post(
        @Arg("id", () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id })
    }

    @Mutation(() => Post)
    async createPost(
        @Arg("title", () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, { title, createdAt: new Date(), updatedAt: new Date() })
        await em.persistAndFlush(post)
        return post
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("title", () => String, { nullable: true }) title: string,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, { id })
        if (!post) {
            return null
        }
        if (typeof title !== "undefined") {
            post.title = title;
            await em.persistAndFlush(post)
        }
        return post
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id", () => Boolean) id: number,
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        em.nativeDelete(Post, { id })
        return true
    }

}
