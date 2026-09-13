import type { StateCode } from "../types/collection";

export const FIPS: Record<StateCode, string> = {
  AL: "01",
  AZ: "04",
  CA: "06",
  CO: "08",
  FL: "12",
  GA: "13",
  ID: "16",
  IL: "17",
  MO: "29",
  NC: "37",
  OH: "39",
  PA: "42",
  TN: "47",
  TX: "48",
  UT: "49",
  WA: "53",
  WI: "55",
};

export const STATENAME: Record<StateCode, string> = {
  AL: "Alabama",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  FL: "Florida",
  GA: "Georgia",
  ID: "Idaho",
  IL: "Illinois",
  MO: "Missouri",
  NC: "North Carolina",
  OH: "Ohio",
  PA: "Pennsylvania",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  WA: "Washington",
  WI: "Wisconsin",
};

export function fipsId(id: string | number | undefined): string {
  return String(id ?? "").padStart(2, "0");
}

export function stateFromFips(id: string | number | undefined): StateCode | undefined {
  const code = fipsId(id);
  return (Object.keys(FIPS) as StateCode[]).find((k) => FIPS[k] === code);
}
