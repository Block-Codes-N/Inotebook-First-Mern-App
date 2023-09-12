const mongoose = require("mongoose");

const NotesSchema = new Schema({
  title: { type: String, required: true },
  tags: { type: String, required: true, default: 'general' },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notes", NotesSchema);