#!/usr/bin/env node

const inquirer = require('inquirer');
const { writeFileSync } = require('fs');
const { join } = require('node:path');

async function exit(message, code = 0) {
    if (message) console.error(message);
    process.exit(code);
}

(async () => {
    const { name } = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Command name?',
    });

    if (!name) exit('You did not provide a name!', 1);

    const { description } = await inquirer.prompt({
        name: 'description',
        type: 'input',
        message: 'Description?',
    });

    if (!description) exit('You did not provide a description!', 1);

    const { category } = await inquirer.prompt({
        name: 'category',
        type: 'list',
        choices: ['Moderation', 'Fun', 'Other'],
        default() {
            return 'Others';
        },
    });

    const filteredDescription = description
        .replaceAll("'", "\\'");

    const template = `const { Message, Client } = require('discord.js'):

    module.exports = {
    name: '${name}',
    description: '${filteredDescription}',

    category: '${category}',

    /**
     * ${description}
     * @param {Message} message
     * @param {string[]} args
     * @param {Client} client
     */
    async execute(message, args, client) {
        // ...
    },
}`;

    console.log('Creating command...');
    const filteredName = name
        .replaceAll(/(-|\s|_)/g, '-')
        .replaceAll(/\.\w*$/g, '');
    writeFileSync(
        join(
            __dirname,
            `../legacy_commands/${category}/${filteredName}.js`
        ),
        template
    );

    console.log(`Created command ${name}!`);
    console.log(`
        Category: ${category}
        File name: ${filteredName}.js
        Path: legacy_commands/${category}/${filteredName}.js
    `);

    exit();
})();
