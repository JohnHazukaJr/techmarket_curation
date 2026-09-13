import { MetricChips } from "../components/map/MetricChips";
import { MetroRail } from "../components/map/MetroRail";
import { UsMap } from "../components/map/UsMap";
import { useCollection } from "../state/CollectionContext";

export function MapScreen() {
  const { sources, metros } = useCollection();
  return (
    <section className="screen" id="s-map">
      <div className="intro glass">
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            A curated collection
          </div>
          <h1>Where can a new tech grad actually afford to live and eventually raise a young family?</h1>
          <p>
            I gathered {sources.length} annotated sources on {metros.length} OMB metros so I can
            compare housing space, starting pay, jobs, prices, safety, schools, childcare, parks,
            and commuting. Click a state, then a metro, for place-specific notes. The library has
            every annotation. Compare three metros on the BEA price and income figures we actually
            have.
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
        Shaded states have a tracked metro. Prices are BEA 2023, released Dec 12, 2024.
      </div>
    </section>
  );
}
