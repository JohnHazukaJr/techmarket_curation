import { Fragment } from "react";
import { CiteTip } from "../cite/CiteTip";
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
      {METRICS.filter((x) => picks.some((m) => live(m, x))).map((x) => {
        const vals = picks.map((m) => (live(m, x) ? val(m, x.k) : null));
        const liveVals = vals.filter((v): v is number => v !== null);
        const canBest = liveVals.length >= 2;
        const best = canBest ? (x.hi ? Math.max(...liveVals) : Math.min(...liveVals)) : null;
        return (
          <Fragment key={x.k}>
            <div className="cmplabel">{x.label}</div>
            {picks.map((m, i) => {
              const n = vals[i];
              if (n === null) return <div className="cmpcell" key={`${x.k}-${m.id}`} />;
              return (
                <div
                  className={`cmpcell glass${best !== null && n === best ? " best" : ""}`}
                  key={`${x.k}-${m.id}`}
                >
                  <span className="v">{x.fmt(n)}</span>
                  {best !== null && n === best ? <span className="flag">best of 3</span> : null}
                  <CiteTip
                    unit={x.unit}
                    geography={m.name}
                    dataYear={x.dataYear}
                    published={x.published}
                    href={x.url}
                    short={`${x.src.toUpperCase()} · ${x.dataYear} · ${x.published}`}
                  />
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
}
