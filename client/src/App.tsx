import { APIProvider } from "@vis.gl/react-google-maps";
import InputWithMap from "./components/InputWithMap";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

function App() {
  return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps Loaded")}>
      <InputWithMap />
    </APIProvider>
  );
}

export default App;
