import {
    client,
    loadConfig,
    Util
} from './index';

import { Config } from './typings';

/**
 * Run the Bot
 */
export default function run(): void {
    const config = loadConfig() as Config;

    try {
        Util.loadEvents(client);
        client.login(config.token);

        Util.Log('client', 'Successfully logged in to the Bot', client);
        console.log('Please wait...');
    } catch (err) {
        Util.Log('client', 'An Error occured while trying to log the Bot:', client);
        console.error(err, '\nExiting...');

        // Exit with code `1` (error)
        process.exit(1);
    }
}
