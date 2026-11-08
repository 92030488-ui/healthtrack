import { useState } from "react";
import { Link } from "react-router-dom";
import { useHealth, todayISO } from "../context/HealthContext.jsx";

const TYPES = ["Cardio", "Strength", "Flexibility", "Sports"];
const emptyForm = { name: "", type: "Cardio", duration: "", calories: "", date: todayISO(), notes: "" };

export default function Workouts() {
  const { workouts, addWorkout, deleteWorkout } = useHealth();
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState({});

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Please enter a name.";
    if (!(Number(form.duration) > 0)) err.duration = "Duration must be more than 0.";
    if (!(Number(form.calories) >= 0) || form.calories === "") err.calories = "Enter calories (0 or more).";
    setErrors(err);
    if (Object.keys(err).length) return;
    addWorkout({ ...form, name: form.name.trim(), duration: Number(form.duration), calories: Number(form.calories) });
    setForm(emptyForm);
  };

  const shown = workouts
    .filter((w) => filter === "All" || w.type === filter)
    .filter((w) => w.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <header className="ht-page-header">
        <div className="container">
          <h1>Workouts</h1>
          <p className="lead text-secondary mb-0">Log a session and browse your history.</p>
        </div>
      </header>

      <div className="container">
        <div className="row g-4">
          {/* Form */}
          <div className="col-lg-4">
            <form className="ht-card p-4" onSubmit={submit} noValidate>
              <h2 className="h5 mb-3">Add workout</h2>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">Name</label>
                <input id="name" name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={form.name} onChange={onChange} placeholder="e.g. Evening jog" />
                <div className="invalid-feedback">{errors.name}</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="type">Type</label>
                <select id="type" name="type" className="form-select" value={form.type} onChange={onChange}>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label" htmlFor="duration">Minutes</label>
                  <input id="duration" name="duration" type="number" min="1" className={`form-control ${errors.duration ? "is-invalid" : ""}`} value={form.duration} onChange={onChange} />
                  <div className="invalid-feedback">{errors.duration}</div>
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="calories">Calories</label>
                  <input id="calories" name="calories" type="number" min="0" className={`form-control ${errors.calories ? "is-invalid" : ""}`} value={form.calories} onChange={onChange} />
                  <div className="invalid-feedback">{errors.calories}</div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="date">Date</label>
                <input id="date" name="date" type="date" className="form-control" value={form.date} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="notes">Notes (optional)</label>
                <textarea id="notes" name="notes" rows="2" className="form-control" value={form.notes} onChange={onChange}></textarea>
              </div>
              <button className="btn btn-ht w-100" type="submit">
                <i className="bi bi-plus-lg me-1"></i>Add workout
              </button>
            </form>
          </div>

          {/* List */}
          <div className="col-lg-8">
            <div className="row g-2 mb-3">
              <div className="col-md-7">
                <input className="form-control" placeholder="Search workouts..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search workouts" />
              </div>
              <div className="col-md-5">
                <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by type">
                  <option>All</option>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {shown.length === 0 && (
              <div className="ht-card p-5 text-center text-secondary">
                <i className="bi bi-emoji-neutral fs-1"></i>
                <p className="mb-0 mt-2">No workouts found.</p>
              </div>
            )}

            <div className="d-flex flex-column gap-3">
              {shown.map((w) => (
                <div key={w.id} className="ht-card ht-card-hover p-3 d-flex flex-wrap align-items-center gap-3">
                  <div className="flex-grow-1">
                    <Link to={`/workouts/${w.id}`} className="fw-semibold fs-5 text-decoration-none">{w.name}</Link>
                    <div className="small text-secondary">
                      <i className="bi bi-calendar3 me-1"></i>{w.date} · <i className="bi bi-stopwatch me-1"></i>{w.duration} min · <i className="bi bi-fire me-1"></i>{w.calories} kcal
                    </div>
                  </div>
                  <span className={`badge badge-type type-${w.type}`}>{w.type}</span>
                  <div className="d-flex gap-2">
                    <Link to={`/workouts/${w.id}`} className="btn btn-sm btn-outline-secondary rounded-pill">Details</Link>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      onClick={() => window.confirm("Delete this workout?") && deleteWorkout(w.id)}
                      aria-label={`Delete ${w.name}`}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
