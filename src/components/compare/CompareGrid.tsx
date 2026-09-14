import { Fragment } from "react";
import { CiteTip } from "../cite/CiteTip";
import { METRICS, live, val } from "../../data/metrics";
import { useCollection } from "../../state/CollectionContext";
import type { Metro } from "../../types/collection";

export function CompareGrid() {
  const { metros, compareIds, setCompareId } = useCollection();
  const picks = compareIds.map((id) => metros.find((m) => m.id === id) ?? null);
  const defined = picks.filter((m): m is Metro => m !== null);

  return (
    <div className="cmpgrid" id="cmpgrid">
      <div className="cmplabel" />
      {picks.map((m, i) => (
        <div className="cmphead glass" key={`head-${i}`}>
          <span className="mono">Column {i + 1}</span>
          <span className="nm">{m?.name ?? "Choose a metro"}</span>
          <select
            data-col={i}
            value={m?.id ?? ""}
            aria-label={`Column ${i + 1} metro`}
            onChange={(e) => setCompareId(i, e.target.value)}
          >
            {!m ? <option value="">Select a metro</option> : null}
            {metros.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
      ))}
      {METRICS.filter((x) => defined.some((m) => live(m, x))).map((x) => {
        const vals = picks.map((m) => (m && live(m, x) ? val(m, x.k) : null));
        const liveVals = vals.filter((v): v is number => v !== null);
        const canMark = liveVals.length >= 2;
        const marked = canMark ? (x.hi ? Math.max(...liveVals) : Math.min(...liveVals)) : null;
        const flag = x.hi ? "higher" : "lower";
        return (
          <Fragment key={x.k}>
            <div className="cmplabel" title={x.meaning}>
              {x.label}
            </div>
            {picks.map((m, i) => {
              const n = vals[i];
              if (!m || n === null) return <div className="cmpcell" key={`${x.k}-${i}`} />;
              return (
                <div
                  className={`cmpcell glass${marked !== null && n === marked ? " best" : ""}`}
                  key={`${x.k}-${m.id}-${i}`}
                >
                  <span className="v">{x.fmt(n)}</span>
                  {marked !== null && n === marked ? <span className="flag">{flag}</span> : null}
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
