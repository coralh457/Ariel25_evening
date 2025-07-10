const { Router } = require("express");
const users = require("./users");
const toys = require("./toys");
const router = Router();

router.use("/users", users);
router.use("/toys", toys);

module.exports = router;
