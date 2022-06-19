import Util from '../utils/Util';
import type { EventOptions } from '../typings/index';

export default {
    name: 'ready',
    once: true,

    async execute(client) {
        Util.loadCommands(client);
        Util.loadLegacyCommands(client);

        console.log('The Bot is Ready!');
    }
} as EventOptions;
