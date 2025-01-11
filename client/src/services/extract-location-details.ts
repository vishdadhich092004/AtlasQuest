import { GeocodingResponse } from "../types";

export const extractLocationDetails = (data: GeocodingResponse) => {
  const address = data.plus_code.compound_code;
  return address;
};
