import { sourceInCategory } from "../lib/sources";
import { useCollection } from "../state/CollectionContext";

export function AboutScreen() {
  const { sources, categories, metros } = useCollection();

  return (
    <section className="screen" id="s-about">
      <div className="about glass">
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            About &amp; methodology
          </div>
          <h1 style={{ fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.05, marginBottom: 14 }}>
            How I chose sources for a place to live and eventually raise a young family
          </h1>
          <p>
            The question is straightforward: where can a new tech grad actually afford to live and
            eventually raise a young family? I started from housing space, starting pay, jobs,
            safety, schools, childcare, parks, and commuting — not nightlife or dating. Every source
            in this site is one of the {sources.length} annotated records in the collection PDF,
            filed across {categories.length} categories and tagged against {metros.length} OMB
            metros. Numbers on this site come from those 20 sources. If a source does not give a
            comparable metro figure, the cell stays blank. I did not scrape extra wages, rents, or
            ranks from the live web.
          </p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="n">01</span>
            <b>Find</b>
            <p>Start from the agency or page that owns the measurement, then keep the URL as a citation.</p>
          </div>
          <div className="step">
            <span className="n">02</span>
            <b>Evaluate</b>
            <p>Publisher, method, data year versus publication date, and whether the grain is MSA, city, or a larger region.</p>
          </div>
          <div className="step">
            <span className="n">03</span>
            <b>Organize</b>
            <p>File by the kind of information; tag only the places the source actually discusses.</p>
          </div>
          <div className="step">
            <span className="n">04</span>
            <b>Annotate</b>
            <p>What it covers, why it is valuable, who would benefit, and the limitations — in that voice.</p>
          </div>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Geography I refuse to blur
          </div>
          <p>
            HUD’s Sarasota housing analysis stays on North Port–Sarasota–Bradenton. Austin and
            Raleigh community surveys are city limits, not those MSAs. Niche reviews are the city
            named on the page. The Tampa Bay Partnership report is an eight-county region, not the
            Tampa MSA. The RDU thread treats Raleigh and Durham as separate cities. National series
            (BLS, Census, BEA, Zillow, Redfin, MIT, FBI, Levels.fyi, CBRE) can sit on every metro
            page as comparable tables, labeled that way.
          </p>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            The annotated collection
          </div>
          <p>
            This inventory is built from <code>sources.json</code>, so it cannot drift from the
            catalog. When a source names a table but does not give a comparable metro figure, that
            factor stays “awaiting pull” with the vintage, not an estimate.
          </p>
          <div className="libgrid" style={{ marginTop: 16 }}>
            {categories.map((cat) => {
              const items = sources.filter((s) => sourceInCategory(s, cat));
              return (
                <div className="cat glass" key={cat}>
                  <div className="ch">
                    <h2>{cat}</h2>
                    <span className="mono">{items.length}</span>
                  </div>
                  {items.map((s) => (
                    <div key={s.id} className="srcrow">
                      <div className="ttl" style={{ cursor: "default" }}>
                        {s.title}
                      </div>
                      <div className="tags">
                        <span className="tag">{s.pub}</span>
                        <span className="tag">{s.type}</span>
                      </div>
                      <p>{s.covers}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Build
          </div>
          <p>
            Published on GitHub Pages from a typed React app, so the collection can keep growing
            after the course and stand as portfolio work. Geometry is real TopoJSON rendered with
            d3-geo; the same metro records drive the map, the rail, and the comparison view from one
            JSON source of truth. Annotations live in <code>sources.json</code> next to the metro
            file so adding a source is a data edit, not a layout rewrite.
          </p>
          <div className="stackrow" style={{ marginTop: 12 }}>
            <span className="pill">React + TypeScript</span>
            <span className="pill">Vite</span>
            <span className="pill">d3-geo</span>
            <span className="pill">TopoJSON</span>
            <span className="pill">GitHub Actions → Pages</span>
            <span className="pill">Zod-validated JSON</span>
          </div>
        </div>
      </div>
    </section>
  );
}
