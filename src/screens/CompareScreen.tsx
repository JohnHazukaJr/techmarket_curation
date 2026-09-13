import { CompareGrid } from "../components/compare/CompareGrid";
import { useCollection } from "../state/CollectionContext";

export function CompareScreen() {
  const { go } = useCollection();
  return (
    <section className="screen" id="s-compare">
      <div className="detailhead glass">
        <div>
          <div className="mono">Compare</div>
          <h1>Three metros, BEA measures</h1>
        </div>
        <button type="button" className="btn ghost" onClick={() => go("map")}>
          ← Back to map
        </button>
      </div>
      <CompareGrid />
      <div className="note">
        Outlined cell is the higher or lower of the three that have a number, depending on the row.
        Real personal income is the metro total, so a larger economy wins that row.
      </div>
    </section>
  );
}
