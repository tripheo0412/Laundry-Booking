const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

//Get user information
router.get("/user", (req, res) => {
  const { email } = req.body
  userController
    .user_find_one(email)
    .then(res => {
      res.send(res)
    })
    .catch(err => console.log(err))
})


module.exports = router