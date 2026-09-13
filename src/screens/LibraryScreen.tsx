import { CategoryGrid } from "../components/library/CategoryGrid";

export function LibraryScreen() {
  return (
    <section className="screen" id="s-library">
      <div className="intro glass" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Organizational structure
          </div>
          <h1>Six categories, city tags across all of them</h1>
          <p>
            Sources are filed by the <em>kind</em> of information they provide, because no single
            statistic answers the question. City tags then re-connect everything back together, so one
            metro's salary, housing, price-level and safety sources can be read side by side.
          </p>
        </div>
      </div>
      <CategoryGrid />
    </section>
  );
}
