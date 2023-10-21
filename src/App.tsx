import { useEffect, useState } from "react";
function App() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);
  return (
    <div>
      <h2>Current location</h2>
      {currentLocation?.latitude && (
        <div>latitude - {currentLocation.latitude}</div>
      )}
      {currentLocation?.longitude && (
        <div>longitude - {currentLocation.longitude}</div>
      )}
    </div>
  );
}

export default App;
