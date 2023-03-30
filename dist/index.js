"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const post_1 = require("./resolvers/post");
const hello_1 = require("./resolvers/hello");
const core_1 = require("@mikro-orm/core");
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const type_graphql_1 = require("type-graphql");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const main = async () => {
    const orm = await core_1.MikroORM.init({
        entities: ['./dist/entities'],
        dbName: 'reddit',
        type: 'postgresql',
    });
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const apolloServer = new server_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    });
    app.use((0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(apolloServer));
    app.listen(5000, () => {
        console.log(`Server started on port 5000`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map