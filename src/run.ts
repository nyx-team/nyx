import {
    client,
    loadConfig,
    Util,
    ClientLog
} from './index';

import { Config } from './typings';
import deployCommands from './utils/deployCommands';

/**
 * Run the Bot
 */
export default function run(args: Array<string>): void {
    const config = loadConfig() as Config;

    const isDevMode = args.includes('--dev') || args.includes('-D');

    // Deploy slash commands
    // equivalent to:
    // ts-node index.ts deploy CLIENT_ID [-D|--dev]
    if (args[0] === 'deploy') {
        ClientLog.INFO('Deploying Slash Commands...');

        const deployToken = isDevMode ? config.devToken : config.token;
        const deployClientId = isDevMode ? config.devClientId : config.clientId;

        deployCommands(deployToken, deployClientId);
        return;
    }

    try {
        Util.loadEvents(client);

        // like:
        // ts-node index.ts --dev
        // or
        // ts-node index.ts -D
        if (isDevMode) {
            ClientLog.INFO('Detected dev mode (`-D` or `--dev` flag)');
            ClientLog.INFO('Logging in using Development Token!');

            client.login(config?.devToken);
        } else {
            client.login(config.token);
        }

        ClientLog.INFO('Successfully logged in to the Bot');
        ClientLog.INFO('Please wait...');
    } catch (err) {
        ClientLog.ERROR(`An Error occured while trying to log the Bot:\n${err}`, true);
    }
}
