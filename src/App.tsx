import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import Header from "./components/Header";
import BidForm from "./components/BidForm";
import BidSummary from "./components/BidSummary";
import type { BidInputs } from "./types/bid";
import { calculateBid } from "./utils/calculations";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
const LIBRARIES: ("places")[] = ["places"];

const DEFAULT_INPUTS: BidInputs = {
  jobName: "Lethbridge Bridge Abutment",
  volumeM3: 18,
  crewSize: 3,
  hoursPerDay: 10,
  jobDays: 2,
  distanceKm: 220,
  hotelRooms: 2,
  hotelNights: 2,
  perDiemDays: 2,
  contingencyYears: 1,
};

function App() {
  const [inputs, setInputs] = useState<BidInputs>(DEFAULT_INPUTS);
  const results = calculateBid(inputs);

 function handleDistanceCalculated(distanceKm: number, placeName: string) {
    // Extract city name
    const cityName = placeName.split(",")[0].trim();
    setInputs((prev) => ({
      ...prev,
      distanceKm,
      jobName: `${cityName} Bridge Abutment`,
    }));
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={LIBRARIES}>
      <div className="min-h-screen bg-gray-50">
        <Header onDistanceCalculated={handleDistanceCalculated} />
        <main className="max-w-6xl mx-auto px-6 py-8">

          {/* Two Column Layout: Form on left, Results on right */}
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2">
              <BidForm inputs={inputs} onChange={setInputs} />
            </div>
            <div className="col-span-3">
              <BidSummary results={results} />
            </div>
          </div>

        </main>
      </div>
    </LoadScript>
  );
}

export default App;