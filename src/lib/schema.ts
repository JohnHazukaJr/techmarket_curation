import { z } from "zod";

const stateCode = z.enum([
  "AL",
  "AZ",
  "CA",
  "CO",
  "FL",
  "GA",
  "ID",
  "IL",
  "MO",
  "NC",
  "OH",
  "PA",
  "TN",
  "TX",
  "UT",
  "WA",
  "WI",
]);

export const metroSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  state: stateCode,
  lon: z.number(),
  lat: z.number(),
  rpp: z.number().nullable(),
  rppHousing: z.number().nullable(),
  income: z.number().nullable(),
  incomeGrowth: z.number().nullable(),
  salary: z.number().nullable().optional().default(null),
  rent: z.number().nullable().optional().default(null),
  home: z.number().nullable().optional().default(null),
  crime: z.number().nullable().optional().default(null),
});

export const provenanceSchema = z.object({
  source: z.string(),
  table: z.string(),
  vintage: z.string(),
  released: z.string().optional(),
  url: z.string().optional(),
  values: z.record(z.number()).optional(),
  variables: z.record(z.string()).optional(),
  status: z.string().optional(),
  group: z.string().optional(),
});

export const collectionFileSchema = z.object({
  provenance: z.record(provenanceSchema),
  metros: z.array(metroSchema).min(1),
  fillTemplate: z.unknown().optional(),
});

const geoLevel = z.enum(["msa", "city", "region", "national"]);

export const sourceFactSchema = z.object({
  text: z.string().min(1),
  unit: z.string().min(1),
  geography: z.string().min(1),
  dataYear: z.string().min(1),
  published: z.string().min(1),
  note: z.string().optional(),
});

export const sourceSchema = z.object({
  id: z.string().min(1),
  cat: z.string().min(1),
  cats: z.array(z.string()).min(1),
  path: z.string().min(1),
  title: z.string().min(1),
  pub: z.string().min(1),
  type: z.string().min(1),
  format: z.string().min(1),
  url: z.string().url(),
  covers: z.string().min(1),
  value: z.string().min(1),
  aud: z.string().min(1),
  lim: z.string().min(1),
  use: z.string().optional(),
  metros: z.array(z.string()),
  geoLevel,
  geoLabel: z.string().min(1),
  dataYear: z.string().min(1),
  published: z.string().min(1),
  facts: z.array(sourceFactSchema).optional(),
});

export const sourcesFileSchema = z.object({
  categories: z.array(z.string()).min(1),
  slots: z.record(z.array(z.string())).optional().default({}),
  sources: z.array(sourceSchema).min(1),
});
