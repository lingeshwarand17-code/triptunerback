const stripe  = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/Booking");

// @POST /api/payments/create-intent  (protected)
// Creates a Stripe PaymentIntent — frontend uses client_secret to confirm
exports.createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.paymentStatus === "paid") {
      return res.status(400).json({ success: false, message: "Booking already paid" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   Math.round(booking.totalAmount * 100), // Stripe uses paise/cents
      currency: "inr",
      metadata: { bookingId: booking._id.toString(), bookingRef: booking.bookingRef },
    });

    // Save intent ID to booking
    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/payments/confirm  (protected)
// Called after Stripe confirms payment on frontend
exports.confirmPayment = async (req, res) => {
  try {
    const { bookingId, paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: "paid", status: "confirmed" },
      { new: true }
    );

    res.json({ success: true, message: "Payment confirmed!", booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
