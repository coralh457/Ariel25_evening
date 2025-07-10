const { Router } = require("express");
const {
  getToys,
  createToy,
  updateToy,
  deleteToy,
  getToysByPrice,
  getToy,
  getToysCount,
} = require("../../controllers/toys");
const auth = require("../../middleware/auth");

const router = Router();

router.route("/").get(getToys).post(auth, createToy);

router.route("/:id").put(auth, updateToy).delete(auth, deleteToy);

router.route("/prices").get(getToysByPrice);
router.route("/single/:id").get(getToy);
router.route("/count").get(getToysCount);

module.exports = router;
