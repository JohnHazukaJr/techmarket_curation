import { useCollection } from "../../state/CollectionContext";
import type { Screen } from "../../types/collection";
import { DirectionToggle } from "./DirectionToggle";

const NAV: { screen: Screen; label: string }[] = [
  { screen: "map", label: "Map" },
  { screen: "library", label: "Source library" },
  { screen: "compare", label: "Compare" },
  { screen: "about", label: "About & method" },
];

export function Header() {
  const { route, go } = useCollection();

  return (
    <header className="topbar glass">
      <div className="brand">
        <div className="brandmark" />
        <div>
          <div className="t">Tech-Hub Housing Markets</div>
          <div className="s">A curated collection · CMPA 4301 · John Hazuka</div>
        </div>
      </div>
      <nav>
        {NAV.map((item) => (
          <button
            key={item.screen}
            type="button"
            data-go={item.screen}
            aria-current={route.screen === item.screen ? "page" : undefined}
            onClick={() => go(item.screen)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <DirectionToggle />
    </header>
  );
}
