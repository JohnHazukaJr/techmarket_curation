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
  rpp: z.number(),
  rppHousing: z.number(),
  income: z.number(),
  incomeGrowth: z.number(),
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

export const sourceSchema = z.object({
  id: z.string().min(1),
  cat: z.string().min(1),
  path: z.string().min(1),
  title: z.string().min(1),
  pub: z.string().min(1),
  type: z.string().min(1),
  url: z.string().url(),
  covers: z.string().min(1),
  value: z.string().min(1),
  aud: z.string().min(1),
  lim: z.string().min(1),
  metros: z.string().min(1),
});

export const sourcesFileSchema = z.object({
  categories: z.array(z.string()).min(1),
  slots: z.record(z.array(z.string())),
  sources: z.array(sourceSchema).min(1),
});
