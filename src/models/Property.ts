import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const PropertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: {
    city: String,
    state: String,
    pincode: String,
  },
  propertyType: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  amenities: [String],
  images: [String],
  listedDate: Date,
  status: String,
});

const Property = mongoose.model('Property', PropertySchema);

export default Property;
