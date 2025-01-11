const baseUrl = "https://maps.googleapis.com/maps/api/geocode";
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
interface Location {
  lat: number;
  lng: number;
}

export const reverseGeocoding = async ({ lat, lng }: Location) => {
  const response = await fetch(
    `${baseUrl}/json?latlng=${lat},${lng}&location_type=ROOFTOP&result_type=street_address&key=${apiKey}`,
    { method: "GET" }
  );
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.statusText);
  }
  return body;
};
