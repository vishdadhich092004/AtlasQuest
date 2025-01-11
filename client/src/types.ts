export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  city: string;
  state: string;
  coordinate: Coordinate;
}

export interface MapProps {
  coordinates: Coordinate[];
  apiKey: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface GeocodingResponse {
  plus_code: {
    compound_code: string;
  };
  status: string;
}

export interface LatLng {
  id: string;
  lat: string;
  lng: string;
}
