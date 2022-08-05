import { EventOptions } from '../../typings';
import PrefixSchema from '../models/PrefixSchema';

export default {
  name: 'guildDelete',

  async execute(_, guild) {
    if (!guild.available) return;
    await PrefixSchema.findByIdAndDelete(guild.id);
  },
} as EventOptions<'guildDelete'>;
