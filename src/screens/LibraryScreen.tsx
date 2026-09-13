import { CategoryGrid } from "../components/library/CategoryGrid";
import { useCollection } from "../state/CollectionContext";

export function LibraryScreen() {
  const { sources } = useCollection();
  return (
    <section className="screen" id="s-library">
      <div className="intro glass" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Source library
          </div>
          <h1>{sources.length} annotated sources</h1>
          <p>Search or filter by topic, metro, publisher, or format.</p>
        </div>
      </div>
      <CategoryGrid />
    </section>
  );
}
