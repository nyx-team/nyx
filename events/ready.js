const Util = require('../utils/Util');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const mongoURI = process.env.mongo_uri
    ?? JSON.parse(
        fs.readFileSync(path.join(__dirname, '../config.json'), {
            encoding: 'utf8',
        })
    ).mongo_uri;

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        // Connect to MongoDB
        mongoose.pluralize(false);
        mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
        });

        Util.loadCommands(client);
        Util.loadLegacyCommands(client);

        console.log("Bot is ready!");
    },
};
