import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

type Property = {
  _id: string;
  title: string;
  price: number;
  location: { city: string };
  bedrooms: number;
  propertyType: string;
};

type ApiResponse = {
  results: Property[];
};

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    propertyType: '',
    sortBy: 'price',
  });

  const fetchProperties = () => {
    axios
      .get<ApiResponse>('http://localhost:5000/api/properties/search', {
        params: {
          city: filters.city || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          minBedrooms: filters.minBedrooms || undefined,
          propertyType: filters.propertyType || undefined,
          sortBy: filters.sortBy || undefined,
        },
      })
      .then((res) => setProperties(res.data.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">Available Properties</h1>

      {/* 🔍 Filter Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <input
          className="border rounded p-2"
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleChange}
        />
        <input
          className="border rounded p-2"
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
        />
        <input
          className="border rounded p-2"
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
        />
        <input
          className="border rounded p-2"
          type="number"
          name="minBedrooms"
          placeholder="Min Bedrooms"
          value={filters.minBedrooms}
          onChange={handleChange}
        />
        <select
          className="border rounded p-2"
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
        </select>
        <select
          className="border rounded p-2"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
        >
          <option value="price">Sort by Price</option>
          <option value="date">Sort by Date</option>
        </select>
        <button
          type="submit"
          className="md:col-span-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Property List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <PropertyCard
            key={prop._id}
            title={prop.title}
            price={prop.price}
            city={prop.location.city}
            bedrooms={prop.bedrooms}
            propertyType={prop.propertyType}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
