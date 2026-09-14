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
        Crime stays blank unless FBI CIUS 2024 Table 6 publishes a metro rate. School and
        childcare sources stay in the library as tools and labeled facts, not as scores on these
        cards. National medians and long-run history also sit on source pages, not on the cards.
      </p>
    </div>
  );
}
