import { Link } from "react-router-dom";

const features = [
  { icon: "bi-lightning-charge-fill", tone: "orange", title: "Workout logging", text: "Record exercise type, duration, calories and notes.", to: "/workouts" },
  { icon: "bi-egg-fried", tone: "green", title: "Meal tracking", text: "Log breakfast, lunch, dinner and snacks with calories.", to: "/meals" },
  { icon: "bi-bullseye", tone: "blue", title: "Daily goals", text: "Set calorie and activity targets and follow them with progress rings.", to: "/" },
  { icon: "bi-bar-chart-fill", tone: "purple", title: "Weekly charts", text: "See how many calories you burned over the last 7 days.", to: "/" },
  { icon: "bi-moon-stars-fill", tone: "blue", title: "Dark mode", text: "Switch themes from the navigation bar. Your choice is saved.", to: "/" },
  { icon: "bi-phone-fill", tone: "green", title: "Responsive design", text: "Works smoothly on phones, tablets and desktops.", to: "/" },
];

export default function Features() {
  return (
    <>
      <header className="ht-page-header">
        <div className="container">
          <h1>Features</h1>
          <p className="lead text-secondary mb-0">Everything you need to stay on track.</p>
        </div>
      </header>

      <div className="container">
        <div className="row g-4">
          {features.map((f) => (
            <div className="col-sm-6 col-lg-4" key={f.title}>
              <Link to={f.to} className="text-decoration-none text-reset">
                <div className="ht-card ht-card-hover p-4 h-100">
                  <div className={`ht-icon ht-icon-${f.tone} mb-3`}><i className={`bi ${f.icon}`}></i></div>
                  <h2 className="h5">{f.title}</h2>
                  <p className="text-secondary mb-0">{f.text}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
