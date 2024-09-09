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

//POST /api/v2/upload-acedmic
router.post("/upload-acedmic/:userId", isAuthenticated, uploadAcademicDetails);

//GET  /api/v2/readall
router.get(
  "/readall",
  //  isAuthenticated,
  read
);

module.exports = router;
