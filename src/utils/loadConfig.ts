import { config } from 'dotenv';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

import type { Config } from '../typings';

const curPathJoin = (...paths: string[]) => join(__dirname, ...paths);

export default function loadConfig(): Config {
    config({
        path: curPathJoin('../..', '.env')
    });

    if (existsSync(curPathJoin('..', 'config.json'))) {
        const config = JSON.parse(
            readFileSync(curPathJoin('../..', 'config.json'), {
                encoding: 'utf8'
            })
        ) as Config;

        return config;
    }
    else if (existsSync(curPathJoin('../..', '.env'))) {
        return {
            token: process.env.token,
            mongo_uri: process.env.mongo_uri
        };
    }
}
