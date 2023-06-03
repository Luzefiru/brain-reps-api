const { Schema, model } = require("mongoose");

const CardSchema = new Schema({
  userId: { type: String, required: true }, // retrieved from clark.dev
  variations: [
    { type: Schema.Types.ObjectId, ref: "Variation", required: true },
  ],
  nextAttemptDate: { type: String, required: true },
  dateCreated: { type: String, required: true },
  attempts: [{ type: Schema.Types.ObjectId, ref: " Attempt", required: true }],
});

module.exports = model("Card", CardSchema);
