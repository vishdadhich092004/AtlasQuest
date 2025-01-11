import { GeocodingResponse } from "../types";

export const extractLocationDetails = (data: GeocodingResponse) => {
  if (!data.results?.[0]?.address_components) {
    throw new Error("Invalid geocoding response");
  }

  const addressComponents = data.results[0].address_components;
  let city = "";
  let state = "";

  addressComponents.forEach((component) => {
    if (component.types.includes("locality")) {
      city = component.long_name;
    }
    if (component.types.includes("administrative_area_level_1")) {
      state = component.long_name;
    }
  });

  if (!city || !state) {
    throw new Error("Could not find city or state in response");
  }

  return { city, state };
};
