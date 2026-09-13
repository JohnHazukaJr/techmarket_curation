import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loadCollection } from "../lib/loadCollection";
import { currentRoute, replaceHash } from "../routing/hash";
import type {
  Collection,
  MetricKey,
  Metro,
  ProvenanceRecord,
  Route,
  Screen,
  Source,
  StateCode,
} from "../types/collection";

const DEFAULT_COMPARE: [string, string, string] = ["austin", "raleigh", "seattle"];

interface CollectionContextValue {
  metros: Metro[];
  provenance: Record<string, ProvenanceRecord>;
  sources: Source[];
  categories: string[];
  slots: Record<string, string[]>;
  route: Route;
  metric: MetricKey;
  setMetric: (key: MetricKey) => void;
  selState: StateCode | null;
  setSelState: (state: StateCode | null) => void;
  selectedMetro: Metro | null;
  selectedSource: Source | null;
  compareIds: [string, string, string];
  setCompareId: (index: number, id: string) => void;
  go: (screen: Screen, id?: string) => void;
  openMetro: (id: string) => void;
  openSource: (id: string) => void;
}

const CollectionContext = createContext<CollectionContextValue | null>(null);

function applyScreen(screen: Screen) {
  document.documentElement.dataset.screen = screen;
}

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Collection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? { screen: "map" } : currentRoute(),
  );
  const [metric, setMetric] = useState<MetricKey>("rpp");
  const [selState, setSelState] = useState<StateCode | null>(null);
  const [compareIds, setCompareIds] = useState<[string, string, string]>(DEFAULT_COMPARE);
  const [selectedMetroId, setSelectedMetroId] = useState<string | null>(() => {
    const initial = currentRoute();
    return initial.screen === "metro" ? initial.id : null;
  });
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(() => {
    const initial = currentRoute();
    return initial.screen === "source" ? initial.id : null;
  });

  useEffect(() => {
    loadCollection()
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load collection");
      });
  }, []);

  useEffect(() => {
    applyScreen(route.screen);
  }, [route]);

  useEffect(() => {
    const onHash = () => {
      const next = currentRoute();
      setRoute(next);
      if (next.screen === "metro") setSelectedMetroId(next.id);
      if (next.screen === "source") setSelectedSourceId(next.id);
      applyScreen(next.screen);
      window.scrollTo(0, 0);
    };
    if (!window.location.hash) replaceHash({ screen: "map" });
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const selectedMetro = useMemo(() => {
    if (!data || !selectedMetroId) return null;
    return data.metros.find((m) => m.id === selectedMetroId) ?? null;
  }, [data, selectedMetroId]);

  const selectedSource = useMemo(() => {
    if (!data || !selectedSourceId) return null;
    return data.sources.find((s) => s.id === selectedSourceId) ?? null;
  }, [data, selectedSourceId]);

  useEffect(() => {
    if (!data) return;
    if (route.screen === "metro" && !selectedMetro) {
      replaceHash({ screen: "map" });
      setRoute({ screen: "map" });
    }
    if (route.screen === "source" && !selectedSource) {
      replaceHash({ screen: "library" });
      setRoute({ screen: "library" });
    }
  }, [data, route, selectedMetro, selectedSource]);

  const go = useCallback(
    (screen: Screen, id?: string) => {
      if (screen === "compare" && selectedMetroId && !compareIds.includes(selectedMetroId)) {
        setCompareIds([selectedMetroId, compareIds[0], compareIds[1]]);
      }
      const next: Route =
        screen === "metro" && id
          ? { screen: "metro", id }
          : screen === "source" && id
            ? { screen: "source", id }
            : screen === "metro" || screen === "source"
              ? { screen: "map" }
              : { screen };
      if (screen === "metro" && id) setSelectedMetroId(id);
      if (screen === "source" && id) setSelectedSourceId(id);
      setRoute(next);
      replaceHash(next);
      applyScreen(next.screen);
      window.scrollTo(0, 0);
    },
    [compareIds, selectedMetroId],
  );

  const openMetro = useCallback((id: string) => go("metro", id), [go]);
  const openSource = useCallback((id: string) => go("source", id), [go]);

  const setCompareId = useCallback((index: number, id: string) => {
    setCompareIds((prev) => {
      const next: [string, string, string] = [...prev];
      next[index] = id;
      return next;
    });
  }, []);

  const value = useMemo<CollectionContextValue | null>(() => {
    if (!data) return null;
    return {
      metros: data.metros,
      provenance: data.provenance,
      sources: data.sources,
      categories: data.categories,
      slots: data.slots,
      route,
      metric,
      setMetric,
      selState,
      setSelState,
      selectedMetro,
      selectedSource,
      compareIds,
      setCompareId,
      go,
      openMetro,
      openSource,
    };
  }, [
    compareIds,
    data,
    go,
    metric,
    openMetro,
    openSource,
    route,
    selState,
    selectedMetro,
    selectedSource,
    setCompareId,
  ]);

  if (error) {
    return (
      <div className="wrap">
        <p className="note">Could not load the collection: {error}</p>
      </div>
    );
  }

  if (!value) {
    return (
      <div className="wrap">
        <p className="note">Loading curated collection…</p>
      </div>
    );
  }

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollection(): CollectionContextValue {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error("useCollection must be used within CollectionProvider");
  return ctx;
}
