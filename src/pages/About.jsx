export default function About() {
  const steps = [
    { icon: "bi-pencil-square", title: "Log", text: "Add a workout or a meal in a few taps." },
    { icon: "bi-bullseye", title: "Set goals", text: "Choose daily targets for calories and active minutes." },
    { icon: "bi-graph-up-arrow", title: "Improve", text: "Watch your rings fill and your weekly chart grow." },
  ];

  return (
    <>
      <header className="ht-page-header">
        <div className="container">
          <h1>About <span className="ht-gradient-text">HealthTrack</span></h1>
          <p className="lead text-secondary mb-0">A simple place to build healthy habits.</p>
        </div>
      </header>

      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <h2 className="h3 fw-bold">Why we built it</h2>
            <p className="text-secondary">
              Many people want to be more active and eat better, but tracking progress feels complicated. HealthTrack
              removes the friction: one clean interface to record your exercise and food, compare it with your goals and
              stay motivated with clear visuals.
            </p>
            <p className="text-secondary">
              This project is a frontend web application built for the CSCI426 Advanced Web Programming course using
              React and Bootstrap. All data is stored locally in your browser, so nothing leaves your device.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="ht-card p-4">
              <h3 className="h5 mb-3">Our goals</h3>
              <ul className="list-unstyled mb-0 d-grid gap-3">
                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Make tracking fast and enjoyable</li>
                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Keep the interface clean on any screen size</li>
                <li><i className="bi bi-check-circle-fill text-success me-2"></i>Respect privacy with local-only storage</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="h3 fw-bold text-center mt-5 mb-4">How it works</h2>
        <div className="row g-3">
          {steps.map((s, i) => (
            <div className="col-md-4" key={s.title}>
              <div className="ht-card ht-card-hover p-4 h-100 text-center">
                <div className="ht-icon ht-icon-green mx-auto mb-3"><i className={`bi ${s.icon}`}></i></div>
                <h3 className="h5">{i + 1}. {s.title}</h3>
                <p className="text-secondary mb-0">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="h3 fw-bold text-center mt-5 mb-4">Built with</h2>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {["React 18", "React Router", "Bootstrap 5", "Bootstrap Icons", "Vite", "localStorage"].map((t) => (
            <span key={t} className="badge rounded-pill text-bg-light border px-3 py-2">{t}</span>
          ))}
        </div>
      </div>
    </>
  );
}
