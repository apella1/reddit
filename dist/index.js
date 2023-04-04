"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const user_1 = require("./resolvers/user");
const post_1 = require("./resolvers/post");
const hello_1 = require("./resolvers/hello");
const core_1 = require("@mikro-orm/core");
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const type_graphql_1 = require("type-graphql");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver],
        validate: false,
    });
    const apolloServer = new server_1.ApolloServer({
        schema,
    });
    await apolloServer.start();
    app.use((0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(apolloServer));
    app.listen(3000, () => {
        console.log(`Server started on port 3000`);
    });
};
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map