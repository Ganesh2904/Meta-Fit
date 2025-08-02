import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { ID, Query } from "appwrite";
import NotLogedIn from "./NotLogedIn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "./ui/card";
import { Loader } from "./ui/loader";

const Progress = () => {
  const location = useLocation();
  const { completedWorkout } = location.state || {};
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasStored = useRef(false);
  const { user, databases, DATABASE_ID, COLLECTION_ID } = useAuth();

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
    } finally {
      setLoading(false);
    }
  }, [user, databases]);

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
          await fetchHistory();
        }
      } catch (err) {
        if (err.code === 409) {
          console.log("Workout already exists");
        } else {
          console.error("Failed to store workout:", err);
        }
      }
    };

    storeWorkout();
  }, [user, completedWorkout, fetchHistory, databases]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (!user) return <NotLogedIn />;

  if (loading) return <Loader text="loading workout history..." />;

  if (history.length === 0) {
    return <p className="p-6 text-xl">No workout history available yet.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {history.map((w) => (
          <Card
            key={w.$id}
            className="bg-gradient-to-br from-secondary/10 to-secondary/60 dark:from-card/30 dark:to-card"
          >
            <CardHeader>
              <CardTitle className="text-xl">
                {w.group} <br /> {w.level}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-6">
              <p>
                {w.sets} sets of {w.reps} reps
              </p>
              <p>Total Exercises: {w.totalExercises}</p>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground">
                {new Date(w.completedAt).toLocaleString().split(", ").join(" ")}
              </p>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default Progress;
