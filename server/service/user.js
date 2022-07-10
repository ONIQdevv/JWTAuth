const bcrypt = require("bcrypt");
const uuid = require("uuid");

const UserModel = require("../model/user");
const mailService = require("./mail")

class UserService {

    async registration (mail, pass){

        const authorized = await UserModel.findOne({mail})
        if(authorized != null) throw new Error(`User ${mail} is already exists. Please try another e-mail`);

        const link = uuid.v5(); // Generate link to confirm
        const pass_hash = await bcrypt.hash(pass, 5); // Password hash
        const user = await UserModel.create({mail, pass: pass_hash, link});

        await mailService.sendLink(mail, link);

    }

}

module.exports = new UserService();