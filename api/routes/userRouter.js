const express = require("express")
const router = express.Router()
const userController = require("../controllers/")

//Get user information
router.get("/user", (req, res) => {
  const { email } = req.body
  userController
    .user_get_information(email)
    .then(res => {
      res.send(res)
    })
    .catch(err => console.log(err))
})
