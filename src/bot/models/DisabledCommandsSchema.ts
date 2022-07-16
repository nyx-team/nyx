import { Schema, model, models } from 'mongoose';

const reqString = {
    type: String,
    required: true,
};

const DisabledCommands = new Schema({
    _id: reqString,
    disabledCommands: {
        type: Array,
        required: true,
    },
});

export default models['disabled-commands-schema'] || model('disabled-commands-schema', DisabledCommands);