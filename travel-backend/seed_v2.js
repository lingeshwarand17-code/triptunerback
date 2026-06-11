const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://lingeshwaran:mangolingesh123@cluster0.yfw7hie.mongodb.net/travel_booking?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI);

const Hotel = mongoose.connection.collection('hotels');

const sampleTrips = [
  {
    name: 'Dubai Desert & City Tour',
    description: 'Experience the magic of Dubai with desert safaris, Burj Khalifa visits, and luxury shopping.',
    location: { city: 'Dubai', country: 'UAE', address: 'Dubai, UAE' },
    images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'],
    rating: 4.9, reviews: 124, category: 'Adventure', days: 5,
    amenities: ['Desert Safari', 'Burj Khalifa', 'Dubai Mall', 'Hotel Stay'],
    price: 899, isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Bali Tropical Paradise',
    description: 'Discover the enchanting island of Bali with stunning temples, rice terraces, and beautiful beaches.',
    location: { city: 'Bali', country: 'Indonesia', address: 'Bali, Indonesia' },
    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80'],
    rating: 4.8, reviews: 89, category: 'Beach', days: 7,
    amenities: ['Temple Tours', 'Rice Terrace Trek', 'Beach Access', 'Spa'],
    price: 1199, isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Romantic Paris Escape',
    description: 'Fall in love with the City of Light. Visit the Eiffel Tower and enjoy French cuisine.',
    location: { city: 'Paris', country: 'France', address: 'Paris, France' },
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80'],
    rating: 4.7, reviews: 210, category: 'Honeymoon', days: 4,
    amenities: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise'],
    price: 750, isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Tokyo City Exploration',
    description: 'Immerse yourself in the vibrant culture of Tokyo from ancient temples to futuristic technology.',
    location: { city: 'Tokyo', country: 'Japan', address: 'Tokyo, Japan' },
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80'],
    rating: 4.8, reviews: 156, category: 'Cultural', days: 6,
    amenities: ['Temple Visits', 'Sushi Tour', 'Mount Fuji Day Trip'],
    price: 950, isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Maldives Luxury Resort',
    description: 'Escape to paradise in the Maldives. Stay in overwater bungalows and snorkel in crystal clear waters.',
    location: { city: 'Maldives', country: 'Maldives', address: 'Maldives' },
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80'],
    rating: 4.9, reviews: 78, category: 'Honeymoon', days: 5,
    amenities: ['Overwater Bungalow', 'Snorkeling', 'Diving', 'Spa'],
    price: 1499, isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Historical Rome Tour',
    description: 'Walk through centuries of history in the Eternal City. Visit the Colosseum and Vatican City.',
    location: { city: 'Rome', country: 'Italy', address: 'Rome, Italy' },
    images: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80'],
    rating: 4.6, reviews: 189, category: 'Cultural', days: 5,
    amenities: ['Colosseum Tour', 'Vatican City', 'Italian Cuisine'],
    price: 699, isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Kerala Backwaters',
    description: 'Experience the serene backwaters of Kerala on a traditional houseboat.',
    location: { city: 'Kerala', country: 'India', address: 'Alleppey, Kerala, India' },
    images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80'],
    rating: 4.7, reviews: 234, category: 'Nature', days: 4,
    amenities: ['Houseboat Stay', 'Ayurvedic Spa', 'Village Tour'],
    price: 299, isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
  {
    name: 'Switzerland Alps Adventure',
    description: 'Experience the breathtaking beauty of the Swiss Alps with skiing and scenic train rides.',
    location: { city: 'Zurich', country: 'Switzerland', address: 'Swiss Alps, Switzerland' },
    images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80'],
    rating: 4.8, reviews: 145, category: 'Adventure', days: 6,
    amenities: ['Skiing', 'Scenic Train Ride', 'Swiss Chocolate Tour'],
    price: 1299, isActive: true, createdAt: new Date(), updatedAt: new Date()
  },
];

mongoose.connection.once('open', async () => {
  try {
    console.log('✅ Connected to MongoDB');
    await Hotel.deleteMany({});
    console.log('🗑️ Cleared existing trips');
    await Hotel.insertMany(sampleTrips);
    console.log('✅ Added 8 sample trips to database!');
    sampleTrips.forEach(t => console.log(`  - ${t.name}`));
    console.log('✅ Done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
});
