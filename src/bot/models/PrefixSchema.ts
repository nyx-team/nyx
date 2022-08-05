import { Schema, model, models } from 'mongoose';

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

export default models['prefix-schema'] || model('prefix-schema', PrefixSchema);
