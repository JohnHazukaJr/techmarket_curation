import { CiteTip } from "../components/cite/CiteTip";
import { KpiGrid } from "../components/metro/KpiGrid";
import { ProvenancePanel } from "../components/metro/ProvenancePanel";
import { STATENAME } from "../data/states";
import { geoBadge, sourceApplies, sourceInCategory } from "../lib/sources";
import { useCollection } from "../state/CollectionContext";
import type { Source } from "../types/collection";

const SECTIONS: { title: string; cats: string[] }[] = [
  { title: "Tech jobs and wages", cats: ["Jobs and salaries"] },
  { title: "Housing and rent", cats: ["Housing and affordability"] },
  { title: "Cost of living and family expenses", cats: ["Cost of living"] },
  { title: "Safety and family considerations", cats: ["Safety and family life"] },
  { title: "Resident perspectives", cats: ["Community perspectives"] },
  { title: "Sources and limitations", cats: ["Overall tech-hub comparisons"] },
];

function SourceBlock({
  source,
  onOpen,
}: {
  source: Source;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="srcrow">
      <button type="button" className="ttl" onClick={() => onOpen(source.id)}>
        {source.title}
      </button>
      <div className="tags">
        <span className="tag">{source.type}</span>
        <span className="tag" title={source.geoLabel}>
          {geoBadge(source)}
        </span>
      </div>
      <p>{source.covers}</p>
      <p>
        <strong>Why it's here. </strong>
        {source.value}
      </p>
      <p>
        <strong>Limitation. </strong>
        {source.lim}
      </p>
      <p className="mono" style={{ textTransform: "none", letterSpacing: 0 }}>
        {source.geoLabel} · data year {source.dataYear} · published {source.published}
      </p>
      {source.facts?.map((fact) => (
        <p key={fact.text}>
          <strong>{fact.text}. </strong>
          <CiteTip
            unit={fact.unit}
            geography={fact.geography}
            dataYear={fact.dataYear}
            published={fact.published}
            href={source.url}
          />
          {fact.note ? ` ${fact.note}` : null}
        </p>
      ))}
    </div>
  );
}

export function MetroScreen() {
  const { selectedMetro, sources, go, openSource } = useCollection();
  const metro = selectedMetro;
  const tagged = metro ? sources.filter((s) => sourceApplies(s, metro.id)) : [];

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
              <span className="tag">#{metro.id}</span>
              <span className="tag">#{metro.state.toLowerCase()}</span>
              <span className="tag">{tagged.length} sources on this page</span>
              <span className="tag">MSA unless a badge says otherwise</span>
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" className="btn ghost" onClick={() => go("map")}>
            ← Back to map
          </button>
          <button type="button" className="btn" onClick={() => go("compare")}>
            Add to comparison
          </button>
        </div>
      </div>
      {metro ? <KpiGrid metro={metro} /> : null}
      <div className="twocol">
        <div className="panel glass">
          <h2>What I can actually say about living here</h2>
          <div id="md-sources">
            {SECTIONS.map((section) => {
              const items = tagged.filter((s) => section.cats.some((cat) => sourceInCategory(s, cat)));
              return (
                <div key={section.title}>
                  <div className="mono" style={{ marginTop: 12 }}>
                    {section.title}
                  </div>
                  {items.length === 0 ? (
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)" }}>
                      No source in the annotated collection is tagged to this section for this place.
                    </p>
                  ) : (
                    items.map((s) => <SourceBlock key={s.id} source={s} onOpen={openSource} />)
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "grid", gap: 18 }}>
          <ProvenancePanel />
          <div className="panel glass">
            <h2>Gaps and geography</h2>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)" }}>
              Numbers on this page come from the 20 sources. BEA price parities and real income are
              2023 figures released December 12, 2024. Wages, rents, home values, and crime rates
              stay blank because those sources do not give a comparable metro figure here. The
              Orlando article title “nears 80,000” is a 2025 projection that uses 2024 data, not a
              2024 count. City surveys describe city limits, not the MSA. The Tampa Bay Partnership
              report is an eight-county region, not the Tampa MSA. HUD’s housing analysis is North
              Port–Sarasota–Bradenton only. The RDU thread talks about Raleigh and Durham as
              separate cities, not one MSA finding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
