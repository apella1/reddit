import { __prod__ } from './constants';
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config"
import { Post } from './entities/Post';

const main = async () => {
    const orm = await MikroORM.init(mikroConfig) // connect to the database
    await orm.getMigrator().up(); // run migrations
    
    const post = orm.em.create(Post, {title: "My first post"})
    await orm.em.persistAndFlush(post)
}

main().catch((err) => {
    console.error(err)
});