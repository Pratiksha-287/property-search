import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Property from './models/Property';
import propertyRoutes from './routes/propertyRoutes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('BhuExpert API running 🚀');
});


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/test-property', async (req, res) => {
  const dummy = new Property({
    title: 'Test Home',
    description: 'A great home for testing.',
    price: 123456,
    location: { city: 'Delhi', state: 'Delhi', pincode: '110001' },
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 900,
    amenities: ['Parking', 'Gym'],
    images: [],
    listedDate: new Date(),
    status: 'available',
  });

  await dummy.save();
  res.send('Dummy property added!');
});

