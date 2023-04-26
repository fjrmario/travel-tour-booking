const Tour = require("../models/Tour.ts");
const Booking = require("../models/Booking.ts");

const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "successfully created",
      data: savedTour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again later" });
  }
};

const updateTour = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

const deleteTour = async (req, res) => {
  const id = req.params.id;

  try {
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};

const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");

    res.status(200).json({
      success: true,
      message: "found successfully",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};
const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const tour = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tour.length,
      message: "found successfully",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    const tour = await Tour.find({
      city,
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      count: tour.length,
      message: "found successfully",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

const getFeaturedTour = async (req, res) => {
  try {
    const tour = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      count: tour.length,
      message: "found successfully",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to fetch",
    });
  }
};

// const tourAvailability = async (req, res) => {
//   const { id } = req.params;
//   const { date } = req.query;

//   try {
//     const tour = await Tour.findById(id).populate({
//       path: "bookedBy",
//       match: { bookAt: date },
//       // select: "guestSize",
//     });

//     console.log("serverside", tour);

//     if (!tour) {
//       return res.status(404).json({
//         success: false,
//         message: "Tour not found",
//       });
//     }

//     const totalBooked = tour.bookedBy.reduce(
//       (acc, booking) => acc + booking.guestSize,
//       0
//     );
//     const remainingSlots = tour.maxGroupSize - totalBooked;

//     res.status(200).json({
//       success: true,
//       data: {
//         remainingSlots,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };
const tourAvailability = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  console.log(id);

  try {
    // Find the tour that matches the id parameter
    const tour = await Tour.find({ _id: id });

    // Get all the bookings for the tour
    const bookings = await Booking.find({ tourName: tour[0].title }).populate(
      "tourName"
    );

    // Get the number of bookings on the day of interest
    const bookingCount = bookings.filter(
      (booking) =>
        booking.bookAt.toDateString() === new Date(date).toDateString()
    ).length;

    // Calculate remaining slots
    const remainingSlots = tour[0].bookedSlots - bookingCount;

    res.status(200).json({
      success: true,
      data: {
        remainingSlots,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  updateTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
  tourAvailability,
};
