import {
    client,
    loadConfig,
    Util
} from './index';

import { Config } from './typings';

/**
 * Run the Bot
 */
export default function run(args: Array<string>): void {
    const config = loadConfig() as Config;

    try {
        Util.loadEvents(client);

        // like:
        // ts-node index.ts --dev
        // or
        // ts-node index.ts -D
        if (args.includes('--dev') || args.includes('-D')) {
            Util.Log('client', 'Detected dev mode (`-D` or `--dev` flag)', client);
            Util.Log('client', 'Logging in using Development Token!', client);

            client.login(config?.devToken);
        } else {
            client.login(config.token);
        }

        Util.Log('client', 'Successfully logged in to the Bot', client);
        console.log('Please wait...');
    } catch (err) {
        Util.Log('client', 'An Error occured while trying to log the Bot:', client);
        console.error(err, '\nExiting...');

        // Exit with code `1` (error)
        process.exit(1);
    }
}
