import { citeLine } from "../../lib/cite";

export function CiteTip({
  unit,
  geography,
  dataYear,
  published,
  href,
  short,
}: {
  unit: string;
  geography: string;
  dataYear: string;
  published: string;
  href: string;
  short?: string;
}) {
  const full = citeLine({ unit, geography, dataYear, published });
  const visible = short ?? `${dataYear} · ${published}`;
  return (
    <span className="d" title={full}>
      {visible}{" "}
      <a href={href} target="_blank" rel="noopener">
        source
      </a>
    </span>
  );
}
