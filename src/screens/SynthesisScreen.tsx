import { useCollection } from "../state/CollectionContext";

const SOURCES: { id: string; text: string }[] = [
  {
    id: "bls",
    text: "U.S. Bureau of Labor Statistics. May 2025 Metropolitan and Nonmetropolitan Area Occupational Employment and Wage Estimates.",
  },
  {
    id: "levelsfyi",
    text: "Levels.fyi. Entry Level Software Engineer Salary in United States.",
  },
  {
    id: "orlando-econ",
    text: "Neil Hamilton, Orlando Economic Partnership. “Orlando Tech Employment Nears 80,000” (July 3, 2025).",
  },
  {
    id: "acs",
    text: "U.S. Census Bureau. 2024 American Community Survey, Selected Housing Characteristics (DP04).",
  },
  {
    id: "hud",
    text: "U.S. Department of Housing and Urban Development. Comprehensive Housing Market Analysis: North Port–Sarasota–Bradenton, Florida (April 1, 2025).",
  },
  { id: "zillow", text: "Zillow Research. Housing Data." },
  { id: "redfin", text: "Redfin. Redfin Data Center." },
  {
    id: "bea",
    text: "U.S. Bureau of Economic Analysis. Regional Price Parities by State and Metro Area.",
  },
  { id: "mit-lwc", text: "Living Wage Institute via MIT. Living Wage Calculator." },
  {
    id: "fbi",
    text: "Federal Bureau of Investigation. 2024 Reported Crimes in the Nation Statistics (August 5, 2025).",
  },
  { id: "austin-survey", text: "City of Austin and ETC Institute. 2025 Community Survey." },
  { id: "raleigh-survey", text: "City of Raleigh and ETC Institute. 2024 Community Survey." },
  { id: "cbre", text: "CBRE Research. Scoring Tech Talent 2026 (August 18, 2026)." },
  { id: "tampa-bay", text: "Tampa Bay Partnership. 2026 Regional Competitiveness Report." },
  {
    id: "reddit",
    text: "Reddit, r/SameGrassButGreener. “B-list” Tech Cities That Are Actually Nice Places to Live?",
  },
  { id: "niche-pitt", text: "Niche contributors. Pittsburgh, PA Reviews." },
  {
    id: "reddit-six",
    text: "Reddit, r/SameGrassButGreener. “Looking at these 6 places, which fits the criteria best?” (January 2026).",
  },
  {
    id: "reddit-rdu",
    text: "Reddit, r/SameGrassButGreener. “RDU for 29m” (January 2026).",
  },
  { id: "niche-tampa", text: "Niche contributors. Tampa, FL Reviews." },
  { id: "niche-orlando", text: "Niche contributors. Orlando, FL Reviews." },
  {
    id: "dol-ndcp",
    text: "U.S. Department of Labor, Women’s Bureau. National Database of Childcare Prices.",
  },
  {
    id: "jchs",
    text: "Joint Center for Housing Studies of Harvard University. The State of the Nation’s Housing 2025.",
  },
  {
    id: "brookings-podcast",
    text: "Brookings Institution. “What Is Driving Up Housing Costs Across the US?” (May 15, 2025).",
  },
  {
    id: "fbi-cde",
    text: "FBI Crime Data Explorer. Crime in the United States, 2024, Table 6.",
  },
  {
    id: "nces-elsi",
    text: "National Center for Education Statistics. Elementary and Secondary Information System.",
  },
];

