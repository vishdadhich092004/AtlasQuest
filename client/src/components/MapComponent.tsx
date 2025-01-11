import { Map } from "@vis.gl/react-google-maps";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795,
};

const coordinates = [
  { latitude: 40.7128, longitude: -74.006 }, // New York City
  { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
  { latitude: 41.8781, longitude: -87.6298 }, // Chicago
  { latitude: 29.7604, longitude: -95.3698 }, // Houston
  { latitude: 33.4484, longitude: -112.074 }, // Phoenix
  { latitude: 39.9526, longitude: -75.1652 }, // Philadelphia
  { latitude: 29.4241, longitude: -98.4936 }, // San Antonio
  { latitude: 32.7157, longitude: -117.1611 }, // San Diego
  { latitude: 32.7767, longitude: -96.797 }, // Dallas
  { latitude: 37.3382, longitude: -121.8863 }, // San Jose
  { latitude: 25.7617, longitude: -80.1918 }, // Miami
  { latitude: 47.6062, longitude: -122.3321 }, // Seattle
  { latitude: 39.7392, longitude: -104.9903 }, // Denver
  { latitude: 42.3601, longitude: -71.0589 }, // Boston
  { latitude: 36.1699, longitude: -115.1398 }, // Las Vegas
];

const mapId = import.meta.env.VITE_MAP_ID as string;
function MapComponent() {
  return (
    <Map
      style={{ width: "100vw", height: "100vh" }}
      defaultCenter={defaultCenter}
      defaultZoom={4}
      gestureHandling={"greedy"}
      mapId={mapId}
    >
      {coordinates.map((location) => (
        <MarkerWithInfoWindow
          key={location.latitude + location.longitude}
          lat={location.latitude}
          lng={location.longitude}
        />
      ))}
    </Map>
  );
}

export default MapComponent;
