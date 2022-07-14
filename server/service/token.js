const jwt = require('jsonwebtoken');
const tokenModel = require('../model/token');

class Token {

    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '30s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '300s'})
        return {
            accessToken,
            refreshToken // Will be realized without it

        }

    }

    isAccessTokenValid(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS);
        } catch (e) {
            return null;
        }

    }

    // Changes
    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();

        }
        return await tokenModel.create({user: userId, refreshToken});

    }

    // Will be rewritten with using only access token

    isRefreshTokenValid(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH);
        } catch (e) {
            return null;
        }

    }

    async findToken(refreshToken) {
        return await tokenModel.findOne({refreshToken});

    }

    async tokenExpiration(refreshToken) {
        return await tokenModel.deleteOne({refreshToken});

    }

}

module.exports = new Token();
