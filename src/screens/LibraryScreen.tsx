import { CategoryGrid } from "../components/library/CategoryGrid";
import { useCollection } from "../state/CollectionContext";

export function LibraryScreen() {
  const { sources, categories } = useCollection();
  return (
    <section className="screen" id="s-library">
      <div className="intro glass" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Annotated collection · {sources.length} sources
          </div>
          <h1>Twenty sources for a place a young family could actually live</h1>
          <p>
            I am comparing tech-hub metros as a student who wants to live somewhere — and eventually
            raise a young family — without most of a starting salary going to housing. These{" "}
            {sources.length} records are the annotated collection: what each source covers, why it is
            useful, who it helps, and what it cannot do. Search the notes, then filter by the six
            categories, a metro, or the kind of publisher. A source can sit in more than one category.
            National tables stay comparable across metros; city surveys and Niche reviews stay on the
            city they actually describe. {categories.length} categories, no extras from outside the
            PDF.
          </p>
        </div>
      </div>
      <CategoryGrid />
    </section>
  );
}
