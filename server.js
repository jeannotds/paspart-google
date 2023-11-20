require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const app = express();
const mongoose = require('mongoose');


app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// app.use(function(request, response, next) {
//   if (request.session && !request.session.regenerate) {
//       request.session.regenerate = (cb) => {
//           cb()
//       }
//   }
//   if (request.session && !request.session.save) {
//       request.session.save = (cb) => {
//           cb()
//       }
//   }
//   next()
// })

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    // origin: "http://localhost:3000/",
    origin: "*",
    method: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.use("/auth", authRoute);

const port = process.env.POST || 8080;

app.listen(port, () => console.log(`Listerning on port ${port}...`));
