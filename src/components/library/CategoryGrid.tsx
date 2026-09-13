import { useCollection } from "../../state/CollectionContext";

export function CategoryGrid() {
  const { sources, categories, slots, openSource } = useCollection();

  return (
    <div className="libgrid" id="libgrid">
      {categories.map((cat) => {
        const items = sources.filter((s) => s.cat === cat);
        const openSlots = slots[cat] ?? [];
        return (
          <div className="cat glass" key={cat}>
            <div className="ch">
              <h2>{cat}</h2>
              <span className="mono">
                {items.length} / {items.length + openSlots.length}
              </span>
            </div>
            {items.map((s) => (
              <button
                key={s.id}
                type="button"
                className="scard"
                onClick={() => openSource(s.id)}
              >
                <span className="pub">{s.pub}</span>
                <span className="nm">{s.title}</span>
                <span className="mono" style={{ textTransform: "none", letterSpacing: 0, fontSize: 11 }}>
                  {s.type}
                </span>
              </button>
            ))}
            {openSlots.map((slot) => (
              <div className="slot" key={slot}>
                {slot}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
