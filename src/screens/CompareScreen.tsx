import { CompareGrid } from "../components/compare/CompareGrid";
import { useCollection } from "../state/CollectionContext";

export function CompareScreen() {
  const { go } = useCollection();
  return (
    <section className="screen" id="s-compare">
      <div className="detailhead glass">
        <div>
          <div className="mono">Compare</div>
          <h1>Three metros, same factors</h1>
        </div>
        <button type="button" className="btn ghost" onClick={() => go("map")}>
          ← Back to map
        </button>
      </div>
      <CompareGrid />
      <div className="note">
        Outlined cell = best of the three on that factor · dashed rows are factors not yet pulled from
        their source · no value on this screen is estimated or interpolated
      </div>
    </section>
  );
}
