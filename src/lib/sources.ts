import type { Source } from "../types/collection";

export function sourceCategories(source: Source): string[] {
  return source.cats.length ? source.cats : [source.cat];
}

export function isNationalSource(source: Source): boolean {
  return source.geoLevel === "national" || source.metros.length === 0;
}

export function sourceApplies(source: Source, metroId: string): boolean {
  if (isNationalSource(source)) return true;
  return source.metros.includes(metroId);
}

export function sourceInCategory(source: Source, category: string): boolean {
  return sourceCategories(source).includes(category);
}

export function sourceSearchHaystack(source: Source): string {
  return [
    source.title,
    source.pub,
    source.type,
    source.format,
    source.covers,
    source.value,
    source.aud,
    source.lim,
    source.geoLabel,
    source.path,
    ...(source.facts ?? []).map((f) => f.text),
  ]
    .join(" ")
    .toLowerCase();
}

export function geoBadge(source: Source): string {
  if (source.geoLevel === "national") return "National / MSA-comparable";
  if (source.geoLevel === "city") return "City";
  if (source.geoLevel === "region") return "Region · not MSA";
  return "MSA";
}

export function metrosLabel(source: Source): string {
  if (isNationalSource(source)) return "National / all comparable metros";
  return source.metros.map((id) => `#${id}`).join(", ");
}
