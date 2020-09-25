const router = require("express").Router();
const { registerController, loginController } = require("./auth.controller");

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
