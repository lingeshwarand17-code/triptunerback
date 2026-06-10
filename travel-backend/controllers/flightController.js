const Flight = require("../models/Flight");

// @GET /api/flights/search?from=MAA&to=DEL&date=2024-12-01&class=economy
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, date, seatClass = "economy" } = req.query;

    const query = { status: "scheduled" };
    if (from) query["from.code"] = from.toUpperCase();
    if (to)   query["to.code"]   = to.toUpperCase();
    if (date) {
      const start = new Date(date);
      const end   = new Date(date);
      end.setDate(end.getDate() + 1);
      query.departureTime = { $gte: start, $lt: end };
    }
    query[`availableSeats.${seatClass}`] = { $gt: 0 };

    const flights = await Flight.find(query).sort({ departureTime: 1 });
    res.json({ success: true, count: flights.length, flights });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @GET /api/flights/:id
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ success: false, message: "Flight not found" });
    res.json({ success: true, flight });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @POST /api/flights  (admin)
exports.createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({ success: true, flight });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @PUT /api/flights/:id  (admin)
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, flight });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @DELETE /api/flights/:id  (admin)
exports.deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Flight deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
