const {Schema, model} = require("mongoose");

const userModel = new Schema({
    email:{type: String, unique: true, required: true},
    pass:{type: String, unique: false, required: true},
    mailConfirm:{type: String},
    isConfirmed:{type: Boolean, default: false},

})

module.exports = model("User", userModel);