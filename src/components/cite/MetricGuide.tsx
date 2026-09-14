import { SOURCED_METRICS } from "../../data/metrics";

export function MetricGuide({ lead }: { lead?: string }) {
  return (
    <div className="metric-guide">
      {lead ? <p>{lead}</p> : null}
      {SOURCED_METRICS.filter((m) => m.meaning).map((m) => (
        <p key={m.k}>
          <strong>{m.label}.</strong> {m.meaning}
        </p>
      ))}
      <p>
        I leave crime blank unless FBI CIUS 2024 Table 6 publishes a metro rate. Schools and
        childcare stay in the library as tools and labeled facts. National medians and long-run
        history stay on the source pages, not on these cards.
      </p>
    </div>
  );
}