export function SynthesisScreen() {
  const { go, openSource } = useCollection();

  return (
    <section className="screen" id="s-synthesis">
      <div className="detailhead glass">
        <div>
          <div className="mono section-label">Synthesis</div>
          <h1>Comparing Tech Hubs Beyond Salary</h1>
          <p className="synth-byline">John Hazuka · CMPA 4301 · Texas Tech University</p>
        </div>
        <button type="button" className="btn ghost" onClick={() => go("map")}>
          ← Back to map
        </button>
      </div>

      <div className="about glass">
        <div className="about-block">
          <div className="mono section-label">Why I made this guide</div>
          <div className="lede">
            <p>
              I am getting closer to graduating, and I have been trying to figure out what makes a
              tech market worth considering after school. Salary is an obvious place to start, but a
              salary by itself does not tell me much. Rent, home prices, transportation, childcare,
              and the kind of jobs available all change what that number means. I made this guide
              for college students and recent graduates who are comparing places to start a tech
              career and want a clearer way to look at the full picture.
            </p>
            <p>
              My collection has 25 annotated sources covering 20 metro areas. It includes government
              data, regional reports, housing tools, resident reviews, and online discussions. The
              sources do not all answer the same question, which is part of the point. I use the
              national data to compare places on a common basis, then use local sources to
              understand details the national numbers miss.{" "}
              <button type="button" className="map-link" onClick={() => go("map")}>
                The collection map
              </button>{" "}
              lets readers explore the metros and source notes themselves.
            </p>
          </div>
        </div>

        <div className="about-block">
          <div className="mono section-label">A job market number is not a job offer</div>
          <div className="lede">
            <p>
              I would start with the kind of work I want to do and look for actual openings in that
              field. The Bureau of Labor Statistics gives employment and wage estimates by
              occupation and metro, so it is useful for comparing places using the same source. The
              map uses its May 2025 annual mean for computer and mathematical occupations. That
              includes people at different career stages, though, so I would not use it as my
              expected starting salary. It also does not say which employers are hiring right now.
              [1]
            </p>
            <p>
              For a new graduate, I would put that broad BLS number next to entry-level salary
              information, current job postings, and the details of a real offer. Levels.fyi is
              closer to the entry-level question, but its reported compensation can include stock
              and bonuses as well as base salary. I would compare base pay first, since it is the
              part of compensation that is easiest to plan around month to month. Submitted salaries
              can be useful for spotting a range, but they do not guarantee what a local employer
              will pay. [2]
            </p>
            <p>
              Orlando shows why it helps to separate workforce size from starting pay. The Orlando
              Economic Partnership reports 77,700 tech workers in 2024 and says the area was
              projected to approach 80,000 in 2025. Its definition combines tech occupations and
              jobs at tech companies while avoiding overlap, so it is not a count of open positions.
              The same article reports a 2024 median salary of $103,000 for workers in tech
              occupations, not entry-level workers. Those details make the article useful background
              on Orlando’s tech economy, but they do not replace checking current openings and
              entry-level offers. [3]
            </p>
            <p>
              CBRE and the Tampa Bay Partnership give broader regional context. CBRE compares tech
              talent markets and workforce trends, while the Tampa Bay report looks across several
              indicators such as wages, housing, transportation, and talent. These reports can help
              me decide which places deserve a closer look. Their regions and measures are not
              always the same as the metro definitions in BLS or Census data, so I would check the
              geography and date before comparing a headline number with another source. [13] [14]
            </p>
          </div>
        </div>

        <div className="about-block">
          <div className="mono section-label">Put pay next to housing</div>
          <div className="lede">
            <p>
              The Tampa and Orlando figures on my map make the salary and housing connection easier
              to see. For May 2025, BLS lists an annual mean of $108,860 for computer and
              mathematical occupations in Tampa and $105,980 in Orlando. The 2024 Census median
              gross rent is $1,776 per month in Tampa and $1,877 in Orlando. Median home values are
              $387,000 and $409,000, respectively. These figures point to a difference worth
              investigating: Tampa’s occupational mean is higher while its metro medians for rent
              and home value are lower. But the wage is an average across experience levels, the
              housing figures are medians for different households, and the years do not line up
              exactly. This is a first comparison, not proof that one person would be better off in
              Tampa. [1] [4]
            </p>
            <p>
              The Census American Community Survey is a useful baseline because I can compare the
              same housing measures across metros. Still, a metro median does not tell me what a
              current listing costs, how many bedrooms it has, or whether it is near a job. Zillow
              and Redfin can help me follow current housing trends, but each uses its own measures
              and update schedule. Before I compare numbers, I would match the housing type,
              geography, and date as closely as I can. Then I would look at real listings in areas I
              might actually live. [4] [6] [7]
            </p>
            <p>
              Sarasota is a good reminder that a place can be appealing for reasons beyond its tech
              job count, while still requiring a closer look at housing. HUD’s North
              Port–Sarasota–Bradenton analysis covers employment, population, sales, rentals,
              construction, and expected demand. It gives more context than one home-price number,
              but it describes conditions in April 2025 and includes projections. It does not settle
              whether a particular neighborhood fits someone’s commute, housing budget, or job
              search. [5]
            </p>
          </div>
        </div>

        <div className="about-block">
          <div className="mono section-label">The rest of the budget changes the comparison</div>
          <div className="lede">
            <p>
              Housing is only one part of what a paycheck has to cover. The Bureau of Economic
              Analysis Regional Price Parities give a broad comparison of price levels, with 100
              representing the national average. On the map, Tampa’s 2023 overall parity is 103.4
              and Orlando’s is 101.1. Their housing price levels are 123.3 and 121.0. These indexes
              suggest that housing costs in both metros were above the national level in that data
              year, even though the overall price comparisons differ. They are not rent quotes or
              household budgets, and they do not tell me exactly what groceries, insurance, or
              transportation will cost. [8]
            </p>
            <p>
              The map also shows how different the comparison can look in another region.
              Pittsburgh’s 2023 overall parity is 94.4 and housing price level is 73.5, while
              Raleigh’s is 98.0 and 104.0. That makes Pittsburgh a useful place to examine if
              housing cost is a major factor, and Raleigh a useful comparison for someone looking at
              a different tech market. These indexes alone cannot establish which is the better
              move. I would still need to match likely pay, actual housing options, and the costs
              that matter to me. [8]
            </p>
            <p>
              MIT’s Living Wage Calculator adds a household view by estimating basic costs for
              different household types and locations. The Department of Labor’s National Database
              of Childcare Prices can help with the childcare part of the budget. Its latest
              county-level file covers 2008 through 2022, so it is useful for comparing patterns but
              not a current quote. I would use these tools alongside the BEA index: BEA helps
              compare general price levels, while the calculators get closer to specific expenses.
              Both are starting estimates. A real budget still needs actual housing, transportation,
              health insurance, debt payments, savings, and whatever work or family arrangements
              apply. [9] [21]
            </p>
            <p>
              Housing trends also need context. The State of the Nation’s Housing report and
              Brookings’ discussion of housing costs help explain wider pressures that can affect
              several markets at once. They are useful for understanding why affordability changes,
              but they do not tell me what a particular household will pay next month. I would use
              those sources to ask better questions, then return to local listings and current
              costs. [22] [23]
            </p>
          </div>
        </div>

        <div className="about-block">
          <div className="mono section-label">Safety and daily life need more than one source</div>
          <div className="lede">
            <p>
              I would be careful about treating any citywide crime figure as a complete answer about
              safety. The FBI’s 2024 data is an official starting point, but it reports crime known
              to law enforcement and the available metro table does not include every place in my
              collection. The map leaves the violent-crime metric blank for Atlanta, Miami, Orlando,
              Tampa, and North Port–Sarasota–Bradenton because the source does not publish an MSA
              row for them there. A blank is more honest than filling in a number from a different
              geography and acting like the comparison is even. For a place I am seriously
              considering, I would look for local data and learn about specific neighborhoods. [10]
              [24]
            </p>
            <p>
              Resident surveys and reviews help with another part of the question: how people
              describe everyday life and city services. Austin’s 2025 community survey and
              Raleigh’s 2024 survey ask residents about quality of life and local priorities. They
              can bring up concerns such as growth, housing, transportation, or services, but they
              cover city limits and different years. They do not represent every suburb in the
              metro. [11] [12]
            </p>
            <p>
              Niche reviews and Reddit discussions can also point me toward details to research.
              People may mention traffic, weather, housing, access to outdoor activities, or the
              feel of a neighborhood. Those experiences matter, but the commenters are not a
              representative sample. A thread comparing six cities is especially useful for seeing
              what one person values, not for deciding what most recent graduates want. I use
              personal accounts to create questions, then check those questions against data or
              local information. [15] [16] [17] [18] [19] [20]
            </p>
            <p>
              I also need to look at schools, childcare, parks, and commuting separately if they
              matter to my situation. My collection now includes tools for school information and
              childcare costs, but those tools do not create a consistent quality score for every
              metro. A citywide number cannot tell me whether a specific school or commute fits. I
              would use the National Database of Childcare Prices and the Department of Education’s
              Elementary and Secondary Information System to narrow down areas, and then confirm
              details locally. [9] [21] [25]
            </p>
          </div>
        </div>

        <div className="about-block">
          <div className="mono section-label">How I would use the map</div>
          <div className="lede">
            <p>
              The map is meant to help me narrow down places, not pick a winner for everyone. I
              would first filter for metros with opportunities in the kind of tech role I want.
              Then I would compare likely entry-level base pay with housing I could actually see
              myself renting or buying. After that, I would estimate a full monthly budget and
              check commuting, safety, childcare, schools, parks, and resident comments for the
              neighborhoods I am considering.
            </p>
            <p>
              I would keep notes on the year, geography, and type of each number. For example, a
              BLS metro wage, a Census metro housing median, a BEA price index, and a city resident
              survey answer different questions. Putting them in one chart does not make them
              interchangeable. The map labels those differences and links back to the original
              sources, so someone can decide whether a number fits the question they have.
            </p>
            <p>
              My main takeaway so far is that a strong-looking tech market is only one part of a
              move. Tampa and Orlando show how wages, rents, and home values can point in different
              directions even within the same state. Pittsburgh and Raleigh show why broad price
              indexes can help identify a comparison worth researching, but cannot substitute for
              current job offers or household budgets. I would rather narrow the list using several
              kinds of evidence than rank cities with one score. The right place will depend on the
              job, the housing, and the everyday tradeoffs each person is willing to make.
            </p>
          </div>
        </div>

        <div className="about-block">
          <div className="mono section-label">Sources</div>
          <ol className="synth-sources">
            {SOURCES.map((source) => (
              <li key={source.id}>
                <button type="button" onClick={() => openSource(source.id)}>
                  {source.text}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
