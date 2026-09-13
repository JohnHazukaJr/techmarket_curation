import { useCollection } from "../../state/CollectionContext";
import type { Screen } from "../../types/collection";
import { DirectionToggle } from "./DirectionToggle";

const NAV: { screen: Screen; label: string }[] = [
  { screen: "map", label: "Map" },
  { screen: "library", label: "Source library" },
  { screen: "compare", label: "Compare" },
  { screen: "about", label: "About" },
];

export function Header() {
  const { route, go } = useCollection();

  return (
    <header className="topbar glass">
      <div className="brand">
        <div className="brandmark" />
        <div>
          <div className="t">Tech-Hub Housing Markets</div>
          <div className="s">CMPA 4301 · John Hazuka</div>
        </div>
      </div>
      <nav>
        {NAV.map((item) => {
          const current =
            item.screen === "map"
              ? route.screen === "map" || route.screen === "metro"
              : item.screen === "library"
                ? route.screen === "library" || route.screen === "source"
                : route.screen === item.screen;
          return (
            <button
              key={item.screen}
              type="button"
              data-go={item.screen}
              aria-current={current ? "page" : undefined}
              onClick={() => go(item.screen)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <DirectionToggle />
    </header>
  );
}
