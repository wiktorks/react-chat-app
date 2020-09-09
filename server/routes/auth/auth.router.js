const router = require("express").Router();
const registerController = require("./auth.controller");

router.post("/register", registerController);

module.exports = router;
