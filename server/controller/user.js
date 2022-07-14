const userService = require('../service/user');
const {validationResult} = require('express-validator');
const api_uncaught = require('../api-handler');

class Actions {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(api_uncaught.BadRequest(
                    'Bad request - validation error', errors.array()
                    ));
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken',
                userData.refreshToken,
                {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData);

        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email: mail, password} = req.body;
            const userData = await userService.login(mail, password);
            res.cookie('refreshToken',
                userData.refreshToken,
                {
                    httpOnly: true,
                    expires: 1296000000
                });
            return res.json(userData);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies; // This code will be realized with Session Storage - SS (no cookies)
            const token = await userService.logout(refreshToken); // SS
            res.clearCookie('refreshToken'); // SS
            return res.json(token);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const confirmation = req.params.link;
            await userService.activate(confirmation);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies; // SS
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 500000000, httpOnly: true}) // SS
            return res.json(userData);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new Actions();