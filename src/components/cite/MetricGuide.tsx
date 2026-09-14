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
        Salary, rent, home value, and crime stay blank unless a collection source gives a
        comparable current metro figure. National medians and long-run history sit on source pages
        as labeled facts, not on these cards.
      </p>
    </div>
  );
}
