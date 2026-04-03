import {
  M3_TO_CUBIC_YARDS,
  LBS_PER_CUBIC_YARD,
  WASTE_FACTOR,
  DRUM_SET_LBS,
  DRUM_SET_COST,
  SI_PRICE_PER_LB,
  LABOUR_RATE_PER_HOUR,
  PAYROLL_BURDEN,
  FUEL_COST_PER_KM,
  HOTEL_PER_NIGHT,
  PER_DIEM_PER_DAY,
  MOB_CHARGE_FLAT,
  EXTENDED_DAY_RATE,
  PPE_CONSUMABLES,
  PROPORTIONER_MAINTENANCE,
  MISC_CONSUMABLES,
  OVERHEAD_ALLOCATION,
  ESCALATION_RATE,
} from "./constants";

import type { BidInputs, BidResults } from "../types/bid";


/**
 * Convert volume in cubic meters to raw lbs of foam needed (before waste).
 *
 * The chain: m³ → cubic yards → raw lbs
 * Example: 18 m³ × 1.308 = 23.544 yd³ × 100 = 2,354.4 lbs
 
 */
export function calculateRawLbs(volumeM3: number): number {
  const cubicYards = volumeM3 * M3_TO_CUBIC_YARDS;
  const rawLbs = cubicYards * LBS_PER_CUBIC_YARD;
  return rawLbs;
}


/**
 * Apply waste factor to get order quantity.
 *
 * Injection jobs waste ~12% of material (overflow, imperfect expansion, etc.)
 * So you order more than you need.

 */
export function calculateOrderLbs(rawLbs: number): number {
  return rawLbs * (1 + WASTE_FACTOR);
}

/**
 * Calculate drum sets needed and material cost.
 *
 * Each drum set = 1,000 lbs (500 lb A-side + 500 lb B-side)
 * You can't buy a partial set, so always round UP.
 */
export function calculateDrumSets(orderLbs: number): number {
  return Math.ceil(orderLbs / DRUM_SET_LBS);
}

export function calculateMaterialCost(drumSets: number): number {
  return drumSets * DRUM_SET_COST;
}

/**
 * Calculate foam revenue
 */
export function calculateFoamRevenue(rawLbs: number): number {
  return rawLbs * SI_PRICE_PER_LB;
}

/**
 * Calculate labour cost.
*/
export function calculateLabourCost(
  crewSize: number,
  hoursPerDay: number,
  jobDays: number
): number {
  const burdenedRate = LABOUR_RATE_PER_HOUR * (1 + PAYROLL_BURDEN);
  return crewSize * hoursPerDay * jobDays * burdenedRate;
}


/**
 * Calculate fuel cost.
*/
export function calculateFuelCost(distanceKm: number): number {
  const roundTrip = distanceKm * 2;
  return roundTrip * FUEL_COST_PER_KM;
}

/**
 * Calculate hotel cost.
*/
export function calculateHotelCost(
  rooms: number,
  nights: number
): number {
  return rooms * nights * HOTEL_PER_NIGHT;
}

/**
 * Calculate per diem (food) cost.

 */
export function calculatePerDiemCost(
  crewSize: number,
  days: number
): number {
  return crewSize * days * PER_DIEM_PER_DAY;
}

/**
 Calculate mobilization charge to the client.
 
 */
export function calculateMobCharge(jobDays: number): number {
  const extraDays = Math.max(0, jobDays - 2);
  return MOB_CHARGE_FLAT + extraDays * EXTENDED_DAY_RATE;
}

/**
 Calculate fixed job costs.

 */
export function calculateFixedCosts(): number {
  return PPE_CONSUMABLES + PROPORTIONER_MAINTENANCE + MISC_CONSUMABLES + OVERHEAD_ALLOCATION;
}

/**
 Calculate total cost to Beyond (everything they spend).
*/
export function calculateTotalCost(
  materialCost: number,
  labourCost: number,
  fuelCost: number,
  hotelCost: number,
  perDiemCost: number,
  fixedCosts: number
): number {
  return materialCost + labourCost + fuelCost + hotelCost + perDiemCost + fixedCosts;
}

/**
 * Calculate total revenue
 */
export function calculateTotalRevenue(
  foamRevenue: number,
  mobCharge: number
): number {
  return foamRevenue + mobCharge;
}

/**
 * Calculate margin.
 *
 */
export function calculateMargin(
  totalRevenue: number,
  totalCost: number
): number {
  return totalRevenue - totalCost;
}

/**
 Calculate contingency price for deferred timeline.
 
 */
export function calculateContingencyPrice(
  totalRevenue: number,
  years: number
): number {
  return totalRevenue * Math.pow(1 + ESCALATION_RATE, years);
}


/**
 * Master function: takes all user inputs, runs every calculation,
 * and returns the complete bid results.

 */
export function calculateBid(inputs: BidInputs): BidResults {
  // Material chain
  const rawLbs = calculateRawLbs(inputs.volumeM3);
  const cubicYards = inputs.volumeM3 * M3_TO_CUBIC_YARDS;
  const orderLbs = calculateOrderLbs(rawLbs);
  const drumSets = calculateDrumSets(orderLbs);
  const materialCost = calculateMaterialCost(drumSets);

  // Revenue
  const foamRevenue = calculateFoamRevenue(rawLbs);
  const mobCharge = calculateMobCharge(inputs.jobDays);
  const totalRevenue = calculateTotalRevenue(foamRevenue, mobCharge);

  // Costs
  const labourCost = calculateLabourCost(inputs.crewSize, inputs.hoursPerDay, inputs.jobDays);
  const fuelCost = calculateFuelCost(inputs.distanceKm);
  const hotelCost = calculateHotelCost(inputs.hotelRooms, inputs.hotelNights);
  const perDiemCost = calculatePerDiemCost(inputs.crewSize, inputs.perDiemDays);
  const fixedCosts = calculateFixedCosts();
  const totalCost = calculateTotalCost(materialCost, labourCost, fuelCost, hotelCost, perDiemCost, fixedCosts);

  // Margin
  const margin = calculateMargin(totalRevenue, totalCost);
  const marginPercent = totalRevenue > 0 ? (margin / totalRevenue) * 100 : 0;

  // Contingency
  const contingencyPrice = calculateContingencyPrice(totalRevenue, inputs.contingencyYears);

  return {
    cubicYards,
    rawLbs,
    orderLbs,
    drumSets,
    materialCost,
    labourCost,
    fuelCost,
    hotelCost,
    perDiemCost,
    fixedCosts,
    totalCost,
    foamRevenue,
    mobCharge,
    totalRevenue,
    margin,
    marginPercent,
    contingencyPrice,
  };
}