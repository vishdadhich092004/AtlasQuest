import { InfoWindow } from "@vis.gl/react-google-maps";

interface InfoWindowProps {
  anchor: google.maps.marker.AdvancedMarkerElement | null;
  onClose: () => void;
  isLoading: boolean;
  error?: string | null;
  location: {
    city: string;
    state: string;
  };
}
function InfoWindowComponent({
  anchor,
  onClose,
  isLoading,
  error,
  location,
}: InfoWindowProps) {
  return (
    <InfoWindow anchor={anchor} onClose={onClose}>
      <div className="p-4">
        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : location ? (
          <>
            <h2 className="text-lg font-semibold mb-2">Location Details</h2>
            <p className="mb-1">
              <span className="font-medium">City:</span> {location.city}
            </p>
            <p>
              <span className="font-medium">State:</span> {location.state}
            </p>
          </>
        ) : (
          <p className="text-gray-600">No location data available</p>
        )}
      </div>
    </InfoWindow>
  );
}

export default InfoWindowComponent;
