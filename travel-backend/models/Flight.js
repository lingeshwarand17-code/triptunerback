const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, unique: true },
    airline:      { type: String, required: true },
    from: {
      city:    { type: String, required: true },
      airport: { type: String, required: true },
      code:    { type: String, required: true }, // e.g. "MAA"
    },
    to: {
      city:    { type: String, required: true },
      airport: { type: String, required: true },
      code:    { type: String, required: true },
    },
    departureTime: { type: Date, required: true },
    arrivalTime:   { type: Date, required: true },
    duration:      { type: String }, // e.g. "2h 30m"
    price: {
      economy:  { type: Number, required: true },
      business: { type: Number },
      first:    { type: Number },
    },
    seats: {
      economy:  { type: Number, default: 150 },
      business: { type: Number, default: 30 },
      first:    { type: Number, default: 10 },
    },
    availableSeats: {
      economy:  { type: Number, default: 150 },
      business: { type: Number, default: 30 },
      first:    { type: Number, default: 10 },
    },
    status: {
      type: String,
      enum: ["scheduled", "delayed", "cancelled", "completed"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);
