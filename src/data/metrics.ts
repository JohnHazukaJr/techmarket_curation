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
    label: "BLS metro wages (May 2025 vintage)",
    hi: true,
    src: "bls",
    fmt: (v) => "$" + v.toLocaleString(),
    cite: "BLS May 2025 metro OEWS",
    pending:
      "BLS May 2025 metro OEWS. The source names this vintage but does not give a comparable metro wage figure, so none is shown.",
    unit: "USD annual wage",
    dataYear: "May 2025",
    published: "May 2025 OEWS vintage",
    url: "https://www.bls.gov/oes/current/oessrcma.htm",
  },
  {
    k: "rent",
    label: "Median gross rent",
    hi: false,
    src: "acs",
    fmt: (v) => "$" + v.toLocaleString() + "/mo",
    cite: "Census ACS 2024 DP04",
    pending:
      "Census ACS 2024 DP04. The source names this table but does not give a comparable metro rent figure, so none is shown.",
    unit: "USD per month",
    dataYear: "2024",
    published: "2024 ACS 1-year DP04",
    url: "https://data.census.gov/table/ACSDP1Y2024.DP04",
  },
  {
    k: "home",
    label: "Median home value",
    hi: false,
    src: "acs",
    fmt: (v) => "$" + Math.round(v / 1000) + "k",
    cite: "Census ACS 2024 DP04",
    pending:
      "Census ACS 2024 DP04. The source names this table but does not give a comparable metro home value, so none is shown.",
    unit: "USD",
    dataYear: "2024",
    published: "2024 ACS 1-year DP04",
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
    unit: "index, 100 = U.S. average",
    dataYear: "2023",
    published: "December 12, 2024",
    url: "https://www.bea.gov/data/prices-inflation/regional-price-parities-state-and-metro-area",
  },
  {
    k: "crime",
    label: "FBI reported crime (2024)",
    hi: false,
    src: "fbi",
    fmt: (v) => Math.round(v).toLocaleString(),
    cite: "FBI 2024 reported crimes · released August 5, 2025",
    pending:
      "FBI 2024 reported crimes, released August 5, 2025. The source is a national overview and does not give a comparable metro rate, so none is shown.",
    unit: "reported crimes, national 2024 release",
    dataYear: "2024",
    published: "August 5, 2025",
    url: "https://www.fbi.gov/news/press-releases/fbi-releases-2024-reported-crimes-in-the-nation-statistics",
  },
  {
    k: "incomeGrowth",
    label: "Real income change",
    hi: true,
    src: "bea",
    fmt: (v) => (v > 0 ? "+" : "") + v.toFixed(1) + "%",
    cite: "BEA Table 3, real personal income, 2022→2023 · released Dec 12, 2024",
    pending: "BEA Table 3, real personal income, 2022→2023, released December 12, 2024.",
    unit: "percent change",
    dataYear: "2022–2023",
    published: "December 12, 2024",
    url: "https://www.bea.gov/sites/default/files/2024-12/rpp1224.pdf",
  },
  {
    k: "income",
    label: "Real personal income",
    hi: true,
    src: "bea",
    fmt: (v) => "$" + (v / 1000).toFixed(1) + "B",
    cite: "BEA Table 3, real personal income 2023, constant 2017 $ · released Dec 12, 2024",
    pending: "BEA Table 3, real personal income 2023, released December 12, 2024.",
    unit: "billions of constant 2017 dollars",
    dataYear: "2023",
    published: "December 12, 2024",
    url: "https://www.bea.gov/sites/default/files/2024-12/rpp1224.pdf",
  },
];

export const SOURCED_METRICS = METRICS.filter((m) => m.src === "bea");

export function has(metro: Metro, key: MetricKey): boolean {
  if (key === "after") return false;
  return metro[key] !== null && metro[key] !== undefined;
}

export function live(metro: Metro, metric: MetricDef): boolean {
  if (metric.k === "after") return has(metro, "salary") && has(metro, "rent") && has(metro, "rpp");
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
