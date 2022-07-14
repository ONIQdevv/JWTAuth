const api_uncaught = require('../api-handler');

module.exports = function (err, req, res) {
    if (err instanceof api_uncaught) {
        return res.status(err.status).json(
            {
                message: err.message, errors: err.errors
            });

    }
    return res.status(500).json(
        {
            message: 'Code 500 - unexpected error..'
        });

};
