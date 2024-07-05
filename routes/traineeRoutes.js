const express = require("express");
const router = express.Router();
const { getTrainee,
    updateTrainee,
    deleteTrainee,
    getIndividualTrainee,
    postTrainee,
    getTraineeBySubscription } = require("../controllers/traineeController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getTrainee).post(postTrainee)
router.route("/:id").post(updateTrainee);
router.route("/:id") .post(deleteTrainee);
router.route("/:id").get(getIndividualTrainee);

router.route("/subscription/:subscriptionType").get(getTraineeBySubscription)
module.exports = router;
