import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "./components/MapComponent";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

function App() {
  return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps Loaded")}>
      <MapComponent />
    </APIProvider>
  );
}

export default App;
