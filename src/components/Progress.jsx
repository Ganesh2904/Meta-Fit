import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Progress = () => {
  const location = useLocation();
  const { completedWorkout } = location.state || {};
  const [history, setHistory] = useState([]);
  const hasStored = useRef(false);
  const { user } = useAuth();

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

  if (!user) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Please log in to view workout progress</h2>
          <p className="text-gray-600 mb-4">Track your workouts after logging in.</p>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    );
  }

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
