const router = require("express").Router();
const { registerController, loginController } = require("./auth.controller");

router.post("/register", registerController);

module.exports = router;
