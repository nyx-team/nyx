import { connect, pluralize } from 'mongoose';

import { loadCommands, loadLegacyCommands } from '../../utils/Util';
import type { EventOptions } from '../../typings';
import loadConfig from '../../utils/loadConfig';
import { ClientLog } from '../..';

export default {
    name: 'ready',
    once: true,

    async execute(client) {
        const { mongo_uri } = loadConfig();
        pluralize(null);
        await connect(mongo_uri, { keepAlive: true });

        loadCommands(client);
        loadLegacyCommands(client);

        ClientLog.INFO('The Bot is Ready!');
    },
} as EventOptions<'ready'>;
