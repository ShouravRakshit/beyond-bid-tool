// Beyond Bid Tool — Constants

// Material
export const M3_TO_CUBIC_YARDS = 1.308;
export const LBS_PER_CUBIC_YARD = 100;       // 100 lbs raw material = 1 cubic yard cured
export const WASTE_FACTOR = 0.12;             // 12% waste on injection jobs
export const DRUM_SET_LBS = 1000;             // 1 set = 500 lb A-side + 500 lb B-side
export const DRUM_SET_COST = 2300;            // $2,300 per set delivered

// Pricing
export const SI_PRICE_PER_LB = 13;           // $13/lb charged to client (before waste)

// Labour
export const LABOUR_RATE_PER_HOUR = 40;      // $40/hr per person
export const PAYROLL_BURDEN = 0.20;           // 20% on top of base rate

// Travel & Mobilization
export const HOTEL_PER_NIGHT = 200;           // $200/room/night
export const PER_DIEM_PER_DAY = 75;           // $75/person/day
export const FUEL_COST_PER_KM = 0.50;          // ~30L/100km diesel truck+trailer at ~$1.60/L
export const MOB_CHARGE_FLAT = 2200;          // flat mobilization charge to client (2-day job)
export const EXTENDED_DAY_RATE = 750;         // $750/day for 3rd day onward

// Job Fixed Costs
export const PPE_CONSUMABLES = 150;           // ~$150/job
export const PROPORTIONER_MAINTENANCE = 300;  // ~$300/job
export const MISC_CONSUMABLES = 300;          // ~$300/job
export const OVERHEAD_ALLOCATION = 500;       // ~$500/job minimum

// Escalation
export const ESCALATION_RATE = 0.04;          // 4.0%/year compounded