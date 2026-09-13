import { KpiGrid } from "../components/metro/KpiGrid";
import { ProvenancePanel } from "../components/metro/ProvenancePanel";
import { STATENAME } from "../data/states";
import { useCollection } from "../state/CollectionContext";

export function MetroScreen() {
  const { selectedMetro, sources, go, openSource } = useCollection();
  const metro = selectedMetro;
  const tagged = metro
    ? sources.filter((s) => s.metros === "all" || s.metros === metro.id)
    : [];

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
              <span className="tag">6 sources tagged</span>
              <span className="tag">MSA level</span>
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
          <h2>Sources tagged to this metro</h2>
          <div id="md-sources">
            {tagged.map((s) => (
              <div className="srcrow" key={s.id}>
                <button type="button" className="ttl" onClick={() => openSource(s.id)}>
                  {s.title}
                </button>
                <div className="tags">
                  <span className="tag">{s.cat}</span>
                  <span className="tag">{s.type}</span>
                </div>
                <p>{s.covers}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gap: 18 }}>
          <ProvenancePanel />
          <div className="panel glass">
            <h2>Gaps in coverage</h2>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--ink-2)" }}>
              The BEA factors are populated from the December 2024 release; the BLS, ACS and FBI factors
              are marked “awaiting pull” above rather than estimated, and each names the exact table and
              variable it needs. The community-perspectives source in this collection is opinion and is
              never used as evidence for a factual claim about this metro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
