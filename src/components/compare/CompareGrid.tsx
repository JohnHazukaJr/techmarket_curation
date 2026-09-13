import { Fragment } from "react";
import { METRICS, live, val } from "../../data/metrics";
import { useCollection } from "../../state/CollectionContext";

export function CompareGrid() {
  const { metros, compareIds, setCompareId } = useCollection();
  const picks = compareIds.map((id) => metros.find((m) => m.id === id) ?? metros[0]);

  return (
    <div className="cmpgrid" id="cmpgrid">
      <div className="cmplabel" />
      {picks.map((m, i) => (
        <div className="cmphead glass" key={`head-${i}`}>
          <span className="mono">Column {i + 1}</span>
          <span className="nm">{m.name}</span>
          <select
            data-col={i}
            value={m.id}
            onChange={(e) => setCompareId(i, e.target.value)}
          >
            {metros.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
      ))}
      {METRICS.map((x) => {
        const ready = picks.every((m) => live(m, x));
        if (!ready) {
          return (
            <Fragment key={x.k}>
              <div className="cmplabel">{x.label}</div>
              {picks.map((m) => (
                <div className="cmpcell pending" key={`${x.k}-${m.id}`}>
                  <span className="v">—</span>
                  <span className="mono" style={{ textTransform: "none", letterSpacing: 0 }}>
                    awaiting pull
                  </span>
                </div>
              ))}
            </Fragment>
          );
        }
        const vals = picks.map((m) => val(m, x.k));
        const best = x.hi ? Math.max(...vals) : Math.min(...vals);
        return (
          <Fragment key={x.k}>
            <div className="cmplabel">{x.label}</div>
            {picks.map((m, i) => (
              <div
                className={`cmpcell glass${vals[i] === best ? " best" : ""}`}
                key={`${x.k}-${m.id}`}
              >
                <span className="v">{x.fmt(vals[i])}</span>
                {vals[i] === best ? (
                  <span className="flag">best of 3</span>
                ) : (
                  <span className="mono" style={{ textTransform: "none", letterSpacing: 0 }}>
                    {x.src.toUpperCase()} {x.k === "incomeGrowth" || x.k === "income" ? "T3" : "T4"}
                  </span>
                )}
              </div>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
