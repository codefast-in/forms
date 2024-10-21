const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  documentId: { type: String, required: true, unique: true },
  personalDocument: {
    type: Object,
    title: { type: String },
    url: { type: String },
    fileId: { type: String },
  },
});

documentSchema.index(
  { documentId: "text" },
  {
    default_language: "none",
    language_override: "none",
  }
);

module.exports = mongoose.model("document", documentSchema);
