import type { BidResults } from "../types/bid";

interface BidSummaryProps {
  results: BidResults;
}

function fmt(n: number): string {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD", minimumFractionDigits: 2 });
}

function BidSummary({ results }: BidSummaryProps) {
  return (
    <div className="space-y-6">

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm min-w-0">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold text-green-600 mt-1 truncate">{fmt(results.totalRevenue)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm min-w-0">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-xl font-bold text-orange-500 mt-1 truncate">{fmt(results.totalCost)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm min-w-0">
          <p className="text-sm text-gray-500">Margin ({results.marginPercent.toFixed(1)}%)</p>
          <p className="text-xl font-bold text-blue-600 mt-1 truncate">{fmt(results.margin)}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm min-w-0">
          <p className="text-sm text-gray-500">Contingency Price</p>
          <p className="text-xl font-bold text-purple-600 mt-1 truncate">{fmt(results.contingencyPrice)}</p>
        </div>
      </div>

      {/* --- Material Breakdown --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Material Calculation</h2>
        </div>
        <table className="w-full">
          <tbody className="divide-y divide-gray-100">
            <Row label="Volume" value={`${results.cubicYards.toFixed(3)} yd³`} />
            <Row label="Raw Lbs (before waste)" value={`${results.rawLbs.toFixed(1)} lbs`} />
            <Row label="Order Lbs (with 12% waste)" value={`${results.orderLbs.toFixed(1)} lbs`} />
            <Row label="Drum Sets Required" value={`${results.drumSets} sets`} />
            <Row label="Material Cost" value={fmt(results.materialCost)} highlight />
          </tbody>
        </table>
      </div>

      {/* --- Revenue Breakdown --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Revenue</h2>
        </div>
        <table className="w-full">
          <tbody className="divide-y divide-gray-100">
            <Row label="Foam Revenue (S&I @ $13/lb)" value={fmt(results.foamRevenue)} />
            <Row label="Mobilization Charge" value={fmt(results.mobCharge)} />
            <Row label="Total Revenue" value={fmt(results.totalRevenue)} highlight />
          </tbody>
        </table>
      </div>

      {/* --- Cost Build --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Cost Build</h2>
        </div>
        <table className="w-full">
          <tbody className="divide-y divide-gray-100">
            <Row label="Material (drum sets)" value={fmt(results.materialCost)} />
            <Row label="Labour (burdened)" value={fmt(results.labourCost)} />
            <Row label="Fuel (round trip)" value={fmt(results.fuelCost)} />
            <Row label="Hotel" value={fmt(results.hotelCost)} />
            <Row label="Per Diem (food)" value={fmt(results.perDiemCost)} />
            <Row label="Fixed Costs (PPE, maintenance, misc, overhead)" value={fmt(results.fixedCosts)} />
            <Row label="Total Cost" value={fmt(results.totalCost)} highlight />
          </tbody>
        </table>
      </div>

      {/* --- Contingency --- */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Contingency Pricing</h2>
        </div>
        <table className="w-full">
          <tbody className="divide-y divide-gray-100">
            <Row label="Current Total Revenue" value={fmt(results.totalRevenue)} />
            <Row label="Escalation Rate" value="4.0% / year (compounded)" />
            <Row label="Contingency Price" value={fmt(results.contingencyPrice)} highlight />
          </tbody>
        </table>
      </div>

    </div>
  );
}

/** Reusable table row */
function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <tr className={highlight ? "bg-gray-50" : ""}>
      <td className={`px-5 py-3 text-sm ${highlight ? "font-semibold text-gray-800" : "text-gray-600"}`}>
        {label}
      </td>
      <td className={`px-5 py-3 text-sm text-right ${highlight ? "font-semibold text-gray-800" : "text-gray-800"}`}>
        {value}
      </td>
    </tr>
  );
}

export default BidSummary;