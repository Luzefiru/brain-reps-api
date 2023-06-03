const { Schema, model } = require("mongoose");

const AttemptSchema = new Schema({
  variationId: {
    type: Schema.Types.ObjectId,
    ref: "Variation",
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  result: { type: Boolean, required: true },
  answer: { type: String, required: true },
});

module.exports = model("Attempt", AttemptSchema);
