import sourcesRaw from "../data/sources.json";
import type { Collection } from "../types/collection";
import { collectionFileSchema, sourcesFileSchema } from "./schema";

export async function loadCollection(): Promise<Collection> {
  const catalog = sourcesFileSchema.parse(sourcesRaw);
  const res = await fetch(`${import.meta.env.BASE_URL}data/metros.json`);
  if (!res.ok) {
    throw new Error(`Could not load metros.json (${res.status})`);
  }
  const file = collectionFileSchema.parse(await res.json());
  return {
    metros: file.metros,
    provenance: file.provenance,
    sources: catalog.sources,
    categories: catalog.categories,
    slots: catalog.slots ?? {},
  };
}
