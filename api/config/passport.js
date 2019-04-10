const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const userController = require("../controllers/userController")
const secret = process.env.SECRET
//Login strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, cb) => {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return userController
        .user_find_one(email)
        .then(user => {
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return cb(null, user)
            } else {
              return cb(null, false, { message: "Password incorrect" })
            }
          })
        })
        .catch(err => cb(err))
    }
  )
)

//Protected route
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret
    },
    (jwtPayload, cb) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return userController
        .user_find_one_id(jwtPayload.id)
        .then(user => {
          return cb(null, user)
        })
        .catch(err => {
          return cb(err)
        })
    }
  )
)

//
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  userController.user_find_one_id(id, (err, user) => {
    done(err, user)
  })
})
