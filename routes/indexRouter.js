const express = require("express");
const {
  home,
  create,
  read,
  findOne,
  deleteUser,
  updateUser,
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

//GET  /api/v2/readall
router.get("/readall", isAuthenticated, read);

module.exports = router;
