const express = require("express");
const router = express.Router();

const {
  createReview,
  deleteReview,
} = require("../controllers/reviewController.ts");
const { verifyUser } = require("../utility/verifyToken.ts");

router.post("/:tourId", verifyUser, createReview);
router.delete("/:reviewId", verifyUser, deleteReview);

module.exports = router;
