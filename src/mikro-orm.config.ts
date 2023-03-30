import { __prod__ } from './constants';
import path from 'path';

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    },
    entities: ['./dist/entities'],
    dbName: "reddit",
    user: "apella",
    password: "shootersrev",
    type: "postgresql",
    debug: !__prod__
};
