require("dotenv").config()
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const passport = require("passport")
const userController = require("../controllers/userController")
const bcrypt = require("bcrypt")
const User = require("../models/users")

//POST login
router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      })
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err)
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, process.env.SECRET)
      return res.json({ user, token })
    })
  })(req, res)
})

//POST Register
router.post("/register", (req, res) => {
  const { name, email, password, password2, avatarUrl } = req.body
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" })
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" })
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" })
  }
  if (errors.length > 0) {
    res.send(errors)
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatarUrl
    })
    bcrypt.genSalt(12, (err, salt) => {
      if (err) throw err
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then(user => res.send(user))
          .catch(err => res.status(400).json(err))
      })
    })
    
    // userController
    //   .user_find_one_email(req.body.email)
    //   .then(user => {
    //     if (user) {
    //       let error = "Email Address Exists in Database."
    //       return res.status(400).json(error)
    //     } else {
    //       const newUser = new User({
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password,
    //         avatar: avatarUrl
    //       })
    //       bcrypt.genSalt(12, (err, salt) => {
    //         if (err) throw err
    //         bcrypt.hash(newUser.password, salt, (err, hash) => {
    //           if (err) throw err
    //           newUser.password = hash
    //           newUser
    //             .save()
    //             .then(user => res.send(user))
    //             .catch(err => res.status(400).json(err))
    //         })
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     res.send(err)
    //   })
  }
})

module.exports = router