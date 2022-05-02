module.exports = {
    name: 'jumble',
    description: 'Does "random" (not really) stuff to your text',

    category: 'Fun',
    reqArgs: 1,
    args: '<text>',

    async execute(message, args, client) {
        const text = args.join(' ');

        const jumbledText = text
            .replace(/(a|A|æ|à|á|â|ä|ã|å|ā|À|Æ|Á|Â|Ä|Ã|Å|Ā)/g, '@')
            .replace(/(b|B)/g, '#')
            .replace(/(c|C|Ç|ç)/g, '}')
            .replace(/(d|D)/g, '&')
            .replace(/(e|E)/g, '√')
            .replace(/(f|F)/g, '+')
            .replace(/(g|G)/g, '-')
            .replace(/(h|H)/g, '^')
            .replace(/(i|I)/g, ';')
            .replace(/(j|J)/g, '[')
            .replace(/(k|K)/g, ']')
            .replace(/(l|L)/g, '<')
            .replace(/(m|M)/g, '>')
            .replace(/(n|N|Ñ|ñ)/g, '!')
            .replace(/(o|O|Ó|Ô|Ö|Ò|Œ|Ø|Ō|Õ|ó|ô|ö|ò|œ|ø|ō|õ)/g, '/')
            .replace(/(p|P)/g, '%')
            .replace(/(q|Q)/g, '~')
            .replace(/(r|R)/g, '←')
            .replace(/(s|S|ß)/g, '§')
            .replace(/(t|T)/g, '→')
            .replace(/(u|U|ū|ü|ú|û|ù|Ú|Ü|Ū|Û|Ù)/g, '∆')
            .replace(/(v|V)/g, '¥')
            .replace(/(w|W)/g, '.')
            .replace(/(x|X)/g, ':')
            .replace(/(y|Y)/g, '*')
            .replace(/(z|Z)/g, '♪')
            // Numbers
            .replace(/0/g, '÷')
            .replace(/1/g, '×')
            .replace(/2/g, '¶')
            .replace(/3/g, '¢')
            .replace(/4/g, '°')
            .replace(/5/g, '=')
            .replace(/6/g, '""')
            .replace(/7/g, 'π')
            .replace(/8/g, '⁴')
            .replace(/9/g, '⅕')

        await message.reply({
            content: `**Results:**\n${jumbledText}`,
        });
    },
}
