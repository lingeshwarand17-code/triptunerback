const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookingType: { type: String, enum: ["flight", "hotel"], required: true },

    // ── Flight booking fields ─────────────────────────────────────
    flight:     { type: mongoose.Schema.Types.ObjectId, ref: "Flight" },
    seatClass:  { type: String, enum: ["economy", "business", "first"] },
    passengers: [
      {
        name:         String,
        age:          Number,
        passport:     String,
        seatNumber:   String,
      },
    ],

    // ── Hotel booking fields ──────────────────────────────────────
    hotel:       { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    roomType:    { type: String },
    checkIn:     { type: Date },
    checkOut:    { type: Date },
    guests:      { type: Number },

    // ── Common fields ─────────────────────────────────────────────
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    paymentIntentId: { type: String }, // Stripe payment intent ID
    bookingRef:      { type: String, unique: true }, // e.g. "TRV-20240101-XXXX"
  },
  { timestamps: true }
);

// Auto-generate booking reference
bookingSchema.pre("save", function (next) {
  if (!this.bookingRef) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const rand = Math.random().toString(36).substr(2, 6).toUpperCase();
    this.bookingRef = `TRV-${date}-${rand}`;
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
