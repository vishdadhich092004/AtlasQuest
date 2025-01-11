import { Map } from "@vis.gl/react-google-maps";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795,
};

const coordinates = [
  { latitude: 40.7128, longitude: -74.006 }, // New York
  { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
  { latitude: 41.8781, longitude: -87.6298 }, // Chicago
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
        // <AdvancedMarker
        //   position={{ lat: location.latitude, lng: location.longitude }}
        // />
        <MarkerWithInfoWindow
          lat={location.latitude}
          lng={location.longitude}
        />
      ))}
    </Map>
  );
}

export default MapComponent;
