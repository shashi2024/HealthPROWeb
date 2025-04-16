import { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MapScreen = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const center = { lat: 6.9271, lng: 79.961 }; // Colombo, Sri Lanka
  const navigate = useNavigate(); // Initialize navigate

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC2nFGz6IFG6vnFWTI7Pa0tqVXVvzNcFJw",
    libraries: ["places"],
  });

  const onMapClick = useCallback((event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Please enter a location.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK") {
        const location = results[0].geometry.location;
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setError(null);
      } else {
        setError("Location not found. Please try again.");
      }
    });
  };

  // Handle marker click to send selected location back to the form
  const handleMarkerClick = () => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: markerPosition.lat, lng: markerPosition.lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        const selectedLocation = results[0].formatted_address;
        // Navigate back to the EmergencyRequestScreen with selected location
        navigate("/emergencyrequest", { state: { selectedLocation } });
      } else {
        setError("Error retrieving location name. Try again.");
      }
    });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div
        style={{
          padding: "10px",
          position: "absolute",
          zIndex: 1,
          top: 120,
          left: 1200,
          width: "300px",
          marginTop: "-50px",
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={markerPosition || center}
        zoom={15}
        onClick={onMapClick}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            onClick={handleMarkerClick} // Pass the selected location back
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapScreen;
