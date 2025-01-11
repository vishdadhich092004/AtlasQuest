import { InfoWindow } from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InfoWindowProps {
  anchor: google.maps.marker.AdvancedMarkerElement | null;
  onClose: () => void;
  isLoading: boolean;
  error?: string | null;
  location?: string;
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
      <Card className="w-[300px] border-none shadow-none">
        {isLoading ? (
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              <p className="text-sm text-muted-foreground">
                Fetching location data...
              </p>
            </div>
          </CardContent>
        ) : error ? (
          <Alert variant="destructive" className="border-none">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : location ? (
          <>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-primary">
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-sm font-medium">{location}</p>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-4">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No location data available
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </InfoWindow>
  );
}

export default InfoWindowComponent;
