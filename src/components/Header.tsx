import LocationSearch from "./LocationSearch";

interface HeaderProps {
  onDistanceCalculated: (distanceKm: number, placeName: string) => void;
}

function Header({ onDistanceCalculated }: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src="https://cdn.prod.website-files.com/67994db6ef50e0706c273a8a/679956a5947418610e4741c8_Beyond%20Group%20-%20Horizontal%20Logo.svg"
          alt="Beyond Group"
          className="h-8"
          style={{ filter: "invert(1)" }}
        />
        <span className="text-gray-300 text-sm">|</span>
        <span className="text-gray-700 text-lg font-semibold">Foam Bid Calculator</span>
      </div>

      <div className="flex-1 max-w-md mx-auto">
        <LocationSearch onDistanceCalculated={onDistanceCalculated} />
      </div>
    </header>
  );
}

export default Header;