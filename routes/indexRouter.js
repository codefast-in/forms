const express = require("express");
const {
  home,
  create,
  read,
  findOne,
  deleteUser,
  updateUser,
  uploadDocument,
  uploadAcademicDetails,
  updateDocument,
  deleteDocument,
  deleteAcademicDetails,
  updateAcademicDetails,
  searchOne,
  searchDocument,
  searchUser,
} = require("../controller/indexController");
const router = express.Router();
const upload = require("../middlewares/multer.js");
const { isAuthenticated } = require("../middlewares/auth.js");

//GET  /api/v2/
router.get("/", home);

//POST  /api/v2/create
router.post("/create", isAuthenticated, upload.single("image"), create);

//POST /api/v2/find-one
router.post("/find-one/:userid", isAuthenticated, findOne);

//POST /api/v2/find-one-delete
router.post("/find-one-delete/:userid", isAuthenticated, deleteUser);

//POST /api/v2/find-one-update
router.post(
  "/find-one-update/:userid",
  isAuthenticated,
  upload.single("image"),
  updateUser
);

//POST /api/v2/upload-doc
router.post(
  "/upload-doc/:userId",
  isAuthenticated,
  upload.single("document"),
  uploadDocument
);

//POST /api/v2/upload-doc/${docId}  form Data {file?:File,title?:String}
router.post(
  "/update-doc/:docId",
  isAuthenticated,
  upload.single("document"),
  updateDocument
);

//POST /api/v2/delete-doc/  Json Data {userId?:String,docId?:String}
router.post("/delete-doc/", isAuthenticated, deleteDocument);

//POST /api/v2/upload-acedmic/${userId}  Json Data {course?:String,institute?:String,year?:String,startDate?:String,duration?:String,marks?:Number}
router.post("/upload-acedmic/:userId", isAuthenticated, uploadAcademicDetails);

//POST /api/v2/upload-acedmic/${academicId}  Json Data {course?:String,institute?:String,year?:String,startDate?:String,duration?:String,marks?:Number}
router.post(
  "/update-acedmic/:academicId",
  isAuthenticated,
  updateAcademicDetails
);

//POST /api/v2/delete-acedmic   Json Data {userId?:String,docId?:String}
router.post("/delete-acedmic/", isAuthenticated, deleteAcademicDetails);

//GET  /api/v2/readall
router.get(
  "/readall",
  //  isAuthenticated,
  read
);

//POST  /api/v2/search-one Json Data {text?:String}
router.post("/search-document", isAuthenticated, searchDocument);

//POST  /api/v2/search-one Json Data {text?:String}
router.post("/search-user", isAuthenticated, searchUser);

module.exports = router;
