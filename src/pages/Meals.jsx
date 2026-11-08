import { useState } from "react";
import { useHealth, todayISO } from "../context/HealthContext.jsx";
import ProgressRing from "../components/ProgressRing.jsx";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];
const emptyForm = { name: "", type: "Breakfast", calories: "", date: todayISO() };

export default function Meals() {
  const { meals, goals, addMeal, deleteMeal } = useHealth();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const today = todayISO();
  const eatenToday = meals.filter((m) => m.date === today).reduce((s, m) => s + Number(m.calories), 0);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !(Number(form.calories) > 0)) {
      setError("Enter a meal name and calories greater than 0.");
      return;
    }
    setError("");
    addMeal({ ...form, name: form.name.trim(), calories: Number(form.calories) });
    setForm({ ...emptyForm, type: form.type });
  };

  const sorted = [...meals].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <header className="ht-page-header">
        <div className="container">
          <h1>Meals</h1>
          <p className="lead text-secondary mb-0">Keep an eye on what you eat.</p>
        </div>
      </header>

      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="ht-card p-4 mb-4">
              <ProgressRing value={eatenToday} goal={goals.intake} label="Eaten today" unit="kcal" color="var(--ht-accent)" size={150} />
            </div>
            <form className="ht-card p-4" onSubmit={submit} noValidate>
              <h2 className="h5 mb-3">Add meal</h2>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="mb-3">
                <label className="form-label" htmlFor="mname">Meal</label>
                <input id="mname" name="name" className="form-control" value={form.name} onChange={onChange} placeholder="e.g. Tabbouleh" />
              </div>
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label" htmlFor="mtype">Type</label>
                  <select id="mtype" name="type" className="form-select" value={form.type} onChange={onChange}>
                    {MEAL_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="mcal">Calories</label>
                  <input id="mcal" name="calories" type="number" min="1" className="form-control" value={form.calories} onChange={onChange} />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="mdate">Date</label>
                <input id="mdate" name="date" type="date" className="form-control" value={form.date} onChange={onChange} />
              </div>
              <button className="btn btn-ht w-100" type="submit"><i className="bi bi-plus-lg me-1"></i>Add meal</button>
            </form>
          </div>

          <div className="col-lg-8">
            <div className="ht-card p-3 p-md-4">
              <h2 className="h5 mb-3">Meal history</h2>
              {sorted.length === 0 && <p className="text-secondary mb-0">No meals logged yet.</p>}
              <ul className="list-group list-group-flush">
                {sorted.map((m) => (
                  <li key={m.id} className="list-group-item bg-transparent d-flex align-items-center gap-3 px-0">
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{m.name}</div>
                      <small className="text-secondary">{m.type} · {m.date}</small>
                    </div>
                    <span className="fw-semibold">{m.calories} kcal</span>
                    <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => deleteMeal(m.id)} aria-label={`Delete ${m.name}`}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
