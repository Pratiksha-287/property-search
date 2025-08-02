import axios from 'axios';

class GoogleMapsService {
  constructor(private apiKey: string) {}
  

  async searchNearbyPlaces(
    location: { lat: number; lng: number },
    type: string,
    radius: number,
    limit: number
  ) {

    

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const response: any = await axios.get(url, {
      params: {
        location: `${location.lat},${location.lng}`,
        radius,
        type,
        key: this.apiKey,
      },
    });

    console.log('GOOGLE API KEY:', this.apiKey);

    return response.data.results.slice(0, limit).map((place: any) => ({
      name: place.name,
      address: place.vicinity,
      placeId: place.place_id,
      rating: place.rating,
      userRatingsTotal: place.user_ratings_total,
      location: place.geometry.location,
    }));
  }
}


export default GoogleMapsService;
