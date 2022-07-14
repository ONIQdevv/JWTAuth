const {Schema, model} = require('mongoose');

const UserModel = new Schema({

    //Mail Confirmation block
    confirmationLink: {type: String},
    isConfirmed: {type: Boolean, default: false},

    //Basic auth block
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true}

});

module.exports = model('User', UserModel);
