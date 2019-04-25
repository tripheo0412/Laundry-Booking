const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

//Get user information
router.get("/user", (req, res) => {
  const { email } = req.body
  userController
    .user_find_one_email(email)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

module.exports = router
