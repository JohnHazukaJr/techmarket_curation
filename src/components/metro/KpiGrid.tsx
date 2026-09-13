import { CiteTip } from "../cite/CiteTip";
import { METRICS, live, val } from "../../data/metrics";
import type { Metro } from "../../types/collection";

export function KpiGrid({ metro }: { metro: Metro }) {
  const shown = METRICS.filter((x) => live(metro, x));
  if (!shown.length) return null;

  return (
    <div className="kpis" id="md-kpis">
      {shown.map((x) => (
        <div className="kpi glass" key={x.k}>
          <span className="mono">{x.label}</span>
          <span className="v">{x.fmt(val(metro, x.k))}</span>
          <CiteTip
            unit={x.unit}
            geography={metro.name}
            dataYear={x.dataYear}
            published={x.published}
            href={x.url}
            short={`${x.src.toUpperCase()} · ${x.dataYear} · ${x.published}`}
          />
        </div>
      ))}
    </div>
  );
}
