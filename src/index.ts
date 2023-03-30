import { UserResolver } from './resolvers/user';
import "reflect-metadata";
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
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

const main = async () => {
    const orm = await MikroORM.init<PostgreSqlDriver>({
        entities: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`
        dbName: 'reddit',
        user: "apella",
        password: "shootersrev",
        type: 'postgresql',
    }) // connect to the database
    await orm.getMigrator().up(); // run migrations

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    })

    app.use(
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(apolloServer)
    );

    app.listen(5000, () => {
        console.log(`Server started on port 5000`)
    })
}

main().catch((err) => {
    console.error(err)
});