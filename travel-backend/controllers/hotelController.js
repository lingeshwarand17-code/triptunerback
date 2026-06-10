const Hotel = require("../models/Hotel");

// @GET /api/hotels/search?city=Goa&checkIn=2024-12-01&checkOut=2024-12-05
exports.searchHotels = async (req, res) => {
  try {
    const { city, country, minPrice, maxPrice, rating } = req.query;
    const query = { isActive: true };

    if (city)    query["location.city"]    = new RegExp(city, "i");
    if (country) query["location.country"] = new RegExp(country, "i");
    if (rating)  query.rating = { $gte: Number(rating) };

    const hotels = await Hotel.find(query).sort({ rating: -1 });
    res.json({ success: true, count: hotels.length, hotels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/hotels/:id
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    res.json({ success: true, hotel });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/hotels  (admin)
exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({ success: true, hotel });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @PUT /api/hotels/:id  (admin)
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, hotel });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @DELETE /api/hotels/:id  (admin)
exports.deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
