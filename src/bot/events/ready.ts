import { connect, pluralize } from 'mongoose';

import Util from '../../utils/Util';
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

        Util.loadCommands(client);
        Util.loadLegacyCommands(client);

        ClientLog.INFO('The Bot is Ready!');
    },
} as EventOptions<'ready'>;
