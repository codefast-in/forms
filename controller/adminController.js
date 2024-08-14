const adminModel = require("../models/adminModel.js");
const { sendtoken } = require("../utils/SendToken.js");

exports.home = async (req, res, next) => {
  res.status(200).json({ message: "This is Home Page!" });
};

exports.createAdmin = async (req, res, next) => {
  const admin = await adminModel(req.body).save();
  res.status(200).json({ message: "Admin Created Successfully!" });
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await adminModel
    .findOne({ email: email })
    .select("+password")
    .exec();
  if (!admin) {
    res.status(500).json({ message: "Email Not Found!" });
    return;
  }

  // bcrypt
  const isMatch = admin.comparepassword(password);
  if (!isMatch) {
    res.status(500).json({ message: "Wrong Password!" });
    return;
  }
  sendtoken(admin, 200, res);
};

exports.currentAdmin = async (req, res, next) => {
  const admin = await adminModel.findById(req.id).exec();
  if (!admin) {
    res.status(500).json({ message: "Please Login First!" });
    return;
  }
  res.status(200).json({ admin });
};

exports.signout = async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully signout!" });
};
