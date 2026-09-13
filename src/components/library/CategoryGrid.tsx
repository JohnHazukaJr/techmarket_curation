import { useMemo, useState } from "react";
import { geoBadge, isNationalSource, sourceApplies, sourceInCategory, sourceSearchHaystack } from "../../lib/sources";
import { useCollection } from "../../state/CollectionContext";

export function CategoryGrid() {
  const { sources, categories, metros, slots, openSource } = useCollection();
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [metroFilter, setMetroFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const types = useMemo(
    () => Array.from(new Set(sources.map((s) => s.type))).sort(),
    [sources],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sources.filter((s) => {
      if (q && !sourceSearchHaystack(s).includes(q)) return false;
      if (typeFilter !== "all" && s.type !== typeFilter) return false;
      if (metroFilter === "national" && !isNationalSource(s)) return false;
      if (metroFilter !== "all" && metroFilter !== "national" && !sourceApplies(s, metroFilter)) {
        return false;
      }
      return true;
    });
  }, [metroFilter, query, sources, typeFilter]);

  const shownCats = catFilter === "all" ? categories : categories.filter((c) => c === catFilter);

  return (
    <div>
      <div className="panel glass lib-tools">
        <label className="lib-search">
          <span className="mono">Search titles, publishers, and notes</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="housing, childcare, Orlando, FBI…"
          />
        </label>
        <div className="lib-filters">
          <label>
            <span className="mono">Category</span>
            <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
              <option value="all">All six categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mono">Metro</span>
            <select value={metroFilter} onChange={(e) => setMetroFilter(e.target.value)}>
              <option value="all">All places</option>
              <option value="national">National / all comparable metros</option>
              {metros.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mono">Source type</span>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mono">
          {visible.length} of {sources.length} sources
        </div>
      </div>
      <div className="libgrid" id="libgrid">
        {shownCats.map((cat) => {
          const items = visible.filter((s) => sourceInCategory(s, cat));
          const openSlots = slots[cat] ?? [];
          const filtering = Boolean(query.trim()) || catFilter !== "all" || metroFilter !== "all" || typeFilter !== "all";
          if (filtering && items.length === 0 && !openSlots.length) return null;
          return (
            <div className="cat glass" key={cat}>
              <div className="ch">
                <h2>{cat}</h2>
                <span className="mono">
                  {openSlots.length
                    ? `${items.length} / ${items.length + openSlots.length}`
                    : `${items.length} sources`}
                </span>
              </div>
              {items.length === 0 && !openSlots.length ? (
                <div className="slot">No sources match these filters</div>
              ) : null}
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
                  <span className="tags">
                    <span className="tag" title={s.geoLabel}>
                      {geoBadge(s)}
                    </span>
                  </span>
                  <span className="scard-ann">{s.value}</span>
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
    </div>
  );
}
