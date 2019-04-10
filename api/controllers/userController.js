const user = require('../models/users')

exports.user_find_one = (email) => {
    user.findOne({
        email: email
    })
    .then(user => {
        return user
    })
    .catch(err => {
        return err
    })
}

exports.user_find_one_id = (id) => {
    user.findById(id)
    .then(user => {
        return user
    })
    .catch(err => {
        return err
    })
}