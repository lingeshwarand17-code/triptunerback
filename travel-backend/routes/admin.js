const express  = require("express");
const router   = express.Router();
const Booking  = require("../models/Booking");
const User     = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");

// All admin routes require login + admin role
router.use(protect, adminOnly);

// Dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const [totalUsers, totalBookings, revenueResult] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Booking.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalBookings,
        totalRevenue: revenueResult[0]?.total || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// All bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("flight", "flightNumber airline from to")
      .populate("hotel", "name location")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// All users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
