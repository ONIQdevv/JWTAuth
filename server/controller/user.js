// const userService = require('../model/user-model');
// const {validationResult} = require('express-validator');
// const ApiError = require('../exceptions/api-error');

class UserActions {
    async activate(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async registration(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(["User", "data"]);
        } catch (e) {
            console.log(e);
        }
    }
}


module.exports = new UserActions();