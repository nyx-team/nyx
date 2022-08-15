import { Config } from './typings';

// Client
export { Bot } from './bot/bot';

// Utils
import * as Util from './utils/Util';
import loadConfig from './utils/loadConfig';
import validateCommand from './utils/validateCommand';
import Logger from './utils/Logger';

export { Util, loadConfig, validateCommand, Logger };

// Config
export const config = loadConfig() as Config;

// Loggers
export const ClientLog = new Logger('client');
export const UtilLog = new Logger('Util');
