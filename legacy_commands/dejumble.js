module.exports = {
    name: 'dejumble',
    description: 'De-Jumbles the Jumbled words from Nyx',
    author: 'loldonut',
    commit: '5701068faab33bf5d7460285a7b939564eb8ae92',

    category: 'Fun',
    minArgs: 1,

    async execute(message, args, client) {
        const jumbledText = args.join(' ');

        const deJumbledText = jumbledText
            .replaceAll('@', 'a')
            .replaceAll('#', 'b')
            .replaceAll('}', 'c')
            .replaceAll('&', 'd')
            .replaceAll('√', 'e')
            .replaceAll('+', 'f')
            .replaceAll('-', 'g')
            .replaceAll('^', 'h')
            .replaceAll(';', 'i')
            .replaceAll('[', 'j')
            .replaceAll(']', 'k')
            .replaceAll('<', 'l')
            .replaceAll('>', 'm')
            .replaceAll('!', 'n')
            .replaceAll('/', 'o')
            .replaceAll('%', 'p')
            .replaceAll('~', 'q')
            .replaceAll('←', 'r')
            .replaceAll('§', 's')
            .replaceAll('→', 't')
            .replaceAll('∆', 'u')
            .replaceAll('¥', 'v')
            .replaceAll('.', 'w')
            .replaceAll(':', 'x')
            .replaceAll('*', 'y')
            .replaceAll('♪', 'z')

        await message.reply({
            content: `**Results:**\n${deJumbledText}`,
        });
    },
}
