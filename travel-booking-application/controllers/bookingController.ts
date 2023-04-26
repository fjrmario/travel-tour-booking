const Booking = require("../models/Booking.ts");
const Tour = require("../models/Tour.ts");
const jwt = require("jsonwebtoken");
const Cookies = require("js-cookie");

const createBooking = async (req, res) => {
  const { id } = req.params;
  const newBooking = new Booking(req.body);

  try {
    // Find the tour that matches the id parameter
    const tour = await Tour.findById(id);

    // Get all the bookings for the tour
    const bookings = await Booking.find({ tourName: tour.title }).populate(
      "tourName"
    );

    // Get the number of bookings on the day of the new booking
    const bookingCount = bookings.filter(
      (booking) =>
        booking.bookAt.toDateString() === newBooking.bookAt.toDateString()
    ).length;

    // Check if the tour is already at max capacity for the day
    if (bookingCount >= tour.bookedSlots) {
      return res.status(400).json({
        success: false,
        message: "This tour is already at max capacity for the day.",
      });
    }

    // Add the new booking to the tour's bookedBy array
    tour.bookedBy.push(newBooking);

    // Save the changes to the tour
    await tour.save();

    // Save the new booking
    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      // message: "Booked successfully",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking unsuccessful, All fields are required",
    });
  }
};

const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Booking.findById(id);

    res.status(200).json({
      success: true,
      message: "Your Booking here",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Cannot find booking",
    });
  }
};

const getAllBooking = async (req, res) => {
  try {
    const books = await Tour.find();
    console.log(books);

    res.status(200).json({
      success: true,
      message: "Your Booking here",
      data: books,
      length: books.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot find booking",
    });
  }
};

const getBookingByUser = async (req, res) => {
  const accessToken = req.headers.cookie
    ?.split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];
  console.log(accessToken);
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    const booking = await Booking.find({ userEmail: decoded.id });
    console.log(booking);

    res
      .status(200)
      .json({ success: true, message: "Your Booking here", data: booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editBooking = async (req, res) => {
  const id = req.params.id;
  const updatedBooking = req.body;
  try {
    const booking = await Tour.find({ bookedBy: id });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if guest size is valid
    if (
      updatedBooking.guestSize > booking[0].maxGroupSize ||
      updatedBooking.guestSize <= 0
    ) {
      return res.status(400).json({ message: "Invalid guest size" });
    }

    // Check tour availability
    const bookingsOnDate = await Booking.find({
      tourName: booking[0].title,
      bookAt: updatedBooking.bookAt,
    });

    if (bookingsOnDate.length === booking[0].bookedSlots) {
      return res.status(400).json({ message: "Tour is fully booked" });
    }

    const updated = await Booking.findByIdAndUpdate(id, updatedBooking, {
      new: true,
    });

    res.json({ data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBooking,
  getBooking,
  getAllBooking,
  getBookingByUser,
  deleteBooking,
  editBooking,
};
