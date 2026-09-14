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
          <div className="mono" style={{ marginBottom: 10 }}>
            A curated collection
          </div>
          <h1>Where can a new tech grad actually afford to live and eventually raise a young family?</h1>
          <p>
            I gathered {sources.length} annotated sources on {metros.length} OMB metros because I
            wanted more than a vibe check before I pick a place. I started from housing space,
            starting pay, jobs, safety, schools, childcare, parks, and commuting. How I built the
            collection: I find the page that owns a measurement and keep the URL. I evaluate the
            publisher, the method, the data year versus the publication date, and whether the grain
            is an MSA, a city, or a larger region. I organize sources by the kind of information
            they give and tag only the places they actually discuss. I annotate what each one
            covers, why it helps, who would benefit, and what it cannot answer. The map, metro
            cards, and compare use figures I can put next to each other: BEA 2023 regional price
            parities and real personal income; BLS May 2025 annual mean wages for computer and
            mathematical occupations; and ACS 2024 median gross rent and median home value. Those
            wage and housing figures are metro means and medians, not a new-grad offer and not a
            current listing. Violent crime rates from FBI Crime in the United States 2024 Table 6
            appear on a metro page only when that table has an MSA row. Atlanta, Miami, Orlando,
            Tampa, and North Port–Sarasota–Bradenton stay blank there. Schools and childcare live
            in the library as NCES and DOL Women’s Bureau tools, not as fake quality scores on the
            cards. Click a state, then a metro, for place-specific notes. The library has every
            annotation.
          </p>
        </div>
        <div className="introfacts">
          <div className="fact">
            <b>The question</b>
            <span>Live here — and raise a young family</span>
          </div>
          <div className="fact">
            <b>The collection</b>
            <span>
              {sources.length} sources · {metros.length} metros
            </span>
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
        Shaded states have a tracked metro. {current.label}: BEA {current.dataYear}, released{" "}
        {current.published}. {current.meaning}
      </div>
    </section>
  );
}
