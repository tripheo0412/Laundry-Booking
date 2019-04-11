const passportJWT = require("passport-jwt")
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const userController = require("../controllers/userController")
const secret = process.env.SECRET

//Protected route
module.exports = passport => {
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
}
