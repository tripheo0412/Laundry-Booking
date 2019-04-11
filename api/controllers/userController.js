const user = require('../models/users')

exports.user_find_one_email = (email) => {
    user.findOne({
        email: email
    })
    .then(user => {
        console.log("user find one email ",user)
        return user
    })
    .catch(err => {
        console.log("user find one email error ",err)
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