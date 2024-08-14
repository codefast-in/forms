const express = require("express");
const {
  home,
  createAdmin,
  signin,
  currentAdmin,
  signout,
} = require("../controller/adminController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

// GET /api/v2/admin/
router.get("/", home);

// POST /api/v2/admin/create-admin       // Temporary API
router.post("/create-admin", createAdmin);

//POST /api/v2/admin/signin
router.post("/signin", signin);

//POST /api/v2/admin/current
router.post("/current", isAuthenticated, currentAdmin);

//GET /api/v2/admin/signout
router.get("/signout", isAuthenticated, signout);

//-----------------

module.exports = router;
