const express = require("express");
const router  = express.Router();
const { searchHotels, getHotelById, createHotel, updateHotel, deleteHotel } =
  require("../controllers/hotelController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/search",               searchHotels);
router.get("/:id",                  getHotelById);
router.post(  "/",  protect, adminOnly, createHotel);
router.put(   "/:id", protect, adminOnly, updateHotel);
router.delete("/:id", protect, adminOnly, deleteHotel);

module.exports = router;
