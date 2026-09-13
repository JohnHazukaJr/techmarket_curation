import type { Source, SourceFact } from "../types/collection";

const PLACE_ALIASES: Record<string, string[]> = {
  austin: ["austin"],
  sarasota: ["sarasota", "north port"],
  miami: ["miami"],
  atlanta: ["atlanta"],
  phoenix: ["phoenix"],
  tampa: ["tampa"],
};

const MSA_COMPARABLE_FORMATS = new Set(["federal table", "tool"]);

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

export function factNamesPlace(fact: SourceFact, metroId: string): boolean {
  const aliases = PLACE_ALIASES[metroId];
  if (!aliases) return false;
  const hay = `${fact.geography} ${fact.text}`.toLowerCase();
  return aliases.some((alias) => hay.includes(alias));
}

export function namedFactsForMetro(
  sources: Source[],
  metroId: string,
): { source: Source; fact: SourceFact }[] {
  return sources
    .filter((source) => isNationalSource(source))
    .flatMap((source) =>
      (source.facts ?? [])
        .filter((fact) => factNamesPlace(fact, metroId))
        .map((fact) => ({ source, fact })),
    );
}

export function geoBadge(source: Source): string {
  if (source.geoLevel === "national") {
    return MSA_COMPARABLE_FORMATS.has(source.format) ? "National / MSA-comparable" : "National";
  }
  if (source.geoLevel === "city") return "City";
  if (source.geoLevel === "region") return "Region · not MSA";
  return "MSA";
}

export function metrosLabel(source: Source): string {
  if (isNationalSource(source)) {
    return MSA_COMPARABLE_FORMATS.has(source.format)
      ? "National / all comparable metros"
      : "National";
  }
  return source.metros.map((id) => `#${id}`).join(", ");
}
