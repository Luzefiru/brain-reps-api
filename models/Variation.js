const { Schema, model } = require("mongoose");

const VariationSchema = new Schema({
  body: { type: String, required: true },
  answer: [{ type: String, required: true }],
  answerType: { type: String, required: true },
  answerNotes: { type: String },
  answerPrefilldedValue: { type: String },
  keywords: [{ type: String, required: true }],
  isCaseSensitive: { type: Boolean, required: true },
});

module.exports = model("Variation", VariationSchema);
