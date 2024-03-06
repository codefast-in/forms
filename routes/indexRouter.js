const express = require("express");
const { home, create, read } = require("../controller/indexController");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//GET  /api/v2/
router.get("/", home);

//POST  /api/v2/create
router.post("/create", upload.single("image"), create);

//GET  /api/v2/readall
router.get("/readall", read);

module.exports = router;
