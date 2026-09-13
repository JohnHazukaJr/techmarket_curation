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
            <span className="d">{x.cite}</span>
          </div>
        ) : (
          <div className="kpi pending" key={x.k}>
            <span className="mono">{x.label}</span>
            <span className="v">Awaiting pull</span>
            <span className="d">{x.pending}</span>
          </div>
        ),
      )}
    </div>
  );
}
