const mongoose = require("mongoose");

const informationSchema = mongoose.Schema(
  {
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "document" }],
    academic: [{ type: mongoose.Schema.Types.ObjectId, ref: "academic" }],
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      // require: true,
    },
    contact: {
      type: String,
      // require: true,
    },
    email: {
      type: String,
    },
    dob: {
      type: String,
    },
    image: {
      type: Object,
      url: "",
      fileId: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    gender: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

informationSchema.index(
  { userId: "text" },
  {
    default_language: "none",
    language_override: "none",
  }
);

module.exports = mongoose.model("user", informationSchema);
