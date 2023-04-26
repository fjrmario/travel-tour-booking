const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBooking,
  getAllBooking,
  getBookingByUser,
  deleteBooking,
  editBooking,
} = require("../controllers/bookingController.ts");
const { verifyUser, verifyAdmin } = require("../utility/verifyToken.ts");

router.post("/:id", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/admin/manage/bookings", verifyAdmin, getAllBooking);
router.get("/manage/bookings", verifyUser, getBookingByUser);
router.delete("/manage/bookings/:id", verifyUser, deleteBooking);
router.put("/manage/bookings/:id", verifyUser, editBooking);

module.exports = router;
