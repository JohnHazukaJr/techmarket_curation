import type { Metro, MetricDef, MetricKey } from "../types/collection";

export const METRICS: MetricDef[] = [
  {
    k: "after",
    label: "Salary after housing",
    hi: true,
    src: "derived",
    fmt: (v) => "$" + Math.round(v / 1000) + "k",
    cite: "Median tech salary − (annual gross rent × BEA price adjustment)",
    pending: "Derived — unlocks automatically once salary and rent are filled in.",
  },
  {
    k: "salary",
    label: "Median tech salary",
    hi: true,
    src: "bls",
    fmt: (v) => "$" + v.toLocaleString(),
    cite: "BLS OEWS, SOC 15-0000, May 2024",
    pending:
      "BLS OEWS metro table, A_MEDIAN for SOC 15-0000. National median for comparison: $104,200 — BLS OEWS 15-0000, May 2023.",
  },
  {
    k: "rent",
    label: "Median gross rent",
    hi: false,
    src: "acs",
    fmt: (v) => "$" + v.toLocaleString() + "/mo",
    cite: "ACS 2024 DP04, variable DP04_0134E",
    pending: "ACS 2024 1-Year Data Profile DP04, variable DP04_0134E.",
  },
  {
    k: "home",
    label: "Median home value",
    hi: false,
    src: "acs",
    fmt: (v) => "$" + Math.round(v / 1000) + "k",
    cite: "ACS 2024 DP04, variable DP04_0089E",
    pending: "ACS 2024 1-Year Data Profile DP04, variable DP04_0089E.",
  },
  {
    k: "rpp",
    label: "Regional price parity",
    hi: false,
    src: "bea",
    fmt: (v) => v.toFixed(1),
    cite: "BEA RPP all items, 2023 · 100 = U.S. average",
  },
  {
    k: "rppHousing",
    label: "Housing price level",
    hi: false,
    src: "bea",
    fmt: (v) => v.toFixed(1),
    cite: "BEA RPP housing rents, 2023 · 100 = U.S. average",
  },
  {
    k: "crime",
    label: "Violent crime /100k",
    hi: false,
    src: "fbi",
    fmt: (v) => Math.round(v).toLocaleString(),
    cite: "FBI Crime Data Explorer, 2024",
    pending: "FBI Crime Data Explorer agency tables, aggregated to MSA.",
  },
  {
    k: "incomeGrowth",
    label: "Real income change",
    hi: true,
    src: "bea",
    fmt: (v) => (v > 0 ? "+" : "") + v.toFixed(1) + "%",
    cite: "BEA real personal income, 2022→2023",
  },
  {
    k: "income",
    label: "Real personal income",
    hi: true,
    src: "bea",
    fmt: (v) => "$" + (v / 1000).toFixed(1) + "B",
    cite: "BEA real personal income 2023, constant 2017 $",
  },
];

export const SOURCED_METRICS = METRICS.filter((m) => !m.pending);

export function has(metro: Metro, key: MetricKey): boolean {
  if (key === "after") return false;
  return metro[key] !== null && metro[key] !== undefined;
}

export function live(metro: Metro, metric: MetricDef): boolean {
  if (metric.k === "after") return has(metro, "salary") && has(metro, "rent");
  return has(metro, metric.k);
}

export function val(metro: Metro, key: MetricKey): number {
  if (key === "after") {
    return (metro.salary ?? 0) - (metro.rent ?? 0) * 12 * (metro.rpp / 100);
  }
  return metro[key] ?? 0;
}

export function metricByKey(key: MetricKey): MetricDef {
  const found = METRICS.find((m) => m.k === key);
  if (!found) throw new Error(`Unknown metric: ${key}`);
  return found;
}
