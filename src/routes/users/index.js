const { Router } = require("express");
const { createUser, loginUser } = require("../../controllers/users");

const router = Router({ mergeParams: true });

router.route("/").post(createUser);
router.route("/login").post(loginUser);

module.exports = router;
