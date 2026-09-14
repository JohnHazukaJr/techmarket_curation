import { CategoryGrid } from "../components/library/CategoryGrid";
import { useCollection } from "../state/CollectionContext";

export function LibraryScreen() {
  const { sources } = useCollection();
  return (
    <section className="screen" id="s-library">
      <div className="intro single glass">
        <div>
          <div className="mono section-label">Source library</div>
          <h1>{sources.length} annotated sources</h1>
          <p>I put every annotation here. You can search or filter by topic, metro, publisher, or format.</p>
        </div>
      </div>
      <CategoryGrid />
    </section>
  );
}
