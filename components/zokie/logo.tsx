/**
 * Zokie's logo as the app draws it: the Facets cube (cream top, dark left face, accent right face)
 * beside the "zokie." wordmark, its full stop in the accent colour.
 * @param size - cube width and height in px; the wordmark scales with the surrounding font size
 * @param className - extra class for placement (hero, window bar)
 * Handles: small sizes (at 28 px and below the dark face is lifted so it still reads), light pages
 * (top face and edge come from --cube-top and --cube-edge, set per theme in zokie.css)
 */
export default function Logo({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`zk-logo ${className}`} role="img" aria-label="Zokie">
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <polygon className="f-top" points="50,12 82.9,31 50,50 17.1,31" />
        <polygon points="15.4,34 47.5,52.5 47.5,90.5 15.4,72" fill={size <= 28 ? "#4A463D" : "#3A372F"} />
        <polygon className="f-right" points="52.5,52.5 84.6,34 84.6,72 52.5,90.5" />
      </svg>
      <span className="word" aria-hidden="true">
        zokie<span className="stop">.</span>
      </span>
    </span>
  )
}
