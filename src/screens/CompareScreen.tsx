import { CompareGrid } from "../components/compare/CompareGrid";
import { useCollection } from "../state/CollectionContext";

export function CompareScreen() {
  const { go } = useCollection();
  return (
    <section className="screen" id="s-compare">
      <div className="detailhead glass">
        <div>
          <div className="mono">Compare</div>
          <h1>Three metros, same family questions</h1>
        </div>
        <button type="button" className="btn ghost" onClick={() => go("map")}>
          ← Back to map
        </button>
      </div>
      <CompareGrid />
      <div className="note">
        “Best of live” only marks values that actually exist at the same grain · dashed cells are
        factors a collection source does not give as a comparable metro figure · no value here is
        estimated
      </div>
    </section>
  );
}
