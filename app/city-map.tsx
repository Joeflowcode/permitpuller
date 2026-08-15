export function CityMap() {
  return (
    <figure className="city-map" aria-label="Salem, Keizer, Stayton, Lyons, and Albany">
      <svg viewBox="0 0 520 340" role="img">
        <title>Mid-Willamette towns on the list</title>
        <path
          className="river"
          d="M118 18 C140 70 96 110 128 160 C162 214 108 250 142 322"
          fill="none"
        />
        <g className="city">
          <circle className="dot" cx="168" cy="128" r="7" />
          <text x="186" y="122">
            Salem
          </text>
          <text className="sub" x="186" y="140">
            First
          </text>
        </g>
        <g className="city">
          <circle className="dot" cx="156" cy="78" r="5.5" />
          <text x="174" y="74">
            Keizer
          </text>
        </g>
        <g className="city">
          <circle className="dot" cx="268" cy="198" r="5.5" />
          <text x="282" y="194">
            Stayton
          </text>
        </g>
        <g className="city">
          <circle className="dot" cx="338" cy="236" r="5.5" />
          <text x="352" y="232">
            Lyons
          </text>
        </g>
        <g className="city">
          <circle className="dot" cx="96" cy="248" r="5.5" />
          <text x="114" y="244">
            Albany
          </text>
        </g>
        <path className="link" d="M156 78 L168 128 L268 198 L338 236" />
        <path className="link" d="M168 128 L96 248" />
      </svg>
    </figure>
  );
}
