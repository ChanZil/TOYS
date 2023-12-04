const express = require("express");
const userControler = require("../controllers/user.controller");


const router = express.Router();

router.post("/", userControler.register);
router.post("/login", userControler.login);

module.exports = router;