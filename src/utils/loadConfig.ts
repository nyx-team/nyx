import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

import type { Config } from '../typings';

const curPathJoin = (...paths: string[]) => join(__dirname, ...paths);

let dotConfig = null;
try {
  dotConfig = require('dotenv').config; // eslint-disable-line @typescript-eslint/no-var-requires
}
catch {} // eslint-disable-line no-empty

export default function loadConfig(): Config {
  // JSON config
  if (existsSync(curPathJoin('..', 'config.json'))) {
    const config = JSON.parse(
      readFileSync(curPathJoin('../..', 'config.json'), {
        encoding: 'utf8',
      }),
    ) as Config;

    return config;
  }

  // dotenv config
  if (existsSync(curPathJoin('../..', '.env'))) {
    dotConfig({
      path: curPathJoin('../..', '.env'),
    });

    return {
      token: process.env.token,
      mongo_uri: process.env.mongo_uri,
      inviteCode: process.env.inviteCode,
      clientId: process.env.clientId,
      devToken: process.env.devToken,
      devClientId: process.env.devClientId,
      defaultPrefix: process.env.defaultPrefix,
    };
  }

  if (!dotConfig) {
    return {
      token: process.env.token,
      mongo_uri: process.env.mongo_uri,
      inviteCode: process.env.inviteCode,
      clientId: process.env.clientId,
      devToken: process.env.devToken,
      devClientId: process.env.devClientId,
      defaultPrefix: process.env.defaultPrefix,
    };
  }
}
