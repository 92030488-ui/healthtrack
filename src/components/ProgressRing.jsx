// Circular progress indicator drawn with SVG
export default function ProgressRing({ value, goal, label, unit, color = "var(--ht-primary)", size = 130 }) {
  const stroke = 11;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = goal > 0 ? Math.min(value / goal, 1) : 0;

  return (
    <div className="text-center">
      <div className="position-relative d-inline-block" style={{ width: size, height: size }}>
        <svg width={size} height={size} role="img" aria-label={`${label}: ${value} of ${goal} ${unit}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--ht-ring-track)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset .8s ease" }}
          />
        </svg>
        <div className="position-absolute top-50 start-50 translate-middle text-center lh-1">
          <div className="ht-ring-value">{value}</div>
          <small className="text-secondary">/ {goal}</small>
        </div>
      </div>
      <div className="fw-semibold mt-2">{label}</div>
      <small className="text-secondary">{unit}</small>
    </div>
  );
}
