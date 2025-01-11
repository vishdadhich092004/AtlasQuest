import { APIProvider } from "@vis.gl/react-google-maps";
import InputWithMap from "../components/InputWithMap";
import Header from "@/components/Header";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
function HomePage() {
  return (
    <APIProvider apiKey={apiKey} onLoad={() => console.log("Maps Loaded")}>
      <div className="flex flex-col h-screen">
        <Header />
        <InputWithMap />
      </div>
    </APIProvider>
  );
}

export default HomePage;