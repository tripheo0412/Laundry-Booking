const user = require('../models/users')

exports.user_get_information = (email) => {
    return user
    .find({ email: email})
    .then(user => {
        return user
    })
    .catch(err => {
        console.log(err)
        return err
    })
} 