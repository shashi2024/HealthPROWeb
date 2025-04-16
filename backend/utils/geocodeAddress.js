import axios from 'axios';

// Use ES module export syntax
export const geocodeAddress = async (address) => {
    try {
      // Your Azure Maps API Key
      const apiKey = '3fH6bG3YlPTNTW4LZEjRakbLt91IQkrFJuAyKfGQSts0wVFCN4sOJQQJ99BDACYeBjFy7RyrAAAgAZMP29Q7';  // Replace with your actual Azure Maps API key
      const encodedAddress = encodeURIComponent(address);
      
      // Azure Maps geocoding endpoint
      const url = `https://atlas.microsoft.com/search/address/json?api-version=1.0&query=${encodedAddress}&subscription-key=${apiKey}`;
      
      // Making the API request to Azure Maps geocoding API
      const response = await axios.get(url);
      
      // Extracting latitude and longitude from the response
      const position = response.data.results[0]?.position;
      console.log("Position from geocode:", position); 
      
      if (position) {
        return position;
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      console.error('Geocoding API error:', error.message);
      throw new Error('Error geocoding address');
    }
  };
  
