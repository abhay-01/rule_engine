import { Schema, model } from 'mongoose';

const ruleSchema = new Schema({
  ruleString: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Rule = model('Rule', ruleSchema);

export default Rule;
