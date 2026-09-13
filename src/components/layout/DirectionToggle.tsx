import { useTheme } from "../../state/ThemeContext";
import type { VisualDirection } from "../../types/collection";

const OPTIONS: { dir: VisualDirection; label: string }[] = [
  { dir: "a", label: "A · Frosted" },
  { dir: "b", label: "B · Editorial" },
];

export function DirectionToggle() {
  const { dir, setDir } = useTheme();
  return (
    <div className="dirtoggle" role="group" aria-label="Visual direction">
      {OPTIONS.map((opt) => (
        <button
          key={opt.dir}
          type="button"
          data-dir={opt.dir}
          aria-pressed={dir === opt.dir}
          onClick={() => setDir(opt.dir)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
