import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Progress = () => {
  const location = useLocation();
  const { completedWorkout } = location.state || {};
  const [history, setHistory] = useState([]);
  const hasStored = useRef(false); // 🛑 Prevent duplicate saving

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("workoutHistory")) || [];

    if (completedWorkout && !hasStored.current) {
      const isDuplicate = stored.some(
        (w) => w.completedAt === completedWorkout.completedAt
      );

      if (!isDuplicate) {
        const updated = [...stored, completedWorkout];
        localStorage.setItem("workoutHistory", JSON.stringify(updated));
        setHistory(updated);
        hasStored.current = true;
      } else {
        setHistory(stored);
      }
    } else {
      setHistory(stored);
    }
  }, [completedWorkout]);

  if (history.length === 0) {
    return <p className="p-6">No workout history available.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>
      <ul className="space-y-4">
        {history
          .slice()
          .reverse()
          .map((w, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p>
                <strong>Group:</strong> {w.group}
              </p>
              <p>
                <strong>Level:</strong> {w.level}
              </p>
              <p>
                <strong>Sets:</strong> {w.sets}, <strong>Reps:</strong> {w.reps}
              </p>
              <p>
                <strong>Total Exercises:</strong> {w.totalExercises}
              </p>
              <p>
                <strong>Completed At:</strong>{" "}
                {new Date(w.completedAt).toLocaleString()}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Progress;
