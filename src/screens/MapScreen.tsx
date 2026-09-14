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
            I gathered {sources.length} annotated sources on {metros.length} OMB metros. I started
            from housing space, starting pay, jobs, safety, schools, childcare, parks, and
            commuting. The cards and compare use the BEA price and income figures we have, plus
            labeled facts on the source pages. Click a state, then a metro, for place-specific
            notes. The library has every annotation.
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
