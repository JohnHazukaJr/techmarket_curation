import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { Feature, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import { METRICS, val } from "../../data/metrics";
import { FIPS, fipsId, stateFromFips } from "../../data/states";
import { useCollection } from "../../state/CollectionContext";
import type { Metro } from "../../types/collection";

type StateFeature = Feature<Geometry> & { id?: string | number };

const ATLAS_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/states-10m.json";

let atlasPromise: Promise<StateFeature[] | null> | null = null;

function loadAtlas(): Promise<StateFeature[] | null> {
  if (!atlasPromise) {
    atlasPromise = fetch(ATLAS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((topo: Topology) => {
        const states = topo.objects.states as GeometryCollection;
        const fc = feature(topo, states);
        return fc.features as StateFeature[];
      })
      .catch(() => null);
  }
  return atlasPromise;
}

export function UsMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gStatesRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const gPinsRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const projectionRef = useRef(d3.geoAlbersUsa().scale(1180).translate([480, 300]));
  const pathRef = useRef(d3.geoPath(projectionRef.current));
  const featuresRef = useRef<StateFeature[]>([]);
  const [atlasReady, setAtlasReady] = useState(false);
  const [atlasFailed, setAtlasFailed] = useState(false);
  const { metros, metric, selState, setSelState, openMetro } = useCollection();

  useEffect(() => {
    const node = svgRef.current;
    if (!node) return;
    const svg = d3.select(node);
    if (svg.select("g.states").empty()) {
      gStatesRef.current = svg.append("g").attr("class", "states");
      gPinsRef.current = svg.append("g").attr("class", "pins");
    } else {
      gStatesRef.current = svg.select("g.states");
      gPinsRef.current = svg.select("g.pins");
    }

    let cancelled = false;
    loadAtlas().then((features) => {
      if (cancelled) return;
      if (!features) {
        setAtlasFailed(true);
        return;
      }
      featuresRef.current = features;
      setAtlasReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const node = svgRef.current;
    if (!node || !atlasFailed) return;
    const svg = d3.select(node);
    if (!svg.select("text.offline").empty()) return;
    svg
      .append("text")
      .attr("class", "offline")
      .attr("x", 480)
      .attr("y", 300)
      .attr("text-anchor", "middle")
      .attr("font-family", "var(--mono)")
      .attr("font-size", 13)
      .attr("fill", "#667")
      .text("Map geometry unavailable offline — metro rail still works");
  }, [atlasFailed]);

  useEffect(() => {
    const gStates = gStatesRef.current;
    if (!gStates || !atlasReady) return;
    const path = pathRef.current;
    const have = new Set(metros.map((m) => FIPS[m.state]));
    const features = featuresRef.current;

    gStates
      .selectAll<SVGPathElement, StateFeature>("path")
      .data(features)
      .join("path")
      .attr("d", path)
      .attr("class", (d) => "state" + (have.has(fipsId(d.id)) ? " has" : ""))
      .classed("sel", (d) => (selState ? fipsId(d.id) === FIPS[selState] : false))
      .on("click", (_event, d) => {
        const st = stateFromFips(d.id);
        if (!st || !have.has(fipsId(d.id))) return;
        setSelState(st);
      });

    const zoomTo = (feat: StateFeature) => {
      const [[x0, y0], [x1, y1]] = path.bounds(feat);
      const dx = x1 - x0;
      const dy = y1 - y0;
      const cx = (x0 + x1) / 2;
      const cy = (y0 + y1) / 2;
      const k = Math.min(4.2, 0.78 / Math.max(dx / 960, dy / 600));
      const t = `translate(${480 - k * cx},${300 - k * cy}) scale(${k})`;
      gStates.transition().duration(750).attr("transform", t);
      gPinsRef.current?.transition().duration(750).attr("transform", t);
      gPinsRef.current
        ?.selectAll(".pin")
        .transition()
        .duration(750)
        .attr("data-k", String(k));
      gPinsRef.current
        ?.selectAll<SVGElement, unknown>(".pin > *")
        .transition()
        .duration(750)
        .attr("transform", `scale(${1 / k})`);
    };

    const resetZoom = () => {
      gStates.transition().duration(700).attr("transform", null);
      gPinsRef.current?.transition().duration(700).attr("transform", null);
      gPinsRef.current
        ?.selectAll<SVGElement, unknown>(".pin > *")
        .transition()
        .duration(700)
        .attr("transform", null);
    };

    if (selState) {
      const feat = features.find((d) => fipsId(d.id) === FIPS[selState]);
      if (feat) zoomTo(feat);
    } else {
      resetZoom();
    }
  }, [atlasReady, metros, selState, setSelState]);

  useEffect(() => {
    const gPins = gPinsRef.current;
    const projection = projectionRef.current;
    if (!gPins) return;

    const list = selState ? metros.filter((m) => m.state === selState) : metros;
    const placed = list.filter((m) => projection([m.lon, m.lat]));
    const arr = metros.map((m) => val(m, metric));
    const mn = Math.min(...arr);
    const mx = Math.max(...arr);
    const def = METRICS.find((x) => x.k === metric);

    const pins = gPins.selectAll<SVGGElement, Metro>("g.pin").data(placed, (d) => d.id);
    pins.exit().remove();
    const entered = pins
      .enter()
      .append("g")
      .attr("class", "pin")
      .on("click", (_event, d) => openMetro(d.id));
    entered.append("circle").attr("class", "halo").attr("r", 13);
    entered.append("circle").attr("class", "dot").attr("r", 5.2);
    entered.append("text").attr("y", -17).attr("text-anchor", "middle");

    const all = entered.merge(pins);
    all.attr("transform", (d) => {
      const p = projection([d.lon, d.lat]);
      return p ? `translate(${p[0]},${p[1]})` : "";
    });
    all
      .select("text")
      .text((d) => (selState ? d.name.split("–")[0] : ""))
      .attr("opacity", selState ? 1 : 0);
    all.select(".halo").attr("r", (d) => {
      const n = (val(d, metric) - mn) / (mx - mn || 1);
      return 8 + (def?.hi ? n : 1 - n) * 13;
    });
  }, [metros, metric, selState, openMetro, atlasReady]);

  return (
    <svg
      ref={svgRef}
      id="usmap"
      viewBox="0 0 960 600"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="United States map of tracked tech-hub metros"
    />
  );
}
