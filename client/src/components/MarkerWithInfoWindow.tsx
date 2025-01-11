import {
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import { reverseGeocoding } from "../services/reverse-geocoding";
import { Position } from "../types";
import { extractLocationDetails } from "../services/extract-location-details";
import InfoWindowComponent from "./InfoWindow";

const MarkerWithInfoWindow = ({ lat, lng }: Position) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [location, setLocation] = useState<{
    city: string;
    state: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMarkerClick = async () => {
    setInfoWindowShown((isShown) => !isShown);

    if (!infoWindowShown) {
      setLoading(true);
      setError(null);

      try {
        const data = await reverseGeocoding({ lat, lng });
        const locationDetails = extractLocationDetails(data);
        setLocation(locationDetails);
      } catch (err) {
        console.error("Error processing location data:", err);
        setError("Data not availabe in Google Maps API");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat, lng }}
        onClick={handleMarkerClick}
      />

      {infoWindowShown && (
        <InfoWindowComponent
          anchor={marker}
          onClose={handleClose}
          isLoading={loading}
          error={error}
          location={location!}
        />
      )}
    </>
  );
};

export default MarkerWithInfoWindow;
