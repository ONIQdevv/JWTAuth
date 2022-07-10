const Router = require("express").Router
const router = new Router();
const user_controller = require("../controller/user")

router.post(`/register`, user_controller.registration);
router.get(`/confirm/:link`, user_controller.activate);
router.get(`/refresh`, user_controller.refresh);
router.get(`/users`, user_controller.getUsers);
router.post(`/login`, user_controller.login);
router.post(`/logout`, user_controller.logout);

module.exports = router;