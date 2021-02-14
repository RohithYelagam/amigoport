const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongodata = new Schema({
    clubName: String,
    admin_id: String,
    messages:[{
        from_uid: String,
        timestamp: String,
        msg: String,
    }],
    users: [{
        user_id: String,
        user_name: String
    }]

});

module.exports = mongoose.model('clubs', mongodata);
