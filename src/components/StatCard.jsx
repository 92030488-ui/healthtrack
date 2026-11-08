export default function StatCard({ icon, label, value, hint, tone = "green" }) {
  return (
    <div className="ht-card h-100 p-3 d-flex align-items-center gap-3">
      <div className={`ht-icon ht-icon-${tone}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div>
        <div className="text-secondary small">{label}</div>
        <div className="fs-4 fw-bold lh-1">{value}</div>
        {hint && <small className="text-secondary">{hint}</small>}
      </div>
    </div>
  );
}
