const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../model/user');
const mailService = require('./mail');
const tokenService = require('./token');

const UserData = require('../obj/user-data-transfer');
const ApiError = require('../api-handler');

class User {
    async registration(email, password) {

        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`User with this mail ${email} is already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 4);
        const confirmationLink = uuid.v4(); // random link

        const user = await UserModel.create ({
            email,
            password: hashPassword,
            confirmationLink: confirmationLink

        });

        // User-data
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${confirmationLink}`);
        const dataTransfer = new UserData(user); // ../obj/user-data-transfer

        // JWT part
        const tokens = tokenService.generateTokens({...dataTransfer});
        await tokenService.saveToken(dataTransfer.id, tokens.refreshToken);
        return {...tokens, user: dataTransfer}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})

        if (!user) throw ApiError.BadRequest('Incorrect activation link');

        user.isActivated = true;
        await UserModel.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest("User doesn't exist");
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Incorrect pass');
        }
        const UserData = new UserData(user);
        const tokens = tokenService.generateTokens({...UserData});

        await tokenService.saveToken(UserData.id, tokens.refreshToken);
        return {...tokens, user: UserData}
    }

    async logout(refreshToken) {
        return await tokenService.tokenExpiration(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.isRefreshTokenValid(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) throw ApiError.UnauthorizedError();

        const user = await UserModel.findById(userData.id);
        const UserData = new UserData(user);
        const tokens = tokenService.generateTokens({...UserData});

        await tokenService.saveToken(UserData.id, tokens.refreshToken);

        return {...tokens, user: UserData}
    }

    async getUsers() {
        return UserModel.find();
    }
}

module.exports = new User();
