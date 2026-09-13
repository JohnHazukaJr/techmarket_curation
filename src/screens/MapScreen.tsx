import { MetricChips } from "../components/map/MetricChips";
import { MetroRail } from "../components/map/MetroRail";
import { UsMap } from "../components/map/UsMap";
import { useCollection } from "../state/CollectionContext";

export function MapScreen() {
  const { sources, metros } = useCollection();
  return (
    <section className="screen" id="s-map">
      <div className="intro glass">
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Scope &amp; how to use this collection
          </div>
          <h1>Where can a new tech grad actually afford to live and eventually raise a young family?</h1>
          <p>
            I am gathering {sources.length} annotated sources on {metros.length} U.S. metros so I can
            compare the same family questions city to city: housing space, starting pay, jobs,
            everyday prices, safety, schools, childcare, parks, and commuting. Nightlife and dating
            are not the point. Start on the map, open a metro to read the sources tagged to it, or go
            to the library for the full notes. Metro names follow the OMB definitions the federal
            tables use. City surveys stay on the city. The Tampa Bay report is an eight-county
            region, not the Tampa MSA. Numbers come from the 20 sources; if a source does not give
            a comparable metro figure, that cell stays blank.
          </p>
        </div>
        <div className="introfacts">
          <div className="fact">
            <b>The question</b>
            <span>Live here — and raise a young family</span>
          </div>
          <div className="fact">
            <b>Unit of analysis</b>
            <span>MSA, unless a badge says city or region</span>
          </div>
          <div className="fact">
            <b>Every source annotated</b>
            <span>Covers · Value · Audience · Limits</span>
          </div>
          <div className="fact">
            <b>Every figure cited</b>
            <span>Unit, place, data year, published, link</span>
          </div>
        </div>
      </div>

      <div className="maprow">
        <div className="mapcard glass">
          <UsMap />
          <MetricChips />
        </div>
        <MetroRail />
      </div>
      <div className="note">
        Shaded states contain at least one tracked metro · mapped BEA figures are 2023 data released
        December 12, 2024 · if a source does not give a comparable metro figure, that factor stays
        awaiting pull
      </div>
    </section>
  );
}
