import "reflect-metadata";
import { UserResolver } from './resolvers/user';
import { PostResolver } from './resolvers/post';
import { HelloResolver } from './resolvers/hello';
import { __prod__ } from './constants';
import { MikroORM } from "@mikro-orm/core";
import express from "express"
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors";
import { json } from 'body-parser';
import config from "./mikro-orm.config";

const main = async () => {
    const orm = await MikroORM.init(config) // connect to the database
    await orm.getMigrator().up(); // run migrations

    const app = express();

    const schema = await buildSchema({
        resolvers: [HelloResolver, PostResolver, UserResolver],
        validate: false,
    })


    const apolloServer = new ApolloServer({
        schema,
    })
    
    await apolloServer.start()

    app.use(
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(apolloServer)
    );

    app.listen(3000, () => {
        console.log(`Server started on port 3000`)
    })
}

main().catch((err) => {
    console.error(err)
});