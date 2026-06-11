const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://lingeshwaran:mangolingesh123@cluster0.yfw7hie.mongodb.net/travel_booking?retryWrites=true&w=majority';

// Use a flexible schema to avoid validation issues
const hotelSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Hotel = mongoose.model('Hotel', hotelSchema);

const sampleTrips = [
  {
    name: 'Dubai Desert & City Tour',
    description: 'Experience the magic of Dubai with desert safaris, Burj Khalifa visits, and luxury shopping.',
    location: { city: 'Dubai', country: 'UAE', address: 'Dubai, UAE' },
    images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'],
    rating: 4.9, reviews: 124, category: 'Adventure', days: 5,
    amenities: ['Desert Safari', 'Burj Khalifa', 'Dubai Mall', 'Hotel Stay'],
    price: 899, isActive: true,
    rooms: [{ roomType: 'Standard', pricePerNight: 899, capacity: 2, available: true, count: 20 }],
  },
  {
    name: 'Bali Tropical Paradise',
    description: 'Discover the enchanting island of Bali with stunning temples, rice terraces, and beautiful beaches.',
    location: { city: 'Bali', country: 'Indonesia', address: 'Bali, Indonesia' },
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'],
    rating: 4.8, reviews: 89, category: 'Beach', days: 7,
    amenities: ['Temple Tours', 'Rice Terrace Trek', 'Beach Access', 'Spa'],
    price: 1199, isActive: true,
    rooms: [{ roomType: 'Standard', pricePerNight: 1199, capacity: 2, available: true, count: 15 }],
  },
  {
    name: 'Romantic Paris Escape',
    description: 'Fall in love with the City of Light. Visit the Eiffel Tower and enjoy French cuisine.',
    location: { city: 'Paris', country: 'France', address: 'Paris, France' },
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80'],
    rating: 4.7, reviews: 210, category: 'Honeymoon', days: 4,
    amenities: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'French Cuisine'],
    price: 750, isActive: true,
    rooms: [{ roomType: 'Standard', pricePerNight: 750, capacity: 2, available: true, count: 10 }],
  },
  {
    name: 'Tokyo City Exploration',
    description: 'Immerse yourself in the vibrant culture of Tokyo from ancient temples to futuristic technology.',
    location: { city: 'Tokyo', country: 'Japan', address: 'Tokyo, Japan' },
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80'],
    rating: 4.8, reviews: 156, category: 'Cultural', days: 6,
    amenities: ['Temple Visits', 'Sushi Tour', 'Mount Fuji Day Trip', 'Shibuya Crossing'],
    price: 950, isActive: true,
    rooms: [{ roomType: 'Standard', pricePerNight: 950, capacity: 2, available: true, count: 12 }],
  },
  {
    name: 'Maldives Luxury Resort',
    description: 'Escape to paradise in the Maldives. Stay in overwater bungalows and snorkel in crystal clear waters.',
    location: { city: 'Maldives', country: 'Maldives', address: 'Maldives' },
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80'],
    rating: 4.9, reviews: 78, category: 'Honeymoon', days: 5,
    amenities: ['Overwater Bungalow', 'Snorkeling', 'Diving', 'Spa', 'All Meals'],
    price: 1499, isActive: true,
    rooms: [{ roomType: 'Standard', pricePerNight: 1499, capacity: 2, available: true, count: 8 }],
  },
  {
    name: 'Historical Rome Tour',
    description: 'Walk through centuries of history in the Eternal City. Visit the Colosseum and Vatican City.',
    location: { city: 'Rome', country: 'Italy', address: 'Rome, Italy' },
    images: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80'],
    rating: 4.6, reviews: 189, category: 'Cultural', days: 5,
    amenities: ['Colosseum Tour', 'Vatican City', 'Italian Cuisine', 'City Walking Tour'],
    price: 699, isActive: true,
    rooms: [{ roomType: 'Standard', pricePerNight: 699, capacity: 2, available: true, count: 15 }],
  },
  {
    name: 'Kerala Backwaters',
    description: 'Experience the serene backwaters of Kerala on a traditional houseboat.',
    location: { city: 'Kerala', country: 'India', address: 'Alleppey, Kerala, India' },
    images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80'],
    rating: 4.7, reviews: 234, category: 'Nature', days: 4,
    amenities: ['Houseboat Stay', 'Ayurvedic Spa', 'Village Tour', 'Kathakali Show'],
    price: 299, isActive: true,
    rooms: [{ roomType: 'Standard', pricePerNight: 299, capacity: 2, available: true, count: 20 }],
  },
  {
    name: 'Switzerland Alps Adventure',
    description: 'Experience the breathtaking beauty of the Swiss Alps with skiing and scenic train rides.',
    location: { city: 'Zurich', country: 'Switzerland', address: 'Swiss Alps, Switzerland' },
    images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80'],
    rating: 4.8, reviews: 145, category: 'Adventure', days: 6,
    amenities: ['Skiing', 'Scenic Train Ride', 'Swiss Chocolate Tour', 'Mountain Hiking'],
    price: 1299, isActive: true,
    rooms: [{ roomType: 'Standard', pricePerNight: 1299, capacity: 2, available: true, count: 10 }],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Hotel.deleteMany({});
    console.log('🗑️ Cleared existing trips');

    const inserted = await Hotel.insertMany(sampleTrips);
    console.log(`✅ Added ${inserted.length} sample trips to database!`);

    inserted.forEach(trip => {
      console.log(`  - ${trip.name} (${trip.location.city})`);
    });

    await mongoose.connection.close();
    console.log('✅ Done!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seedDatabase();
