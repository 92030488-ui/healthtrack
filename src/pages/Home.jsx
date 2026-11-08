import { Link } from "react-router-dom";
import { useHealth, todayISO } from "../context/HealthContext.jsx";
import ProgressRing from "../components/ProgressRing.jsx";
import StatCard from "../components/StatCard.jsx";
import WeeklyChart from "../components/WeeklyChart.jsx";

export default function Home() {
  const { workouts, meals, goals } = useHealth();
  const today = todayISO();

  const todayWorkouts = workouts.filter((w) => w.date === today);
  const burned = todayWorkouts.reduce((s, w) => s + Number(w.calories), 0);
  const minutes = todayWorkouts.reduce((s, w) => s + Number(w.duration), 0);
  const eaten = meals.filter((m) => m.date === today).reduce((s, m) => s + Number(m.calories), 0);
  const recent = workouts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="ht-hero">
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center gy-4">
            <div className="col-lg-7 fade-up">
              <span className="badge rounded-pill text-bg-light border mb-3 px-3 py-2">
                <i className="bi bi-stars text-warning me-1"></i> Your personal wellness companion
              </span>
              <h1>
                Track your body.<br />
                <span className="ht-gradient-text">Level up your health.</span>
              </h1>
              <p className="lead text-secondary mt-3 mb-4">
                Log workouts and meals in seconds, follow your daily goals and see your progress build up day after day.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link to="/workouts" className="btn btn-ht btn-lg">
                  <i className="bi bi-plus-circle me-2"></i>Log a workout
                </Link>
                <Link to="/features" className="btn btn-outline-secondary btn-lg rounded-pill px-4">
                  Explore features
                </Link>
              </div>
            </div>
            <div className="col-lg-5 fade-up fade-up-2">
              <div className="ht-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 mb-0">Today</h2>
                  <small className="text-secondary">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                  </small>
                </div>
                <div className="row g-2">
                  <div className="col-6">
                    <ProgressRing value={burned} goal={goals.burn} label="Burned" unit="kcal" size={120} />
                  </div>
                  <div className="col-6">
                    <ProgressRing value={minutes} goal={goals.minutes} label="Active" unit="minutes" color="var(--ht-blue)" size={120} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="container mt-5">
        <div className="row g-3">
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-fire" label="Calories burned" value={burned} hint="today" tone="orange" />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-egg-fried" label="Calories eaten" value={eaten} hint={`goal ${goals.intake}`} tone="green" />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-stopwatch" label="Active minutes" value={minutes} hint={`goal ${goals.minutes}`} tone="blue" />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-trophy" label="Total workouts" value={workouts.length} hint="all time" tone="purple" />
          </div>
        </div>
      </section>

      {/* Chart + recent */}
      <section className="container mt-5">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="ht-card p-4 h-100">
              <h2 className="h5">Last 7 days</h2>
              <p className="text-secondary small">Calories burned per day</p>
              <WeeklyChart workouts={workouts} />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="ht-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Recent workouts</h2>
                <Link to="/workouts" className="small">See all</Link>
              </div>
              {recent.length === 0 && <p className="text-secondary">No workouts yet. Add your first one!</p>}
              <div className="d-flex flex-column gap-2">
                {recent.map((w) => (
                  <Link key={w.id} to={`/workouts/${w.id}`} className="workout-row ht-card ht-card-hover p-3 d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{w.name}</div>
                      <small className="text-secondary">{w.date} · {w.duration} min</small>
                    </div>
                    <span className={`badge badge-type type-${w.type}`}>{w.calories} kcal</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mt-5">
        <div className="ht-card p-4 p-md-5 text-center">
          <h2 className="fw-bold">Ready to start today?</h2>
          <p className="text-secondary mb-4">Small daily actions build big results. Log your next workout or meal now.</p>
          <Link to="/meals" className="btn btn-ht me-2 mb-2">Log a meal</Link>
          <Link to="/workouts" className="btn btn-outline-secondary rounded-pill px-4 mb-2">Log a workout</Link>
        </div>
      </section>
    </>
  );
}
