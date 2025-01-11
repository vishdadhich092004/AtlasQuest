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
