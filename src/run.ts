import loadConfig from './utils/loadConfig';
import Util from './utils/Util';
import { client } from './bot/bot';

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
        console.error(err);

        return;
    }
}
