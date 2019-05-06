"use strict"
const express = require("express")
const router = express.Router()
const Machine = require("../models/machine")
const machineController = require("../controllers/machineController")
router.use(express.static("views"))
router.get("/", (req, res) => {
  machineController
    .machines_get_one_type(req.body.type)
    .then(machine => {
      res.send(machine)
    })
    .catch(err => {
      res.send(err)
    })
})
router.post("/", (req, res) => {
  const newMachine = new Machine({
    type: req.body.type
  })
  newMachine
    .save()
    .then(machine => {
      res.send(machine)
    })
    .catch(err => {
      res.send(err)
    })
})

router.delete("/", (req, res) => {
  machineController
    .machine_delete_type(req.body.type)
    .then(resp => {
      res.send(resp)
    })
    .catch(err => {
      res.send(err)
    })
})
module.exports = router
