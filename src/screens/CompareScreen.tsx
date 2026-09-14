import { CompareGrid } from "../components/compare/CompareGrid";
import { MetricGuide } from "../components/cite/MetricGuide";
import { useCollection } from "../state/CollectionContext";

export function CompareScreen() {
  const { go } = useCollection();
  return (
    <section className="screen" id="s-compare">
      <div className="detailhead glass">
        <div>
          <div className="mono section-label">Compare</div>
          <h1>Three metros, only the measures that have a number</h1>
        </div>
        <button type="button" className="btn ghost" onClick={() => go("map")}>
          ← Back to map
        </button>
      </div>
      <CompareGrid />
      <div className="note">
        The outlined cell is the higher or lower of the ones that actually have a figure.
      </div>
      <div className="panel glass">
        <h2>What these rows mean</h2>
        <MetricGuide />
      </div>
    </section>
  );
}
