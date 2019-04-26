const express = require("express")
const router = express.Router()
const Machine = require("../models/machine")
const machineController = require("../controllers/machineController")
router.use(express.static("views"))
router.get("/", (req, res) => {
    console.log(req.body.type)
  machineController
    .machines_get_one_type(req.body.type)
    .then(machine => {
      console.log("machine ", machine)
      res.send(machine)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})
router.post("/", (req, res) => {
  const newMachine = new Machine({
    type: req.body.type
  })
  newMachine
    .save()
    .then(machine => {
      console.log("machine ", machine)
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})

router.delete("/", (req, res) => {
  machineController
    .machine_delete_type(req.body.type)
    .then(resp => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
})
module.exports = router
