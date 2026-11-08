import { daysAgoISO } from "../context/HealthContext.jsx";

// Bar chart of calories burned over the last 7 days (plain SVG, no chart library)
export default function WeeklyChart({ workouts }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const iso = daysAgoISO(6 - i);
    const total = workouts.filter((w) => w.date === iso).reduce((sum, w) => sum + Number(w.calories), 0);
    const label = new Date(iso + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" });
    return { iso, total, label };
  });

  const max = Math.max(...days.map((d) => d.total), 100);
  const W = 560;
  const H = 220;
  const pad = 28;
  const barW = 42;
  const step = (W - pad * 2) / 7;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-100" role="img" aria-label="Calories burned in the last 7 days">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={pad} x2={W - pad} y1={H - 30 - (H - 60) * f} y2={H - 30 - (H - 60) * f} stroke="var(--ht-ring-track)" strokeDasharray="4 4" />
      ))}
      {days.map((d, i) => {
        const h = ((H - 60) * d.total) / max;
        const x = pad + i * step + (step - barW) / 2;
        return (
          <g key={d.iso}>
            <rect x={x} y={H - 30 - h} width={barW} height={Math.max(h, 2)} rx="8" fill="var(--ht-primary)" opacity={d.total ? 1 : 0.25}>
              <title>{`${d.label}: ${d.total} kcal`}</title>
            </rect>
            {d.total > 0 && (
              <text x={x + barW / 2} y={H - 36 - h} textAnchor="middle" fontSize="11" fill="currentColor">
                {d.total}
              </text>
            )}
            <text x={x + barW / 2} y={H - 10} textAnchor="middle" fontSize="12" fill="currentColor" opacity="0.7">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
