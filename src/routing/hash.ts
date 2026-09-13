import type { Route, Screen } from "../types/collection";

const SCREENS: Screen[] = ["map", "metro", "library", "compare", "source", "about"];

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, "").replace(/\/$/, "");
  const parts = path.split("/").filter(Boolean);
  const screen = parts[0] as Screen | undefined;

  if (screen === "metro" && parts[1]) return { screen: "metro", id: parts[1] };
  if (screen === "source" && parts[1]) return { screen: "source", id: parts[1] };
  if (screen && SCREENS.includes(screen) && screen !== "metro" && screen !== "source") {
    return { screen };
  }
  return { screen: "map" };
}

export function toHash(route: Route): string {
  if (route.screen === "metro") return `#/metro/${route.id}`;
  if (route.screen === "source") return `#/source/${route.id}`;
  return `#/${route.screen}`;
}

export function currentRoute(): Route {
  return parseHash(window.location.hash);
}

export function replaceHash(route: Route): void {
  const next = toHash(route);
  if (window.location.hash !== next) {
    window.location.hash = next;
  }
}
