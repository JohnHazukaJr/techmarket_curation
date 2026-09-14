import type { Metro, MetricDef, MetricKey } from "../types/collection";

export const METRICS: MetricDef[] = [
  {
    k: "after",
    label: "Salary after housing",
    hi: true,
    src: "derived",
    fmt: (v) => "$" + Math.round(v / 1000) + "k",
    cite: "BLS metro wage − (annual gross rent × BEA price adjustment)",
    pending: "Derived — only appears once a salary and a rent from the annotated collection are both on the page.",
    unit: "USD remaining after rent",
    dataYear: "—",
    published: "—",
    url: "https://www.bls.gov/oes/current/oessrcma.htm",
  },
  {
    k: "salary",
    label: "Computer and math occupations, annual mean",
    hi: true,
    src: "bls",
    fmt: (v) => "$" + v.toLocaleString(),
    cite: "BLS May 2025 OEWS, SOC 15-0000, annual mean, metropolitan area",
    pending: "BLS May 2025 OEWS, Computer and Mathematical Occupations, annual mean.",
    meaning:
      "This is the annual mean for computer and mathematical occupations in the metro. It mixes experience levels, so it is not what I would expect as a new-grad offer, and it is not all-occupations pay.",
    unit: "USD annual mean wage, SOC 15-0000",
    dataYear: "May 2025",
    published: "May 15, 2026",
    url: "https://www.bls.gov/oes/current/oessrcma.htm",
  },
  {
    k: "rent",
    label: "Median gross rent",
    hi: false,
    src: "acs",
    fmt: (v) => "$" + v.toLocaleString() + "/mo",
    cite: "Census ACS 2024 1-year B25064 / DP04, metropolitan statistical area",
    pending: "Census ACS 2024 1-year median gross rent.",
    meaning:
      "Median monthly rent plus utilities for renter households that pay cash rent. It is not a current listing and not a quote for a three-bedroom.",
    unit: "USD per month",
    dataYear: "2024",
    published: "2024 ACS 1-year",
    url: "https://data.census.gov/table/ACSDP1Y2024.DP04",
  },
  {
    k: "home",
    label: "Median home value",
    hi: false,
    src: "acs",
    fmt: (v) => "$" + Math.round(v / 1000) + "k",
    cite: "Census ACS 2024 1-year B25077 / DP04, metropolitan statistical area",
    pending: "Census ACS 2024 1-year median owner-occupied home value.",
    meaning:
      "Median value of owner-occupied homes in the metro. Not a current asking price, and not the HUD average sale I used on the Sarasota source page.",
    unit: "USD",
    dataYear: "2024",
    published: "2024 ACS 1-year",
    url: "https://data.census.gov/table/ACSDP1Y2024.DP04",
  },
  {
    k: "rpp",
    label: "Regional price parity",
    hi: false,
    src: "bea",
    fmt: (v) => v.toFixed(1),
    cite: "BEA RPP all items, 2023 · released Dec 12, 2024 · 100 = U.S. average",
    pending: "BEA Regional Price Parities, 2023, released December 12, 2024.",
    meaning:
      "How expensive everyday prices are here versus a U.S. average of 100. 105 means about 5% above average. This is not a rent quote or a grocery bill.",
    unit: "index, 100 = U.S. average",
    dataYear: "2023",
    published: "December 12, 2024",
    url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area",
  },
  {
    k: "rppHousing",
    label: "Housing price level",
    hi: false,
    src: "bea",
    fmt: (v) => v.toFixed(1),
    cite: "BEA RPP housing rents, 2023 · released Dec 12, 2024 · 100 = U.S. average",
    pending: "BEA housing Regional Price Parities, 2023, released December 12, 2024.",
    meaning:
      "How expensive housing rents are versus a U.S. average of 100. Lower means cheaper housing, not a cheaper city in every other way.",
    unit: "index, 100 = U.S. average",
    dataYear: "2023",
    published: "December 12, 2024",
    url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area",
  },
  {
    k: "crime",
    label: "Violent crime rate",
    hi: false,
    src: "fbi-cde",
    fmt: (v) => v.toFixed(1),
    cite: "FBI CIUS 2024 Table 6, MSA violent crime per 100,000 · released August 5, 2025",
    pending:
      "FBI CIUS 2024 Table 6. Blank when that table has no MSA row for this metro.",
    meaning:
      "Estimated violent crimes per 100,000 people in the metro, from agencies that reported enough of the population. It is not a neighborhood score. Atlanta, Miami, Orlando, Tampa, and Sarasota stay blank because Table 6 has no MSA rate for them.",
    unit: "violent crimes per 100,000 inhabitants",
    dataYear: "2024",
    published: "August 5, 2025",
    url: "https://cde.ucr.cjis.gov/",
  },
  {
    k: "incomeGrowth",
    label: "Real income change",
    hi: true,
    src: "bea",
    fmt: (v) => (v > 0 ? "+" : "") + v.toFixed(1) + "%",
    cite: "BEA Table 3, real personal income, 2022→2023 · released Dec 12, 2024",
    pending: "BEA Table 3, real personal income, 2022→2023, released December 12, 2024.",
    meaning:
      "How much the metro’s total real personal income changed from 2022 to 2023, after inflation. A plus does not mean a typical paycheck went up.",
    unit: "percent change",
    dataYear: "2022–2023",
    published: "December 12, 2024",
    url: "https://www.bea.gov/sites/default/files/2024-12/rpp1224.pdf",
  },
  {
    k: "income",
    label: "Real personal income (metro total)",
    hi: true,
    src: "bea",
    fmt: (v) => "$" + (v / 1000).toFixed(1) + "B",
    cite: "BEA Table 3, real personal income 2023, constant 2017 $ · released Dec 12, 2024",
    pending: "BEA Table 3, real personal income 2023, released December 12, 2024.",
    meaning:
      "All personal income in the metro, in billions of 2017 dollars. Bigger metros show bigger totals. This is not household income or starting tech pay.",
    unit: "billions of constant 2017 dollars",
    dataYear: "2023",
    published: "December 12, 2024",
    url: "https://www.bea.gov/sites/default/files/2024-12/rpp1224.pdf",
  },
];

const MAP_COMPARE_KEYS: MetricKey[] = [
  "salary",
  "rent",
  "home",
  "rpp",
  "rppHousing",
  "incomeGrowth",
  "income",
];

export const SOURCED_METRICS = METRICS.filter((m) => MAP_COMPARE_KEYS.includes(m.k));

export function has(metro: Metro, key: MetricKey): boolean {
  if (key === "after") return false;
  return metro[key] !== null && metro[key] !== undefined;
}

export function live(metro: Metro, metric: MetricDef): boolean {
  if (metric.k === "after") return false;
  return has(metro, metric.k);
}

export function val(metro: Metro, key: MetricKey): number {
  if (key === "after") {
    if (metro.salary == null || metro.rent == null || metro.rpp == null) return 0;
    return metro.salary - metro.rent * 12 * (metro.rpp / 100);
  }
  return metro[key] ?? 0;
}

export function metricByKey(key: MetricKey): MetricDef {
  const found = METRICS.find((m) => m.k === key);
  if (!found) throw new Error(`Unknown metric: ${key}`);
  return found;
}
