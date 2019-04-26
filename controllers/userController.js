const user = require("../models/users")

exports.user_find_one_email = email => {
  return user
    .findOne({
      email: email
    })
    .then(user => {
      console.log("user find one email ", user)
      return user
    })
    .catch(err => {
      console.log("user find one email error ", err)
      return err
    })
}

exports.user_find_one_name = name => {
    return user
      .findOne({
        name: name
      })
      .then(user => {
        console.log("user find one name ", user)
        return user
      })
      .catch(err => {
        console.log("user find one name error ", err)
        return err
      })
  }

exports.user_find_one_id = id => {
  return user
    .findById(id)
    .then(user => {
      return user
    })
    .catch(err => {
      return err
    })
}

exports.user_find_all = () => {
  return user
    .find()
    .then(user => {
      return user
    })
    .catch(err => {
      return err
    })
}

exports.user_create_new = user => {
  return user
    .create(user)
    .then(user => {
      return user
    })
    .catch(err => {
      return err
    })
}
