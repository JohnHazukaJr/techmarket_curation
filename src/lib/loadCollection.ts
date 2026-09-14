import metrosRaw from "../../public/data/metros.json";
import sourcesRaw from "../data/sources.json";
import type { Collection } from "../types/collection";
import { collectionFileSchema, sourcesFileSchema } from "./schema";

export async function loadCollection(): Promise<Collection> {
  const catalog = sourcesFileSchema.parse(sourcesRaw);
  const file = collectionFileSchema.parse(metrosRaw);
  return {
    metros: file.metros,
    provenance: file.provenance,
    sources: catalog.sources,
    categories: catalog.categories,
    slots: catalog.slots ?? {},
  };
}
