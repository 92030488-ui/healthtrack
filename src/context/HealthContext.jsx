import { createContext, useContext, useEffect, useMemo, useState } from "react";

const HealthContext = createContext(null);

const STORAGE_KEY = "healthtrack:v1";

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const daysAgoISO = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

// Sample data so the app looks alive the first time it is opened
const seed = () => ({
  theme: "light",
  goals: { burn: 500, minutes: 45, intake: 2200 },
  workouts: [
    { id: "w1", name: "Morning Run", type: "Cardio", duration: 35, calories: 320, date: todayISO(), notes: "5 km easy pace along the seaside." },
    { id: "w2", name: "Upper Body Strength", type: "Strength", duration: 50, calories: 280, date: daysAgoISO(1), notes: "Bench press, rows, shoulder press. 4 sets each." },
    { id: "w3", name: "Yoga Flow", type: "Flexibility", duration: 30, calories: 110, date: daysAgoISO(2), notes: "Sun salutations and hip openers." },
    { id: "w4", name: "HIIT Circuit", type: "Cardio", duration: 25, calories: 290, date: daysAgoISO(3), notes: "30s on / 15s off, 8 rounds." },
    { id: "w5", name: "Leg Day", type: "Strength", duration: 55, calories: 340, date: daysAgoISO(5), notes: "Squats, lunges, deadlifts." },
  ],
  meals: [
    { id: "m1", name: "Oats with banana", type: "Breakfast", calories: 380, date: todayISO() },
    { id: "m2", name: "Grilled chicken salad", type: "Lunch", calories: 520, date: todayISO() },
    { id: "m3", name: "Greek yogurt and nuts", type: "Snack", calories: 210, date: todayISO() },
    { id: "m4", name: "Lentil soup", type: "Dinner", calories: 430, date: daysAgoISO(1) },
  ],
});

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupted storage */
  }
  return seed();
}

const newId = (prefix) => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export function HealthProvider({ children }) {
  const [state, setState] = useState(load);

  // persist every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state]);

  // apply the theme to Bootstrap 5.3 color modes
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", state.theme);
  }, [state.theme]);

  const actions = useMemo(
    () => ({
      toggleTheme: () => setState((s) => ({ ...s, theme: s.theme === "light" ? "dark" : "light" })),
      addWorkout: (w) => setState((s) => ({ ...s, workouts: [{ ...w, id: newId("w") }, ...s.workouts] })),
      updateWorkout: (id, patch) =>
        setState((s) => ({ ...s, workouts: s.workouts.map((w) => (w.id === id ? { ...w, ...patch } : w)) })),
      deleteWorkout: (id) => setState((s) => ({ ...s, workouts: s.workouts.filter((w) => w.id !== id) })),
      addMeal: (m) => setState((s) => ({ ...s, meals: [{ ...m, id: newId("m") }, ...s.meals] })),
      deleteMeal: (id) => setState((s) => ({ ...s, meals: s.meals.filter((m) => m.id !== id) })),
      updateGoals: (goals) => setState((s) => ({ ...s, goals: { ...s.goals, ...goals } })),
      resetData: () => setState(seed()),
    }),
    []
  );

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);
  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
}

export function useHealth() {
  const ctx = useContext(HealthContext);
  if (!ctx) throw new Error("useHealth must be used inside <HealthProvider>");
  return ctx;
}
