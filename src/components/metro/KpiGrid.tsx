import { CiteTip } from "../cite/CiteTip";
import { METRICS, live, val } from "../../data/metrics";
import type { Metro } from "../../types/collection";

export function KpiGrid({ metro }: { metro: Metro }) {
  return (
    <div className="kpis" id="md-kpis">
      {METRICS.map((x) =>
        live(metro, x) ? (
          <div className="kpi glass" key={x.k}>
            <span className="mono">{x.label}</span>
            <span className="v">{x.fmt(val(metro, x.k))}</span>
            <CiteTip
              unit={x.unit}
              geography={metro.name}
              dataYear={x.dataYear}
              published={x.published}
              href={x.url}
            />
          </div>
        ) : (
          <div className="kpi pending" key={x.k}>
            <span className="mono">{x.label}</span>
            <span className="v">Awaiting pull</span>
            <span className="d" title={x.pending}>
              {x.pending}{" "}
              <a href={x.url} target="_blank" rel="noopener">
                source
              </a>
            </span>
          </div>
        ),
      )}
    </div>
  );
}
