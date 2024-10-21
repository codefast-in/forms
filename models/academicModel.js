const mongoose = require("mongoose");
const { generateNumericOTP } = require("../middlewares/uniqueIdGenterator.js");
const academicSchema = mongoose.Schema({
  academicId: { type: String, required: true, unique: true },
  course: { type: String },
  institute: { type: String },
  year: { type: String },
  startDate: { type: String },
  duration: { type: String },
  result: { type: String },
  marks: { type: Number },
});

module.exports = mongoose.model("academic", academicSchema);
