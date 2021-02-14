const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersdata = new Schema({
    user_id: String,
    user_name: String,
    email: String,
    description: String,
    clubs: [{
        club_name: String,
        messages:[{
            from_uid: String,
            timestamp: String,
            msg: String,
            photo: String,
        }]
    }]
});

module.exports = mongoose.model('users', usersdata);