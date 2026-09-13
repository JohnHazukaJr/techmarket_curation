import { useCollection } from "../../state/CollectionContext";
import type { ProvenanceRecord } from "../../types/collection";

function ProvenanceRow({ record }: { record: ProvenanceRecord }) {
  return (
    <div className="prov-row">
      <i>
        {record.source.toUpperCase()} · {record.vintage}
        {record.released ? ` · released ${record.released}` : ""}
      </i>
      <b>
        {record.table}
        {record.url ? (
          <>
            {" "}
            <a href={record.url} target="_blank" rel="noopener">
              source
            </a>
          </>
        ) : null}
      </b>
    </div>
  );
}

export function ProvenancePanel() {
  const { provenance } = useCollection();
  const filled = Object.values(provenance).filter((p) => p.table && !p.status && p.group !== "reference");
  if (!filled.length) return null;

  return (
    <div className="panel glass">
      <h2>Where these numbers come from</h2>
      <div id="md-prov" className="prov-stack">
        {filled.map((p) => (
          <ProvenanceRow key={p.table} record={p} />
        ))}
      </div>
    </div>
  );
}
