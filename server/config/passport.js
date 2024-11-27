require("dotenv").config();
const User = require("../models/user.model");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      // Ensure your JWT payload contains the correct identifier field (`id` or `_id`)
      const user = await User.findOne({ _id: jwt_payload.id });

      if (user) {
        return done(null, user); // User found
      } else {
        return done(null, false); // User not found
      }
    } catch (err) {
      return done(err, false); // Handle any errors
    }
  })
);
