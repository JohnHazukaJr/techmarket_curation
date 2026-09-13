import { metricByKey, val } from "../../data/metrics";
import { STATENAME } from "../../data/states";
import { useCollection } from "../../state/CollectionContext";

export function MetroRail() {
  const { metros, metric, selState, openMetro } = useCollection();
  const def = metricByKey(metric);
  const list = (selState ? metros.filter((m) => m.state === selState) : metros.slice()).sort((a, b) =>
    def.hi ? val(b, metric) - val(a, metric) : val(a, metric) - val(b, metric),
  );
  const arr = metros.map((m) => val(m, metric));
  const mn = Math.min(...arr);
  const mx = Math.max(...arr);

  const title = selState ? `${STATENAME[selState]} metros` : `${metros.length} tracked metros`;
  const sub = selState ? `${list.length} tracked` : "sorted best first";

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
          const n = (val(m, metric) - mn) / (mx - mn || 1);
          const pct = Math.round((def.hi ? n : 1 - n) * 100);
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
                <span className="met">
                  <i>{def.label}</i>
                  <b>{def.fmt(val(m, metric))}</b>
                </span>
                <span className="met">
                  <i>housing level</i>
                  <b>{m.rppHousing.toFixed(1)}</b>
                </span>
                <span className="met">
                  <i>income chg</i>
                  <b>
                    {(m.incomeGrowth > 0 ? "+" : "") + m.incomeGrowth.toFixed(1)}%
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
