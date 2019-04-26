const Machine = require("../models/machine")

exports.machines_get_all = () => {
  return Machine.find()
    .then(machine => {
      return machine
    })
    .catch(err => {
      return err
    })
}

exports.machines_get_one_type = type => {
  return Machine.findOne({ type: type })
    .then(machine => {
      return machine
    })
    .catch(err => {
      return err
    })
}

exports.machine_create_new = data => {
  return Machine.create(data)
    .then(machine => {
      return machine
    })
    .catch(err => {
      return err
    })
}

exports.machine_delete_type = type => {
  return Machine.deleteOne({ type: type })
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
}
