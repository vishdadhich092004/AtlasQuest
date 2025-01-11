import { Map } from "@vis.gl/react-google-maps";
import MarkerWithInfoWindow from "./MarkerWithInfoWindow";
import { Coordinate } from "@/types";
const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795,
};
const mapId = import.meta.env.VITE_MAP_ID as string;

interface MapComponentProps {
  mapCoordinates: Coordinate[];
}
function MapComponent({ mapCoordinates }: MapComponentProps) {
  return (
    <div className="flex-1 h-full">
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={defaultCenter}
        defaultZoom={4}
        gestureHandling={"greedy"}
        mapId={mapId}
        fullscreenControl={false}
        streetViewControl={false}
      >
        {mapCoordinates.map((location) => (
          <MarkerWithInfoWindow
            key={location.latitude + location.longitude}
            lat={location.latitude}
            lng={location.longitude}
          />
        ))}
      </Map>
    </div>
  );
}

export default MapComponent;
