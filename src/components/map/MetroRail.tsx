import { citeLine } from "../../lib/cite";
import { live, metricByKey, val } from "../../data/metrics";
import { STATENAME } from "../../data/states";
import { useCollection } from "../../state/CollectionContext";

export function MetroRail() {
  const { metros, metric, selState, openMetro } = useCollection();
  const def = metricByKey(metric);
  const inView = selState ? metros.filter((m) => m.state === selState) : metros.slice();
  const ready = inView.filter((m) => live(m, def));
  const waiting = inView.filter((m) => !live(m, def));
  const list = ready
    .slice()
    .sort((a, b) => (def.hi ? val(b, metric) - val(a, metric) : val(a, metric) - val(b, metric)))
    .concat(waiting);

  const liveVals = metros.filter((m) => live(m, def)).map((m) => val(m, metric));
  const mn = liveVals.length ? Math.min(...liveVals) : 0;
  const mx = liveVals.length ? Math.max(...liveVals) : 1;

  const title = selState ? `${STATENAME[selState]} metros` : `${metros.length} tracked metros`;
  const sub = selState
    ? `${list.length} tracked`
    : `sorted ${def.hi ? "higher" : "lower"} first; blanks last`;

  return (
    <aside className="rail glass">
      <div className="railhead">
        <h2 id="railtitle">{title}</h2>
        <span className="mono" id="railsub">
          {sub}
        </span>
      </div>
      <div className="raillist" id="raillist">
        {list.map((m) => {
          const readyRow = live(m, def);
          const n = readyRow ? (val(m, metric) - mn) / (mx - mn || 1) : 0;
          const pct = readyRow ? Math.round((def.hi ? n : 1 - n) * 100) : 0;
          const housingCite = citeLine({
            unit: "index, 100 = U.S. average",
            geography: m.name,
            dataYear: "2023",
            published: "December 12, 2024",
          });
          const incomeCite = citeLine({
            unit: "percent change",
            geography: m.name,
            dataYear: "2022–2023",
            published: "December 12, 2024",
          });
          const metricCite = citeLine({
            unit: def.unit,
            geography: m.name,
            dataYear: def.dataYear,
            published: def.published,
          });
          return (
            <button
              key={m.id}
              type="button"
              className="mcard"
              data-metro={m.id}
              onClick={() => openMetro(m.id)}
            >
              <div className="top">
                <span className="nm">{m.name}</span>
              </div>
              <div className="mets">
                <span className="met" title={readyRow ? metricCite : def.pending}>
                  <i>{def.label}</i>
                  <b>{readyRow ? def.fmt(val(m, metric)) : "—"}</b>
                </span>
                <span className="met" title={m.rppHousing == null ? "BEA housing RPP not verified for this metro" : housingCite}>
                  <i>housing level</i>
                  <b>{m.rppHousing == null ? "—" : m.rppHousing.toFixed(1)}</b>
                </span>
                <span className="met" title={m.incomeGrowth == null ? "BEA income change not verified for this metro" : incomeCite}>
                  <i>income chg</i>
                  <b>
                    {m.incomeGrowth == null
                      ? "—"
                      : (m.incomeGrowth > 0 ? "+" : "") + m.incomeGrowth.toFixed(1) + "%"}
                  </b>
                </span>
              </div>
              <div className="meter">
                <i style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
