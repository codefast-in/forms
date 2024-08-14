const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String, select: false },
  contact: { type: Number },
});

// bcrypt - is used for password authentication encryption
adminSchema.pre("save", function () {
  if (!this.isModified("password")) {
    // if password is not modified dont save
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

// compare password
adminSchema.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//generate Token
adminSchema.methods.getjwttoken = function () {
  const expiresIn = process.env.JWT_EXPIRE || "12h";
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

module.exports = mongoose.model("admin", adminSchema);
