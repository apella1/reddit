import { Options } from '@mikro-orm/postgresql';
import { __prod__ } from './constants';
import path from 'path';

const config: Options = {
    migrations: {
        path: path.join(__dirname, "./migrations"),
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    },
    entities: ['./dist/entities'],
    dbName: "reddit",
    user: "apella",
    password: "m124@neezy",
    type: "postgresql",
    debug: !__prod__
};

export default config;