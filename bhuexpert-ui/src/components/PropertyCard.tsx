import React from 'react';

interface PropertyCardProps {
  title: string;
  price: number;
  city: string;
  bedrooms: number;
  propertyType: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ title, price, city, bedrooms, propertyType }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-500">{propertyType} in {city}</p>
      <p className="text-gray-700 font-medium mt-2">₹{price.toLocaleString()}</p>
      <p className="text-sm text-gray-500">{bedrooms} bedrooms</p>
    </div>
  );
};

export default PropertyCard;
