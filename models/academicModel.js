const mongoose = require("mongoose");

const academicSchema = mongoose.Schema({
  course: { type: String },
  institute: { type: String },
  year: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  result: { type: String },
  marks: { type: Number },
});

module.exports = mongoose.model("academic", academicSchema);
