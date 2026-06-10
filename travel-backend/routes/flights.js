const express = require("express");
const router  = express.Router();
const { searchFlights, getFlightById, createFlight, updateFlight, deleteFlight } =
  require("../controllers/flightController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/search",              searchFlights);
router.get("/:id",                 getFlightById);
router.post(  "/",  protect, adminOnly, createFlight);
router.put(   "/:id", protect, adminOnly, updateFlight);
router.delete("/:id", protect, adminOnly, deleteFlight);

module.exports = router;
