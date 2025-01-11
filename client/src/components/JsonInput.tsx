/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Coordinate } from "@/types";
import { US_BOUNDS } from "@/services/constants";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

interface JsonInputProps {
  onSubmit: (coordinates: Coordinate[]) => void;
}

const JsonInput: React.FC<JsonInputProps> = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  const validateCoordinates = (
    coordinates: any[]
  ): coordinates is Coordinate[] => {
    return coordinates.every((coord) => {
      const lat = Number(coord.latitude);
      const lng = Number(coord.longitude);

      if (
        isNaN(lat) ||
        isNaN(lng) ||
        lat < US_BOUNDS.lat.min ||
        lat > US_BOUNDS.lat.max ||
        lng < US_BOUNDS.lng.min ||
        lng > US_BOUNDS.lng.max
      ) {
        return false;
      }

      return true;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const parsedInput = JSON.parse(jsonInput);

      // Validate array structure
      if (!Array.isArray(parsedInput)) {
        throw new Error("Input must be an array of coordinates");
      }

      // Validate coordinate structure
      const hasValidStructure = parsedInput.every(
        (coord) =>
          typeof coord === "object" &&
          coord !== null &&
          "latitude" in coord &&
          "longitude" in coord
      );

      if (!hasValidStructure) {
        throw new Error(
          "Each coordinate must have latitude and longitude properties"
        );
      }

      // Validate coordinate values
      if (!validateCoordinates(parsedInput)) {
        throw new Error(
          `Coordinates must be within the continental United States (Latitude: ${US_BOUNDS.lat.min}° to ${US_BOUNDS.lat.max}°, Longitude: ${US_BOUNDS.lng.min}° to ${US_BOUNDS.lng.max}°)`
        );
      }

      onSubmit(parsedInput);
      setError("");
    } catch (error) {
      if (error instanceof SyntaxError) {
        setError("Invalid JSON format. Please check your input.");
      } else {
        setError(
          error instanceof Error ? error.message : "Invalid input format"
        );
      }
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder={`[
  {"latitude": 40.7128, "longitude": -74.0060},
  {"latitude": 34.0522, "longitude": -118.2437}
]`}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="h-48 font-mono"
          />
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Plot Coordinates
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JsonInput;
