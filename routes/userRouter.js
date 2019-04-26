const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

//Get user information
router.get("/", (req, res) => {
  userController
    .user_find_all()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

router.get("/user", (req, res) => {
  userController
    .user_find_one_email(req.body.email)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

module.exports = router
