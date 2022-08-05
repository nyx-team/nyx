import { EventOptions } from '../../typings';

export default {
  name: 'messageDelete',

  async execute(client, message) {
    if (message.author.bot) return;
    client.snipedMessages.set(message.channel.id, message);

    // Delete the sniped messages
    // after 5 seconds
    setTimeout(() => {
      client.snipedMessages.delete(message.channel.id);
    }, 1000 * 5);
  },
} as EventOptions<'messageDelete'>;
