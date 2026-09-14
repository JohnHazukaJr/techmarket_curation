import { MetricGuide } from "../components/cite/MetricGuide";
import { useCollection } from "../state/CollectionContext";

export function AboutScreen() {
  const { sources, categories, metros } = useCollection();

  return (
    <section className="screen" id="s-about">
      <div className="about glass">
        <div className="about-block">
          <div className="mono section-label">About</div>
          <h1>How I chose sources for a place to live and eventually raise a young family</h1>
          <div className="lede">
            <p>
              I have been trying to answer a pretty simple question. Where can a new tech grad
              actually afford to live and eventually raise a young family? I started from housing
              space, starting pay, jobs, safety, schools, childcare, parks, and commuting.
            </p>
            <p>
              This site has {sources.length} annotated sources across {categories.length} topics and{" "}
              {metros.length} metros. I went a little past a 15–20 source set so I could add the FBI
              metro crime table, the NCES school-system file, and the DOL county childcare-price
              tool. I still do not put county childcare quotes on the cards.
            </p>
            <p>
              The cards show BEA price and income figures, BLS computer-and-math wages, and ACS rent
              and home values. Crime only appears when FBI Table 6 publishes an MSA rate. If I do
              not have a comparable metro figure, I leave the cell blank.
            </p>
            <p>
              I would start on the map, open a metro for the place-specific notes, read the
              annotations in the library, and then compare three metros on the measures that
              actually have a number.
            </p>
          </div>
        </div>
        <div className="steps">
          <div className="step">
            <span className="n">01</span>
            <b>Find</b>
            <p>I start from the page that owns the number and keep the URL.</p>
          </div>
          <div className="step">
            <span className="n">02</span>
            <b>Evaluate</b>
            <p>
              I look at who published it, how they measured it, the data year versus the publication
              date, and whether they mean an MSA, a city, or a bigger region.
            </p>
          </div>
          <div className="step">
            <span className="n">03</span>
            <b>Organize</b>
            <p>I file sources by the kind of information they give, and I only tag the places they actually discuss.</p>
          </div>
          <div className="step">
            <span className="n">04</span>
            <b>Annotate</b>
            <p>What it covers, why it is useful to me, who else would benefit, and what it cannot answer.</p>
          </div>
        </div>
        <div className="about-block">
          <div className="mono section-label">What the numbers mean</div>
          <MetricGuide lead="The map and compare use BEA 2023 prices and income, BLS May 2025 computer-and-math wages, and ACS 2024 rent and home values. Crime only shows on a metro page when FBI Table 6 has an MSA rate." />
        </div>
        <div className="about-block">
          <div className="mono section-label">Geography I refuse to blur</div>
          <p>
            I kept HUD’s Sarasota analysis on North Port–Sarasota–Bradenton. The Austin and Raleigh
            surveys are city limits, not those MSAs. Niche reviews are whatever city is named on the
            page. The Tampa Bay Partnership report is an eight-county region, not the Tampa MSA. The
            RDU thread treats Raleigh and Durham as separate cities.
          </p>
        </div>
        <div className="about-block">
          <div className="mono section-label">Build</div>
          <p>
            This is a typed React app on GitHub Pages. The same metro records drive the map, the
            rail, and compare.
          </p>
        </div>
      </div>
    </section>
  );
}
