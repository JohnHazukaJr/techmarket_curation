export function AboutScreen() {
  return (
    <section className="screen" id="s-about">
      <div className="about glass">
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            About &amp; methodology
          </div>
          <h1 style={{ fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.05, marginBottom: 14 }}>
            How sources get in, and how they get organized
          </h1>
          <p>
            Every candidate source is evaluated before it is added: who published it, whether the data
            is primary or derived, how current it is, and whether it can be compared across metros.
            Federal statistical sources anchor each quantitative category; industry and community
            sources are kept clearly separate and labelled as such, so an opinion thread is never
            mistaken for a measurement.
          </p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="n">01</span>
            <b>Find</b>
            <p>Start from the agency that owns the measurement, not a ranking site that resells it.</p>
          </div>
          <div className="step">
            <span className="n">02</span>
            <b>Evaluate</b>
            <p>Publisher authority, method, vintage, geographic grain, and comparability across metros.</p>
          </div>
          <div className="step">
            <span className="n">03</span>
            <b>Organize</b>
            <p>File by information type; tag by metro so factors line up city to city.</p>
          </div>
          <div className="step">
            <span className="n">04</span>
            <b>Annotate</b>
            <p>Covers, value, audience, limitations — written for a reader who has not seen the source.</p>
          </div>
        </div>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Build
          </div>
          <p>
            Published on GitHub Pages from a typed React app, so the collection can keep growing after
            the course and stand as portfolio work. Geometry is real TopoJSON rendered with d3-geo; the
            same metro records drive the map, the rail, and the comparison view from one JSON source of
            truth.
          </p>
          <div className="stackrow" style={{ marginTop: 12 }}>
            <span className="pill">React + TypeScript</span>
            <span className="pill">Vite</span>
            <span className="pill">MapLibre GL / d3-geo</span>
            <span className="pill">TopoJSON</span>
            <span className="pill">GitHub Actions → Pages</span>
            <span className="pill">Zod-validated JSON</span>
          </div>
        </div>
      </div>
    </section>
  );
}
