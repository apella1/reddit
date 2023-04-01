"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        glob: '!(*.d).{js,ts}',
    },
    entities: ['./dist/entities'],
    dbName: "reddit",
    user: "apella",
    password: "m124@neezy",
    type: "postgresql",
    debug: !constants_1.__prod__
};
//# sourceMappingURL=mikro-orm.config.js.map