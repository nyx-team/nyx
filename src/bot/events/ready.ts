import { connect, pluralize } from 'mongoose';

import { loadCommands, loadLegacyCommands } from '../../utils/Util';
import type { EventOptions } from '../../typings';
import { config, ClientLog } from '../..';

export default {
    name: 'ready',
    once: true,

    async execute(client) {
        const { mongo_uri } = config;
        pluralize(null);
        await connect(mongo_uri, { keepAlive: true });

        loadCommands(client);
        loadLegacyCommands(client);

        ClientLog.INFO('The Bot is Ready!');
    },
} as EventOptions<'ready'>;
