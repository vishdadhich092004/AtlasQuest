import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AdBlockerWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkGoogleMapsAPI = async () => {
      try {
        const response = await fetch(
          "https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true"
        );
        if (!response.ok) throw new Error("Blocked by ad blocker");
      } catch (error) {
        console.error("Google Maps API blocked:", error);
        setShowWarning(true);
      }
    };

    checkGoogleMapsAPI();
  }, []);

  if (!showWarning) return null;

  return (
    <Dialog open={showWarning}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ad Blocker Detected</DialogTitle>
          <DialogDescription>
            It seems like your ad blocker is preventing Google Maps from
            loading. Please disable your ad blocker and refresh the page to use
            this feature.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Refresh Page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdBlockerWarning;
