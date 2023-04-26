const Tour = require("../models/Tour.ts");
const Review = require("../models/Review.ts");

const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });

  try {
    const savedReview = await newReview.save();
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review submitted",
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting review",
    });
  }
};

const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const review = await Review.findByIdAndDelete({ _id: reviewId });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createReview, deleteReview };
