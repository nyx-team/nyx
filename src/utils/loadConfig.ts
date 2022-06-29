import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

import type { Config } from '../typings';

const curPathJoin = (...paths: string[]) => join(__dirname, ...paths);

let config = null;
try {
    import('dotenv').then((v) => config = v.default.config);
} catch {} // eslint-disable-line no-empty

export default function loadConfig(): Config {
    // JSON config
    if (existsSync(curPathJoin('..', 'config.json'))) {
        const config = JSON.parse(
            readFileSync(curPathJoin('../..', 'config.json'), {
                encoding: 'utf8'
            })
        ) as Config;

        return config;
    }
 
    // dotenv config
    if (existsSync(curPathJoin('../..', '.env'))) {
        config({
            path: curPathJoin('../..', '.env')
        });

        return {
            token: process.env.token,
            mongo_uri: process.env.mongo_uri,
            devToken: process.env.devToken,
            clientId: process.env.clientId,
            devClientId: process.env.devClientId
        };
    }

    if (!config) {
        return {
            token: process.env.token,
            mongo_uri: process.env.mongo_uri,
            devToken: process.env.devToken,
            clientId: process.env.clientId,
            devClientId: process.env.devClientId
        };
    }
}
