var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./model/userModel");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      // console.log("accessToken : ", accessToken)
      // console.log("refreshToken : ", refreshToken)
      // console.log("Profile: ", profile._json);
      try {
        const user = await User.create({
          googleId: profile.id,
          username: profile.name.givenName,
          name: profile.name.family_name,
          email: profile._json.email,
        });

        console.log("user : ", user)
        return callback(null, user);
      } catch (err) {
        return callback(err, null);
      }
    }
  )
);
