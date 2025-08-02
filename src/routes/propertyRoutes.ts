import express from 'express';
import Property from '../models/Property';
import GoogleMapsService from '../services/GoogleMapsService';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      propertyType,
      minBedrooms,
      sortBy = 'price',
      page = 1,
      limit = 10,
    } = req.query;

    const query: any = {};

    if (city) query['location.city'] = { $regex: new RegExp(city as string, 'i') };

    if (minPrice || maxPrice) {
      query.price = {
        ...(minPrice ? { $gte: +minPrice } : {}),
        ...(maxPrice ? { $lte: +maxPrice } : {}),
      };
    }
    if (propertyType) query.propertyType = propertyType;
    if (minBedrooms) query.bedrooms = { $gte: +minBedrooms };

    const sortOptions: any = {
      price: 'price',
      date: 'listedDate',
    };

    console.log('Search Query:', query);

    const properties = await Property.find(query)
      .sort({ [sortOptions[sortBy as string] || 'price']: 1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const total = await Property.countDocuments(query);

    res.json({
      total,
      page: +page,
      limit: +limit,
      results: properties,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id/nearby-amenities', async (req, res) => {
  try {
    const { id } = req.params;
    const { types, radius = 3000, limit = 5 } = req.query;

    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    // Temporary mock coordinates (use real coords if added to DB later)
    const coordinates = { lat: 28.6139, lng: 77.2090 }; // Delhi (Connaught Place)

    const mapsService = new GoogleMapsService(process.env.GOOGLE_MAPS_API_KEY!);
    const typesArray = (types as string).split(',');

    const amenities: any = {};

    for (const type of typesArray) {
      amenities[type] = await mapsService.searchNearbyPlaces(coordinates, type, +radius, +limit);
    }

    res.json({
      property: {
        id: property._id,
        title: property.title,
        coordinates,
      },
      amenities,
      searchRadius: radius,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch nearby amenities' });
  }
});


export default router;
