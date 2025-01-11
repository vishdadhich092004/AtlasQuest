import { Label } from "@radix-ui/react-label";
import { Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { LatLng } from "@/types";

interface InputCoordinatesProps {
  coordinates: LatLng[];
  add: () => void;
  remove: (id: string) => void;
  update: (id: string, field: "lat" | "lng", value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  validationErrors: {
    [key: string]: string;
  };
}
function InputCoordinates({
  coordinates,
  add,
  remove,
  update,
  handleSubmit,
  validationErrors,
}: InputCoordinatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter US Coordinates</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
            {coordinates.map((coord, index) => (
              <div
                key={coord.id}
                className="p-3 border rounded-lg space-y-2 relative"
              >
                <div className="absolute right-2 top-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(coord.id)}
                    disabled={coordinates.length === 1}
                    className="h-6 w-6"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm font-medium mb-2">
                  Location {index + 1}
                </div>

                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`lat-${coord.id}`}>Latitude</Label>
                    <Input
                      id={`lat-${coord.id}`}
                      type="number"
                      step="any"
                      value={coord.lat}
                      onChange={(e) => update(coord.id, "lat", e.target.value)}
                      placeholder="24.396308° to 49.384358°"
                      className={`mt-1 ${
                        validationErrors[coord.id] ? "border-red-500" : ""
                      }`}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`lng-${coord.id}`}>Longitude</Label>
                    <Input
                      id={`lng-${coord.id}`}
                      type="number"
                      step="any"
                      value={coord.lng}
                      onChange={(e) => update(coord.id, "lng", e.target.value)}
                      placeholder="-125.000000° to -66.934570°"
                      className={`mt-1 ${
                        validationErrors[coord.id] ? "border-red-500" : ""
                      }`}
                    />
                  </div>

                  {validationErrors[coord.id] && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        {validationErrors[coord.id]}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={add}
              className="w-full"
            >
              Add Location
            </Button>

            <Button type="submit" className="w-full">
              Update Map
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default InputCoordinates;
