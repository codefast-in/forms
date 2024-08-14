require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

//db connectivity
require("./models/db");

// logger   --- for post method
app.use(require("morgan")("tiny")); // tiny is for show short error

// cors    - api calling by frontEnd
app.use(require("cors")({ origin: true, credentials: true }));

//bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(cookieparser());

// router   - this is our base url
app.use("/api/v2/", require("./routes/indexRouter.js"));
app.use("/api/v2/admin", require("./routes/adminRoute.js"));

app.listen(4000, console.log("server running on port:4000"));
