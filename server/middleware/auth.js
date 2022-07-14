const api_uncaught = require('../api-handler');
const tokenService = require('../service/token');

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(api_uncaught.UnauthorizedError());
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(api_uncaught.UnauthorizedError());
        }

        const userData = tokenService.isAccessTokenValid(accessToken);
        if (!userData) {
            return next(api_uncaught.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(api_uncaught.UnauthorizedError());
    }
};
