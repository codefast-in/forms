const formModel = require("../models/indexModel");
const imagekit = require("../utils/imageKit.js").initImageKit();
const documentModel = require("../models/documentModel.js");
const academicModel = require("../models/academicModel.js");
const { generateNumericOTP } = require("../middlewares/uniqueIdGenterator.js");
exports.home = async (req, res, next) => {
  try {
    res.status(200).json({ message: "This is Home Route" });
  } catch (error) {
    res.json(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const otp = generateNumericOTP(10);
    const { name, email, contact, dob } = req.body;
    const file = req.file;
    const modified = Date.now() + file.originalname;
    const { fileId, url } = await imagekit.upload({
      file: file.buffer,
      fileName: modified,
      folder: "Academic",
    });
    const reqData = {
      ...req.body,
      createdBy: req.id,
      image: { fileId: fileId, url },
      userId: "U" + otp,
    };
    const responseData = await formModel(reqData).save();
    res.json({ message: "Form Submitted Successfully!" });
  } catch (error) {
    res.json(error);
  }
};

exports.findOne = async (req, res, next) => {
  const user = await formModel
    .findById(req.params.userid)
    .populate([
      { path: "updatedBy", select: "" },
      { path: "createdBy", select: "" },
      { path: "documents", select: "" },
      { path: "academic", select: "" },
    ])
    .exec();
  if (!user) {
    res.status(500).json({ message: "User Not Found!" });
    return;
  }
  res.status(200).json(user);
};

exports.deleteUser = async (req, res, next) => {
  const user = await formModel.findByIdAndDelete(req.params.userid).exec();
  if (!user) {
    res.status(500).json({ message: "User Not Found!" });
    return;
  }
  await imagekit.deleteFile(user.image.fileId);

  res.status(201).json({ message: "User Deleted Successfully!" });
};

exports.updateUser = async (req, res, next) => {
  try {
    const data = req.body;
    const file = req.file;
    const user = await formModel.findById(req.params.userid).exec();
    if (!user) {
      res.status(500).json({ message: "User Not Found!" });
      return;
    }

    if (file) {
      await imagekit.deleteFile(user.image.fileId);

      const modified = Date.now() + file.originalname;
      const { fileId, url } = await imagekit.upload({
        file: file.buffer,
        fileName: modified,
      });
      user.image = { fileId: fileId, url: url };
    }
    user.updatedBy = req.id;
    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;
    user.dob = req.body.dob;
    user.gender = req.body.gender;
    await user.save();
    res.status(201).json({ message: "User Update Successfully!" });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadDocument = async (req, res, next) => {
  const file = req.file;
  const { title } = req.body;
  if (!title) {
    res.status(404).json({ message: "Fill Title!" });
    return;
  }
  const otp = generateNumericOTP(10);
  const modified = Date.now() + file.originalname;
  const { fileId, url } = await imagekit.upload({
    file: file.buffer,
    fileName: modified,
    folder: "Academic",
  });

  const reqData = {
    documentId: "D" + otp,
    personalDocument: {
      fileId: fileId,
      url: url,
      title: title,
    },
  };
  const doc = await documentModel(reqData).save();
  const user = await formModel.findById(req.params.userId).exec();
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  await user.documents.push(doc._id);
  await user.save();
  res.status(200).json({ message: "Document Upload Successfully!" });
};

exports.updateDocument = async (req, res, next) => {
  try {
    const file = req.file;
    const { title } = req.body;
    const document = await documentModel.findById(req.params.docId).exec();
    if (!document) return res.status(500).json({ message: "Doc. Not Found!" });

    if (file) {
      await imagekit.deleteFile(document.personalDocument.fileId);
      console.log(document.personalDocument.fileId);
      const modified = Date.now() + file.originalname;
      const { fileId, url } = await imagekit.upload({
        file: file.buffer,
        fileName: modified,
      });
      document.personalDocument = { title: title, fileId: fileId, url: url };
      await document.save();
    }
    res.status(200).json({ message: "Doc Update Successfully!" });
  } catch (error) {
    res.json(error.message);
  }
};

exports.deleteDocument = async (req, res, next) => {
  const { userId, docId } = req.body;
  if (!userId) return res.status(500).json({ message: "Pass UserId" });
  if (!docId) return res.status(500).json({ message: "Pass DocId" });
  try {
    const document = await documentModel.findByIdAndDelete(docId).exec();
    if (!document) {
      res.status(500).json({ message: "Doc. Not Found!" });
      return;
    }

    if (document && document.personalDocument) {
      await imagekit.deleteFile(document.personalDocument.fileId);
    }
    const user = await formModel.findById(userId);
    if (!user) return res.status(500).json({ message: "User Not Found!" });
    const isIndex = user.documents.indexOf(docId);
    if (isIndex == -1)
      return res.status(500).json({ message: "doc id not found" });
    user.documents.splice(isIndex);
    user.save();
    res.status(200).json({ message: "Doc Deleted Successfully!", user });
  } catch (error) {
    res.json(error.message);
  }
};

exports.uploadAcademicDetails = async (req, res, next) => {
  const { body } = req;
  const otp = generateNumericOTP(10);
  const reqData = { ...req.body, academicId: "A" + otp };
  const academic = await academicModel(reqData).save();
  const user = await formModel.findById(req.params.userId).exec();
  if (!user) {
    return res.status(500).json({ message: "User Not Found" });
  }
  await user.academic.push(academic._id);
  await user.save();
  res
    .status(200)
    .json({ message: "Document Upload Successfully!", academic, user });
};

exports.updateAcademicDetails = async (req, res, next) => {
  const { body } = req;
  const academic = await academicModel.findByIdAndUpdate(
    req.params.academicId,
    body
  );
  res.status(200).json({ message: "Update Successfully!" });
};

exports.deleteAcademicDetails = async (req, res, next) => {
  const { body } = req;

  const academic = await academicModel.findByIdAndDelete(
    req.body.academicId,
    body
  );
  if (!academic)
    return res.status(500).json({ message: "Academic Details Not Found!" });
  const user = await formModel.findById(req.body.userId);
  if (!user) return res.status(500).json({ message: "User Not Found!" });
  const isIndex = user.academic.indexOf(req.body.academicId);
  if (isIndex == -1)
    return res.status(500).json({ message: "doc id not found" });
  user.academic.splice(isIndex);
  await user.save();
  res.status(200).json({ message: "Delete Successfully!" });
};

exports.read = async (req, res, next) => {
  try {
    const data = await formModel.find().populate([
      { path: "updatedBy", select: "" },
      { path: "createdBy", select: "" },
      { path: "documents", select: "" },
      { path: "academic", select: "" },
    ]);
    res.status(200).json({ meaage: "Rad All Data", data });
  } catch (error) {
    res.json(error.message);
  }
};

exports.searchDocument = async (req, res, next) => {
  try {
    const { text } = req.body;
    const pipeline = [{ $match: { $text: { $search: text } } }];
    const document = await documentModel.aggregate(pipeline);
    res.status(200).json(document);
  } catch (error) {
    res.json(error.message);
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const { text } = req.body;
    const pipeline = [{ $match: { $text: { $search: text } } }];
    const user = await formModel.aggregate(pipeline);
    res.status(200).json(user);
  } catch (error) {
    res.json(error.message);
  }
};
