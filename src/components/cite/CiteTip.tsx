import { citeLine } from "../../lib/cite";

export function CiteTip({
  unit,
  geography,
  dataYear,
  published,
  href,
}: {
  unit: string;
  geography: string;
  dataYear: string;
  published: string;
  href: string;
}) {
  const text = citeLine({ unit, geography, dataYear, published });
  return (
    <span className="d" title={text}>
      {text}{" "}
      <a href={href} target="_blank" rel="noopener">
        source
      </a>
    </span>
  );
}
