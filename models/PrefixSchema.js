const { Schema, model, models } = require('mongoose');

const reqString = {
    type: String,
    required: true,
};

const PrefixSchema = new Schema({
    _id: reqString,
    prefix: reqString,
    dateChanged: {
        type: Date,
        required: false,
    },
});

module.exports = models['prefix-schema'] || model('prefix-schema', PrefixSchema);
