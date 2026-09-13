import { MetricChips } from "../components/map/MetricChips";
import { MetroRail } from "../components/map/MetroRail";
import { UsMap } from "../components/map/UsMap";

export function MapScreen() {
  return (
    <section className="screen" id="s-map">
      <div className="intro glass">
        <div>
          <div className="mono" style={{ marginBottom: 10 }}>
            Scope &amp; how to use this collection
          </div>
          <h1>Where can a new tech grad actually afford to live?</h1>
          <p>
            This collection gathers 15–20 vetted sources on U.S. metro areas with established or growing
            technology job markets, and organizes them so the same factor can be compared across cities:{" "}
            <strong>
              jobs &amp; salaries, housing &amp; affordability, cost of living, safety &amp; quality of
              life, overall hub comparisons,
            </strong>{" "}
            and <strong>community perspectives</strong>. Start on the map — click a state to zoom to its
            metros, open a metro to see every source tagged to it, or go straight to the library to read
            the annotations. International hubs and metros without a meaningful tech market are out of
            scope. Metro names and boundaries follow the OMB definitions the federal sources use, so
            figures line up table to table.
          </p>
        </div>
        <div className="introfacts">
          <div className="fact">
            <b>Unit of analysis</b>
            <span>Metro / MSA, not city limits</span>
          </div>
          <div className="fact">
            <b>Source types</b>
            <span>Federal data, industry reports, community</span>
          </div>
          <div className="fact">
            <b>Every source annotated</b>
            <span>Covers · Value · Audience · Limits</span>
          </div>
          <div className="fact">
            <b>Every figure cited</b>
            <span>BEA 2023, released Dec 2024</span>
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
        Shaded states contain at least one tracked metro · mapped measures come from BEA tables 3 and 4,
        2023 vintage · factors awaiting a pull show the table and variable they need, never an estimate
      </div>
    </section>
  );
}
