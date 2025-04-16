import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ID, Query } from "appwrite";

const Progress = () => {
  const location = useLocation();
  const { completedWorkout } = location.state || {};
  const [history, setHistory] = useState([]);
  const hasStored = useRef(false);
  const { user, databases, DATABASE_ID, COLLECTION_ID } = useAuth();

  // Fetch workout history with useCallback
  const fetchHistory = useCallback(async () => {
    if (!user) return;

    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("userId", user.$id),
        Query.orderDesc("completedAt"),
      ]);
      setHistory(res.documents);
    } catch (err) {
      console.error("Error fetching workout history:", err);
    }
  }, [user, databases]);

  // Store workout in Appwrite (prevent duplicates)
  useEffect(() => {
    const storeWorkout = async () => {
      if (!user || !completedWorkout || hasStored.current) return;

      const normalizedCompletedAt = new Date(
        new Date(completedWorkout.completedAt).setMilliseconds(0)
      ).toISOString();

      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
          Query.equal("userId", user.$id),
          Query.equal("group", completedWorkout.group),
          Query.equal("level", completedWorkout.level),
          Query.equal("completedAt", normalizedCompletedAt),
        ]);

        if (res.total === 0) {
          await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
              ...completedWorkout,
              userId: user.$id,
              completedAt: normalizedCompletedAt,
            }
          );
          hasStored.current = true;
          // Refresh history after successful creation
          await fetchHistory();
        }
      } catch (err) {
        // Handle duplicate error (if unique index is added)
        if (err.code === 409) {
          console.log("Workout already exists");
        } else {
          console.error("Failed to store workout:", err);
        }
      }
    };

    storeWorkout();
  }, [user, completedWorkout, fetchHistory, databases]);

  // Initial fetch of workout history
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (!user) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Please log in to view workout progress
          </h2>
          <p className="text-gray-600 mb-4">
            Track your workouts after logging in.
          </p>
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
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {history.map((w) => (
          <li key={w.$id} className="border p-4 rounded shadow">
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
