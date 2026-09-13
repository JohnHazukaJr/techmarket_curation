import { useCollection } from "../../state/CollectionContext";
import type { ProvenanceRecord } from "../../types/collection";

function ProvenanceRow({ record, todo }: { record: ProvenanceRecord; todo: boolean }) {
  return (
    <div className={todo ? "prov-row todo" : "prov-row"}>
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
  const all = Object.values(provenance).filter((p) => p.table);
  const filled = all.filter((p) => !p.status && p.group !== "reference");
  const todo = all.filter((p) => p.status);
  const refs = all.filter((p) => p.group === "reference");

  return (
    <div className="panel glass">
      <h2>Where these numbers come from</h2>
      <div id="md-prov" className="prov-stack">
        {filled.map((p) => (
          <ProvenanceRow key={p.table} record={p} todo={false} />
        ))}
      </div>
      {todo.length ? (
        <>
          <div className="mono" style={{ marginTop: 4 }}>
            Tables the PDF names but does not quantify
          </div>
          <div id="md-prov-todo" className="prov-stack">
            {todo.map((p) => (
              <ProvenanceRow key={p.table} record={p} todo />
            ))}
          </div>
        </>
      ) : null}
      {refs.length ? (
        <>
          <div className="mono" style={{ marginTop: 4 }}>
            National reference figures
          </div>
          <div id="md-prov-ref" className="prov-stack">
            {refs.map((p) => (
              <ProvenanceRow key={p.table} record={p} todo={false} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
