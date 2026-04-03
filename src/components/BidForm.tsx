import type { BidInputs } from "../types/bid";
import NumberInput from "./NumberInput";

interface BidFormProps {
  inputs: BidInputs;
  onChange: (inputs: BidInputs) => void;
}

function BidForm({ inputs, onChange }: BidFormProps) {
  function updateField(field: keyof BidInputs, value: string) {
    const newInputs = {
      ...inputs,
      [field]: field === "jobName" ? value : (value === "" ? 0 : Number(value)),
    };

    if (field === "jobDays") {
      const days = value === "" ? 0 : Number(value);
      newInputs.hotelNights = days;
      newInputs.perDiemDays = days;
    }

    onChange(newInputs);
  }

  const inputStyle = "w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-6">

      {/* --- Job Info --- */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm text-gray-500 mb-1">Job Name</label>
            <input
              type="text"
              value={inputs.jobName}
              onChange={(e) => updateField("jobName", e.target.value)}
              className={inputStyle}
              placeholder="e.g. Lethbridge Bridge Abutment"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Volume (m³)</label>
            <NumberInput
              value={inputs.volumeM3}
              onChange={(v) => updateField("volumeM3", v)}
              className={inputStyle}
              min="0"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* --- Crew & Schedule --- */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Crew & Schedule</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Crew Size</label>
            <NumberInput
              value={inputs.crewSize}
              onChange={(v) => updateField("crewSize", v)}
              className={inputStyle}
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Hours / Day</label>
            <NumberInput
              value={inputs.hoursPerDay}
              onChange={(v) => updateField("hoursPerDay", v)}
              className={inputStyle}
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Job Days</label>
            <NumberInput
              value={inputs.jobDays}
              onChange={(v) => updateField("jobDays", v)}
              className={inputStyle}
              min="1"
            />
          </div>
        </div>
      </div>

      {/* --- Travel --- */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Travel</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Distance from Calgary (km)</label>
            <NumberInput
              value={inputs.distanceKm}
              onChange={(v) => updateField("distanceKm", v)}
              className={inputStyle}
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Hotel Rooms</label>
            <NumberInput
              value={inputs.hotelRooms}
              onChange={(v) => updateField("hotelRooms", v)}
              className={inputStyle}
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Hotel Nights</label>
            <NumberInput
              value={inputs.hotelNights}
              onChange={(v) => updateField("hotelNights", v)}
              className={inputStyle}
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Per Diem Days</label>
            <NumberInput
              value={inputs.perDiemDays}
              onChange={(v) => updateField("perDiemDays", v)}
              className={inputStyle}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* --- Contingency --- */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contingency</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Deferral Period (years)</label>
            <NumberInput
              value={inputs.contingencyYears}
              onChange={(v) => updateField("contingencyYears", v)}
              className={inputStyle}
              min="0"
              step="1"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default BidForm;