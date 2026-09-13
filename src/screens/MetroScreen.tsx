import { CiteTip } from "../components/cite/CiteTip";
import { KpiGrid } from "../components/metro/KpiGrid";
import { ProvenancePanel } from "../components/metro/ProvenancePanel";
import { STATENAME } from "../data/states";
import {
  geoBadge,
  isNationalSource,
  namedFactsForMetro,
  sourceApplies,
  sourceInCategory,
} from "../lib/sources";
import { useCollection } from "../state/CollectionContext";
import type { Source, SourceFact } from "../types/collection";

const SECTIONS: { title: string; cats: string[] }[] = [
  { title: "Tech jobs and wages", cats: ["Jobs and salaries"] },
  { title: "Housing and rent", cats: ["Housing and affordability"] },
  { title: "Cost of living and family expenses", cats: ["Cost of living"] },
  { title: "Safety and family considerations", cats: ["Safety and family life"] },
  { title: "Resident perspectives", cats: ["Community perspectives"] },
  { title: "Sources and limitations", cats: ["Overall tech-hub comparisons"] },
];

const PLACE_NOTES: Record<string, string> = {
  tampa:
    "The Tampa Bay Partnership report is an eight-county region, not the Tampa MSA. Niche reviews are the City of Tampa.",
  austin: "The Austin community survey covers city limits, not the Austin MSA.",
  raleigh:
    "The Raleigh community survey covers city limits. The RDU thread treats Raleigh and Durham as separate cities, not one MSA.",
  sarasota: "The HUD housing analysis is North Port–Sarasota–Bradenton only.",
};

function FactLine({ source, fact }: { source: Source; fact: SourceFact }) {
  return (
    <p>
      <strong>{fact.text}. </strong>
      <CiteTip
        unit={fact.unit}
        geography={fact.geography}
        dataYear={fact.dataYear}
        published={fact.published}
        href={source.url}
        short={`${fact.dataYear} · ${fact.published}`}
      />
      {fact.note ? ` ${fact.note}` : null}
    </p>
  );
}

function PlaceSource({
  source,
  onOpen,
}: {
  source: Source;
  onOpen: (id: string) => void;
}) {
  const showBadge = source.geoLevel === "city" || source.geoLevel === "region";
  return (
    <div className="srcrow">
      <button type="button" className="ttl" onClick={() => onOpen(source.id)}>
        {source.title}
      </button>
      {showBadge ? (
        <div className="tags">
          <span className="tag" title={source.geoLabel}>
            {geoBadge(source)}
          </span>
        </div>
      ) : null}
      <p>{source.covers}</p>
      {source.facts?.map((fact) => (
        <FactLine key={fact.text} source={source} fact={fact} />
      ))}
    </div>
  );
}

export function MetroScreen() {
  const { selectedMetro, sources, go, openSource } = useCollection();
  const metro = selectedMetro;
  const local = metro
    ? sources.filter((s) => sourceApplies(s, metro.id) && !isNationalSource(s))
    : [];
  const national = metro ? sources.filter((s) => isNationalSource(s)) : [];
  const namedFacts = metro ? namedFactsForMetro(sources, metro.id) : [];
  const note = metro ? PLACE_NOTES[metro.id] : undefined;

  return (
    <section className="screen" id="s-metro">
      <div className="detailhead glass">
        <div>
          <div className="mono" id="md-crumb">
            {metro ? `Map → ${STATENAME[metro.state]} → ${metro.name}` : "Map → Metro"}
          </div>
          <h1 id="md-name">{metro?.name ?? "Metro"}</h1>
          {metro ? (
            <div className="tags" id="md-tags" style={{ marginTop: 10 }}>
              <span className="tag">
                {local.length} place-specific {local.length === 1 ? "source" : "sources"}
              </span>
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" className="btn ghost" onClick={() => go("map")}>
            ← Back to map
          </button>
          <button type="button" className="btn" onClick={() => go("compare")}>
            Compare
          </button>
        </div>
      </div>
      {metro ? <KpiGrid metro={metro} /> : null}
      <div className="twocol">
        <div className="panel glass">
          <h2>Place-specific sources</h2>
          <div id="md-sources">
            {SECTIONS.map((section) => {
              const items = local.filter((s) => section.cats.some((cat) => sourceInCategory(s, cat)));
              if (!items.length) return null;
              return (
                <div key={section.title}>
                  <div className="mono" style={{ marginTop: 12 }}>
                    {section.title}
                  </div>
                  {items.map((s) => (
                    <PlaceSource key={s.id} source={s} onOpen={openSource} />
                  ))}
                </div>
              );
            })}
            {local.length === 0 ? (
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)" }}>
                No place-specific source in the collection. National sources are listed at right.
              </p>
            ) : null}
          </div>
        </div>
        <div style={{ display: "grid", gap: 18 }}>
          <ProvenancePanel />
          {namedFacts.length ? (
            <div className="panel glass">
              <h2>Figures named for this place</h2>
              <div>
                {namedFacts.map(({ source, fact }) => (
                  <div className="srcrow" key={`${source.id}-${fact.text}`}>
                    <button type="button" className="ttl" onClick={() => openSource(source.id)}>
                      {source.title}
                    </button>
                    <FactLine source={source} fact={fact} />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="panel glass">
            <h2>National sources</h2>
            <div>
              {national.map((s) => (
                <div className="srcrow" key={s.id}>
                  <button type="button" className="ttl" onClick={() => openSource(s.id)}>
                    {s.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {note ? (
            <div className="panel glass">
              <h2>A note on geography</h2>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)" }}>{note}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
