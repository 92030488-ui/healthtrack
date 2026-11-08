import { NavLink, Link } from "react-router-dom";
import { useHealth } from "../context/HealthContext.jsx";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/workouts", label: "Workouts" },
  { to: "/meals", label: "Meals" },
  { to: "/features", label: "Features" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  const { theme, toggleTheme } = useHealth();

  return (
    <nav className="navbar navbar-expand-lg ht-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand ht-brand" to="/">
          <i className="bi bi-heart-pulse-fill me-2"></i>HealthTrack
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {links.map((l) => (
              <li className="nav-item" key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                  data-bs-toggle="collapse"
                  data-bs-target="#mainNav.show"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ms-lg-2">
              <button
                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                <i className={`bi ${theme === "light" ? "bi-moon-stars-fill" : "bi-sun-fill"}`}></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
