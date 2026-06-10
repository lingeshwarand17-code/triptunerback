const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    description: { type: String },
    location: {
      city:    { type: String, required: true },
      country: { type: String, required: true },
      address: { type: String },
    },
    images:   [{ type: String }],
    rating:   { type: Number, min: 0, max: 5, default: 0 },
    reviews:  { type: Number, default: 0 },
    amenities: [{ type: String }], // e.g. ["WiFi", "Pool", "Gym"]
    rooms: [
      {
        type:          { type: String }, // "Standard", "Deluxe", "Suite"
        pricePerNight: { type: Number },
        capacity:      { type: Number },
        available:     { type: Boolean, default: true },
        count:         { type: Number, default: 10 },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
