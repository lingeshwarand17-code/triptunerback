const Booking = require("../models/Booking");
const Flight  = require("../models/Flight");
const Hotel   = require("../models/Hotel");

// @POST /api/bookings  (protected)
exports.createBooking = async (req, res) => {
  try {
    const { bookingType, flightId, hotelId, seatClass, passengers,
            roomType, checkIn, checkOut, guests, totalAmount } = req.body;

    // Validate flight availability
    if (bookingType === "flight") {
      const flight = await Flight.findById(flightId);
      if (!flight) return res.status(404).json({ success: false, message: "Flight not found" });

      const passengerCount = passengers?.length || 1;
      if (flight.availableSeats[seatClass] < passengerCount) {
        return res.status(400).json({ success: false, message: "Not enough seats available" });
      }

      // Reserve seats
      flight.availableSeats[seatClass] -= passengerCount;
      await flight.save();
    }

    const booking = await Booking.create({
      user: req.user._id,
      bookingType,
      flight:      flightId,
      hotel:       hotelId,
      seatClass,
      passengers,
      roomType,
      checkIn,
      checkOut,
      guests,
      totalAmount,
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/bookings/my  (protected) — user's own bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("flight", "flightNumber airline from to departureTime arrivalTime")
      .populate("hotel",  "name location images")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/bookings/:id  (protected)
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id })
      .populate("flight")
      .populate("hotel");

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @PUT /api/bookings/:id/cancel  (protected)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Booking already cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    // Restore flight seats if applicable
    if (booking.bookingType === "flight" && booking.flight) {
      const flight = await Flight.findById(booking.flight);
      if (flight) {
        flight.availableSeats[booking.seatClass] += booking.passengers?.length || 1;
        await flight.save();
      }
    }

    res.json({ success: true, message: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
