import React, { useState } from "react";
import { Coordinate, LatLng } from "@/types";
import MapComponent from "./MapComponent";
import InputCoordinates from "./InputCoordinates";
import { US_BOUNDS } from "@/services/constants";

const InputWithMap = () => {
  const [coordinates, setCoordinates] = useState<LatLng[]>([
    { id: "1", lat: "", lng: "" },
  ]);
  const [mapCoordinates, setMapCoordinates] = useState<Coordinate[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const addNewCoordinate = () => {
    setCoordinates([
      ...coordinates,
      { id: crypto.randomUUID(), lat: "", lng: "" },
    ]);
  };

  const removeCoordinate = (id: string) => {
    if (coordinates.length > 1) {
      setCoordinates(coordinates.filter((coord) => coord.id !== id));
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const updateCoordinate = (
    id: string,
    field: "lat" | "lng",
    value: string
  ) => {
    setCoordinates(
      coordinates.map((coord) => {
        if (coord.id === id) {
          return { ...coord, [field]: value };
        }
        return coord;
      })
    );
    // Clear error when input changes
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const isValidCoordinate = (
    value: string,
    type: "lat" | "lng",
    id: string
  ): boolean => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: "Please enter valid numbers for coordinates",
      }));
      return false;
    }

    const bounds = type === "lat" ? US_BOUNDS.lat : US_BOUNDS.lng;
    const isInBounds = num >= bounds.min && num <= bounds.max;

    if (!isInBounds) {
      setValidationErrors((prev) => ({
        ...prev,
        [id]: `Coordinates must be within the continental United States (${
          type === "lat"
            ? "Latitude: 24.396308° to 49.384358°"
            : "Longitude: -125.000000° to -66.934570°"
        })`,
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    let hasErrors = false;

    coordinates.forEach((coord) => {
      if (
        !isValidCoordinate(coord.lat, "lat", coord.id) ||
        !isValidCoordinate(coord.lng, "lng", coord.id)
      ) {
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      const validCoordinates = coordinates.map((coord) => ({
        latitude: parseFloat(coord.lat),
        longitude: parseFloat(coord.lng),
      }));
      setMapCoordinates(validCoordinates);
    }
  };

  return (
    <div className="flex gap-4 p-4 h-screen">
      <InputCoordinates
        coordinates={coordinates}
        add={addNewCoordinate}
        remove={removeCoordinate}
        update={updateCoordinate}
        handleSubmit={handleSubmit}
        validationErrors={validationErrors}
      />
      <MapComponent mapCoordinates={mapCoordinates} />
    </div>
  );
};

export default InputWithMap;
