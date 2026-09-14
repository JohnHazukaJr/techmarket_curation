import { MetricChips } from "../components/map/MetricChips";
import { MetroRail } from "../components/map/MetroRail";
import { UsMap } from "../components/map/UsMap";
import { metricByKey } from "../data/metrics";
import { useCollection } from "../state/CollectionContext";

export function MapScreen() {
  const { sources, metros, metric } = useCollection();
  const current = metricByKey(metric);
  return (
    <section className="screen" id="s-map">
      <div className="intro glass">
        <div>
          <div className="mono section-label">A curated collection</div>
          <h1>Where can a new tech grad actually afford to live and eventually raise a young family?</h1>
          <div className="lede">
            <p>
              I gathered {sources.length} annotated sources on {metros.length} OMB metros because I
              wanted more than a vibe check before I pick a place. I started from housing space,
              starting pay, jobs, safety, schools, childcare, parks, and commuting. A paycheck that
              looks fine on paper does not mean much if rent or a starter home would eat most of it.
            </p>
            <p>
              The map, metro cards, and compare only use figures I can put next to each other. That
              is BEA 2023 regional price parities and real personal income, BLS May 2025 annual mean
              wages for computer and mathematical occupations, and ACS 2024 median gross rent and
              median home value. Those are metro means and medians, not a new-grad offer and not a
              current listing. Violent crime from FBI Crime in the United States 2024 Table 6 only
              shows up when that table has an MSA row. Atlanta, Miami, Orlando, Tampa, and North
              Port–Sarasota–Bradenton stay blank there. Schools and childcare stay in the library as
              NCES and DOL Women’s Bureau tools. I am not inventing quality scores for the cards.
            </p>
            <p>
              Click a state, then a metro, if you want the place-specific notes. Every annotation is
              in the library.
            </p>
          </div>
        </div>
        <div className="introfacts">
          <div className="fact">
            <b>Find</b>
            <span>I start from the page that owns the measurement and keep the URL.</span>
          </div>
          <div className="fact">
            <b>Evaluate</b>
            <span>
              I look at the publisher, the method, the data year versus the publication date, and
              whether the grain is an MSA, a city, or a larger region.
            </span>
          </div>
          <div className="fact">
            <b>Organize</b>
            <span>
              I file sources by the kind of information they give, and I only tag the places they
              actually discuss.
            </span>
          </div>
          <div className="fact">
            <b>Annotate</b>
            <span>What it covers, why it helps, who would benefit, and what it cannot answer.</span>
          </div>
        </div>
      </div>

      <div className="maprow">
        <div className="mapcard glass">
          <UsMap />
          <MetricChips />
        </div>
        <MetroRail />
      </div>
      <div className="note">
        Shaded states have a tracked metro. {current.label}: {current.dataYear}, released{" "}
        {current.published}.
      </div>
    </section>
  );
}
