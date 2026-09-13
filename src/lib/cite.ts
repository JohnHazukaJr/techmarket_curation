export function citeLine(parts: {
  unit: string;
  geography: string;
  dataYear: string;
  published: string;
}): string {
  return `${parts.unit} · ${parts.geography} · data year ${parts.dataYear} · published ${parts.published}`;
}
