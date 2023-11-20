var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./model/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      console.log("accessToken : ", accessToken)
      console.log("refreshToken : ", refreshToken)
      console.log("Profile: ", profile);
      try {
        const user = await User.create({
          googleId: profile.id,
          username: profile.name.givenName,
        });
        return callback(null, user);
      } catch (err) {
        return callback(err, null);
      }
    }
  )
);
