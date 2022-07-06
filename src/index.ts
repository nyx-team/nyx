// Client
export { client } from './bot/bot';

// Utils
import Util from './utils/Util';
import loadConfig from './utils/loadConfig';
import validateCommand from './utils/validateCommand';
import Logger from './utils/Logger';

export { Util, loadConfig, validateCommand, Logger };

export const ClientLog = new Logger('client');
export const UtilLog = new Logger('Util');
