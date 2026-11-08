import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useHealth } from "../context/HealthContext.jsx";
import StatCard from "../components/StatCard.jsx";

// Dynamic page: /workouts/:id
export default function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, updateWorkout, deleteWorkout } = useHealth();
  const workout = workouts.find((w) => w.id === id);

  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(workout?.notes ?? "");

  if (!workout) {
    return (
      <div className="container text-center py-5">
        <i className="bi bi-question-circle display-3 text-secondary"></i>
        <h1 className="h3 mt-3">Workout not found</h1>
        <p className="text-secondary">It may have been deleted.</p>
        <Link to="/workouts" className="btn btn-ht">Back to workouts</Link>
      </div>
    );
  }

  const perMinute = (workout.calories / workout.duration).toFixed(1);

  const saveNotes = () => {
    updateWorkout(workout.id, { notes });
    setEditing(false);
  };

  const remove = () => {
    if (window.confirm("Delete this workout?")) {
      deleteWorkout(workout.id);
      navigate("/workouts");
    }
  };

  return (
    <>
      <header className="ht-page-header">
        <div className="container">
          <Link to="/workouts" className="text-decoration-none small">
            <i className="bi bi-arrow-left me-1"></i>All workouts
          </Link>
          <h1 className="mt-2">{workout.name}</h1>
          <span className={`badge badge-type type-${workout.type}`}>{workout.type}</span>
          <span className="text-secondary ms-2">{workout.date}</span>
        </div>
      </header>

      <div className="container">
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <StatCard icon="bi-stopwatch" label="Duration" value={`${workout.duration} min`} tone="blue" />
          </div>
          <div className="col-12 col-md-4">
            <StatCard icon="bi-fire" label="Calories burned" value={`${workout.calories} kcal`} tone="orange" />
          </div>
          <div className="col-12 col-md-4">
            <StatCard icon="bi-speedometer2" label="Intensity" value={`${perMinute} kcal/min`} tone="purple" />
          </div>
        </div>

        <div className="ht-card p-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="h5 mb-0">Notes</h2>
            {!editing && (
              <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={() => setEditing(true)}>
                <i className="bi bi-pencil me-1"></i>Edit
              </button>
            )}
          </div>
          {editing ? (
            <>
              <textarea className="form-control mb-2" rows="4" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
              <button className="btn btn-ht btn-sm me-2" onClick={saveNotes}>Save</button>
              <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => { setNotes(workout.notes); setEditing(false); }}>
                Cancel
              </button>
            </>
          ) : (
            <p className="text-secondary mb-0">{workout.notes || "No notes added."}</p>
          )}
        </div>

        <div className="mt-4">
          <button className="btn btn-outline-danger rounded-pill" onClick={remove}>
            <i className="bi bi-trash me-1"></i>Delete workout
          </button>
        </div>
      </div>
    </>
  );
}
