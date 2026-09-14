export type MetricKey =
  | "after"
  | "salary"
  | "rent"
  | "home"
  | "rpp"
  | "rppHousing"
  | "crime"
  | "incomeGrowth"
  | "income";

export type StateCode =
  | "AL"
  | "AZ"
  | "CA"
  | "CO"
  | "FL"
  | "GA"
  | "ID"
  | "IL"
  | "MO"
  | "NC"
  | "OH"
  | "PA"
  | "TN"
  | "TX"
  | "UT"
  | "WA"
  | "WI";

export type VisualDirection = "a" | "b";

export type Screen =
  | "map"
  | "metro"
  | "library"
  | "compare"
  | "source"
  | "about";

export type Route =
  | { screen: "map" }
  | { screen: "metro"; id: string }
  | { screen: "library" }
  | { screen: "compare" }
  | { screen: "source"; id: string }
  | { screen: "about" };

export type GeoLevel = "msa" | "city" | "region" | "national";

export interface Metro {
  id: string;
  name: string;
  state: StateCode;
  lon: number;
  lat: number;
  rpp: number | null;
  rppHousing: number | null;
  income: number | null;
  incomeGrowth: number | null;
  salary: number | null;
  rent: number | null;
  home: number | null;
  crime: number | null;
}

export interface ProvenanceRecord {
  source: string;
  table: string;
  vintage: string;
  released?: string;
  url?: string;
  values?: Record<string, number>;
  variables?: Record<string, string>;
  status?: string;
  group?: string;
}

export interface SourceFact {
  text: string;
  unit: string;
  geography: string;
  dataYear: string;
  published: string;
  note?: string;
}

export interface Source {
  id: string;
  cat: string;
  cats: string[];
  path: string;
  title: string;
  pub: string;
  type: string;
  format: string;
  url: string;
  covers: string;
  value: string;
  aud: string;
  lim: string;
  use?: string;
  metros: string[];
  geoLevel: GeoLevel;
  geoLabel: string;
  dataYear: string;
  published: string;
  facts?: SourceFact[];
}

export interface MetricDef {
  k: MetricKey;
  label: string;
  hi: boolean;
  src: string;
  cite: string;
  pending?: string;
  meaning?: string;
  unit: string;
  dataYear: string;
  published: string;
  url: string;
  fmt: (value: number) => string;
}

export interface Collection {
  metros: Metro[];
  provenance: Record<string, ProvenanceRecord>;
  sources: Source[];
  categories: string[];
  slots: Record<string, string[]>;
}
