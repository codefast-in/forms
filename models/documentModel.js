const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  personalDocument: {
    type: Object,
    title: { type: String },
    url: { type: String },
    fileId: { type: String },
  },
});

module.exports = mongoose.model("document", documentSchema);
