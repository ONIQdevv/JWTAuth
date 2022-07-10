const {Schema, model} = require("mongoose");

const tokenModel = new Schema({
    user_data:{type: Schema.Types.ObjectId, ref:"User"},
    refreshToken:{type: String, default: true},

})

module.exports = model("Token", tokenModel);