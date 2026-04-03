/**
 * BidInputs — everything the user enters in the form.
 */
export interface BidInputs {
  // Job Info
  jobName: string;           // e.g. "Lethbridge Bridge Abutment"
  volumeM3: number;          // cubic meters of void to fill

  // Crew & Schedule
  crewSize: number;          // number of workers
  hoursPerDay: number;       // hours worked per day on site
  jobDays: number;           // days on site doing the work

  // Travel
  distanceKm: number;        // one-way distance from Calgary in km
  hotelRooms: number;        // number of hotel rooms needed
  hotelNights: number;       // number of nights staying
  perDiemDays: number;       // days on per diem 

  // Contingency
  contingencyYears: number;  // how many years out for deferred pricing
}

/**
 * BidResults — everything the tool calculates.
 */
export interface BidResults {
  // Material
  cubicYards: number;        // volume converted from m³
  rawLbs: number;            // lbs needed before waste
  orderLbs: number;          // lbs to order (with waste)
  drumSets: number;          // drum sets to purchase (rounded up)
  materialCost: number;      // cost of drum sets

  // Costs
  labourCost: number;
  fuelCost: number;
  hotelCost: number;
  perDiemCost: number;
  fixedCosts: number;        // PPE + proportioner + misc + overhead
  totalCost: number;         // all costs added up

  // Revenue
  foamRevenue: number;       // what client pays for foam
  mobCharge: number;         // mobilization charge to client
  totalRevenue: number;      // foam revenue + mob charge

  // Margin
  margin: number;            // revenue minus cost
  marginPercent: number;     // margin as a percentage of revenue

  // Contingency 
  contingencyPrice: number;  // escalated total revenue for deferred timeline
}