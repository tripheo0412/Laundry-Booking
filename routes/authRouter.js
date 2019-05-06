"use strict"
require("dotenv").config()
const express = require("express")
const router = express.Router()
const multer = require("multer")
const jwt = require("jsonwebtoken")
const userController = require("../controllers/userController")
const bcrypt = require("bcrypt")
const User = require("../models/users")
require("dotenv").config()
router.use(express.static("views"))
const secret = process.env.SECRET
const upload = multer()
//POST login
router.post("/login", upload.none(), (req, res) => {
  const email = req.body.email
  const password = req.body.password
  userController.user_find_one_email(email).then(user => {
    if (!user) {
      const response = "Invalid email or password"
      return res.send(response)
    }
    const username = user.name
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.userName
        }
        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
          if (err)
            res.status(500).json({ error: "Error signing token", raw: err })

          res.json({
            success: true,
            token: token,
            user: username
          })
        })
      } else {
        const response = "Invalid email or password"
        res.send(response)
      }
    })
  })
})

//POST Register
router.post("/register", (req, res) => {
  userController
    .user_find_one_email(req.body.email)
    .then(user => {
      if (user) {
        let error = "Email Address Exists in Database."
        return res.send(error)
      } else {
        if (req.body.password != req.body.password2) {
          let error = "Password mismatch!"
          return res.send(error)
        }
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        bcrypt.genSalt(12, (err, salt) => {
          if (err) throw err
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(() => res.redirect("/"))
              .catch(err => res.status(400).json(err))
          })
        })
      }
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router
