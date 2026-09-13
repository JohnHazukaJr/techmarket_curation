import { useCollection } from "../../state/CollectionContext";

export function SourceEntry() {
  const { selectedSource, go } = useCollection();
  if (!selectedSource) return null;
  const s = selectedSource;

  return (
    <div className="entry">
      <article className="ann glass">
        <div className="mono" id="se-crumb">
          Source library → {s.cat}
        </div>
        <h1 id="se-title">{s.title}</h1>
        <div className="tags" id="se-tags">
          <span className="tag">{s.type}</span>
          <span className="tag">{s.metros === "all" ? "all metros" : `#${s.metros}`}</span>
        </div>
        <div className="annblock">
          <h3>What it covers</h3>
          <p id="se-covers">{s.covers}</p>
        </div>
        <div className="annblock">
          <h3>Why it's valuable</h3>
          <p id="se-value">{s.value}</p>
        </div>
        <div className="annblock">
          <h3>Who would benefit</h3>
          <p id="se-aud">{s.aud}</p>
        </div>
        <div className="annblock">
          <h3>Limitations</h3>
          <p id="se-lim">{s.lim}</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 6 }}>
          <a className="btn" id="se-url" href={s.url} target="_blank" rel="noopener">
            Visit source ↗
          </a>
          <button type="button" className="btn ghost" onClick={() => go("library")}>
            ← All sources
          </button>
        </div>
      </article>
      <aside className="meta glass">
        <div className="kv">
          <i>Publisher</i>
          <b id="se-pub">{s.pub}</b>
        </div>
        <div className="kv">
          <i>Category path</i>
          <b id="se-path">{s.path}</b>
        </div>
        <div className="kv">
          <i>Source type</i>
          <b id="se-type">{s.type}</b>
        </div>
        <div className="kv">
          <i>Metro tags</i>
          <b id="se-metros">{s.metros === "all" ? "Applies to every tracked metro" : s.metros}</b>
        </div>
        <div className="kv">
          <i>Last checked</i>
          <b>Sep 2026</b>
        </div>
      </aside>
    </div>
  );
}
