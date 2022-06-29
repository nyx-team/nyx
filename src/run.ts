import {
    client,
    loadConfig,
    Util
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
        console.log('Deploying Slash Commands...');

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
