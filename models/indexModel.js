const mongoose = require("mongoose");

const informationSchema = mongoose.Schema(
  {
    userId: { type: String },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", informationSchema);
