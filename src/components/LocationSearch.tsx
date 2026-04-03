import { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface LocationSearchProps {
  onDistanceCalculated: (distanceKm: number, placeName: string) => void;
}

const CALGARY_ORIGIN = "Calgary, AB, Canada";

function LocationSearch({ onDistanceCalculated }: LocationSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    autocompleteRef.current = autocomplete;
  }

  function onPlaceChanged() {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.formatted_address && !place.name) return;

    const destination = place.formatted_address || place.name || "";
    setInputValue(destination);
    setStatus("loading");

    // Use Distance Matrix to get driving distance from Calgary
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [CALGARY_ORIGIN],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, responseStatus) => {
        if (
          responseStatus === "OK" &&
          response &&
          response.rows[0]?.elements[0]?.status === "OK"
        ) {
          // Distance comes back in meters, convert to km
          const distanceMeters = response.rows[0].elements[0].distance.value;
          const distanceKm = Math.round(distanceMeters / 1000);
          const placeName = place.name || destination;
          setStatus("success");
          onDistanceCalculated(distanceKm, placeName);
        } else {
          setStatus("error");
        }
      }
    );
  }

  return (
    <div>
      <label className="block text-sm text-gray-500 mb-1">Job Site Location</label>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: "ca" },
          types: ["geocode"],
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setStatus("idle");
          }}
          placeholder="Search for a city or address..."
          className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </Autocomplete>
      {status === "loading" && (
        <p className="text-xs text-gray-400 mt-1">Calculating distance...</p>
      )}
      {status === "success" && (
        <p className="text-xs text-green-600 mt-1">Distance updated from Calgary</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-500 mt-1">Could not calculate distance</p>
      )}
    </div>
  );
}

export default LocationSearch;