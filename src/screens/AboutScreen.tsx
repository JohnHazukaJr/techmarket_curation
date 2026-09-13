import { useCollection } from "../state/CollectionContext";

export function AboutScreen() {
  const { sources, categories, metros } = useCollection();

  return (
    <section className="screen" id="s-about">
      <div className="about glass">
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            About
          </div>
          <h1 style={{ fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.05, marginBottom: 14 }}>
            How I chose sources for a place to live and eventually raise a young family
          </h1>
          <p>
            Where can a new tech grad actually afford to live and eventually raise a young family? I
            started from housing space, starting pay, jobs, safety, schools, childcare, parks, and
            commuting. This site holds {sources.length} annotated sources across {categories.length}{" "}
            topics and {metros.length} metros. Numbers come from those sources. If a source does not
            give a comparable metro figure, I leave the cell blank.
          </p>
          <p>
            How to use this site: start on the map, open a metro for place-specific notes, read
            every annotation in the library, and compare three metros on the BEA measures we have.
          </p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="n">01</span>
            <b>Find</b>
            <p>Start from the page that owns the measurement, and keep the URL as a citation.</p>
          </div>
          <div className="step">
            <span className="n">02</span>
            <b>Evaluate</b>
            <p>Publisher, method, data year versus publication date, and whether the grain is MSA, city, or a larger region.</p>
          </div>
          <div className="step">
            <span className="n">03</span>
            <b>Organize</b>
            <p>File by the kind of information. Tag only the places the source actually discusses.</p>
          </div>
          <div className="step">
            <span className="n">04</span>
            <b>Annotate</b>
            <p>What it covers, why it is valuable, who would benefit, and the limitations.</p>
          </div>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Geography I refuse to blur
          </div>
          <p>
            HUD’s Sarasota analysis stays on North Port–Sarasota–Bradenton. Austin and Raleigh
            surveys are city limits, not those MSAs. Niche reviews are the city named on the page.
            The Tampa Bay Partnership report is an eight-county region, not the Tampa MSA. The RDU
            thread treats Raleigh and Durham as separate cities.
          </p>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Build
          </div>
          <p>
            A typed React app on GitHub Pages. The same metro records drive the map, the rail, and
            compare.
          </p>
        </div>
      </div>
    </section>
  );
}
