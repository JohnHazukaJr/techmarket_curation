import { SOURCED_METRICS, metricByKey } from "../../data/metrics";
import { useCollection } from "../../state/CollectionContext";

export function MetricChips() {
  const { metric, setMetric } = useCollection();
  const current = metricByKey(metric);

  return (
    <>
      <div className="mapchrome">
        <div className="chip-row" id="metricchips">
          {SOURCED_METRICS.map((m) => (
            <button
              key={m.k}
              type="button"
              className="chip"
              data-metric={m.k}
              aria-pressed={m.k === metric}
              onClick={() => setMetric(m.k)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mapfoot">
        <div className="legend glass">
          <span className="mono" id="legendlabel">
            {current.label}
          </span>
          <span className="ramp" />
          <span className="mono">{current.hi ? "higher" : "lower"}</span>
        </div>
        <BackToUsButton />
      </div>
    </>
  );
}

function BackToUsButton() {
  const { selState, setSelState } = useCollection();
  return (
    <button
      type="button"
      className={selState ? "backbtn on" : "backbtn"}
      id="backbtn"
      onClick={() => setSelState(null)}
    >
      ← Back to U.S.
    </button>
  );
}
