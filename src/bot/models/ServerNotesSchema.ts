import { model, models, Schema } from 'mongoose';

const reqString = {
  type: String,
  required: true,
};

const ServerNotesSchema = new Schema({
  _id: reqString,
  channelId: reqString,
});

export default models['server-notes-schema'] ||
  model('server-notes-schema', ServerNotesSchema);
