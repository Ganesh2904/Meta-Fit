import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import exerciseData from "../data/exerciseData";
import { useAuth } from "@/context/AuthContext";
import NotLogedIn from "./NotLogedIn";

const WorkoutSession = () => {
  const { group, level } = useParams();
  const navigate = useNavigate();
  const [setIndex, setSetIndex] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const { user } = useAuth();

  const getSetsAndReps = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return { sets: 3, reps: 8 };
      case "intermediate":
        return { sets: 3, reps: 12 };
      case "advanced":
        return { sets: 4, reps: 12 };
      default:
        return { sets: 3, reps: 10 };
    }
  };

  const { sets, reps } = getSetsAndReps(level);

  const getExercises = () => {
    const groupLower = group.toLowerCase(); // Ensure consistent lowercase comparison
    if (groupLower === "push") {
      return [
        ...(exerciseData["Chest"] || []).slice(0, 2),
        ...(exerciseData["Shoulder"] || []).slice(0, 2),
        ...(exerciseData["Triceps"] || []).slice(0, 2),
      ];
    }
    if (groupLower === "pull") {
      return [
        ...(exerciseData["Biceps"] || []).slice(0, 3),
        ...(exerciseData["Back"] || []).slice(0, 3),
      ];
    }
    return (exerciseData[group] || []).slice(0, 6);
  };

  const exercises = getExercises();

  const currentExercise = exercises[exerciseIndex];

  const totalExercises = exercises.length;
  const isLastExercise = exerciseIndex === totalExercises - 1;
  const isFirstExercise = exerciseIndex === 0;
  const isLastSet = setIndex === sets;

  const handleNext = () => {
    if (!isLastExercise) {
      setExerciseIndex((prev) => prev + 1);
      return;
    }

    if (!isLastSet) {
      setExerciseIndex(0);
      setSetIndex((prev) => prev + 1);
      return;
    }

    // If last set and last exercise, navigate to progress with workout data
    navigate("/progress", {
      state: {
        completedWorkout: {
          group,
          level,
          sets,
          reps,
          totalExercises: exercises.length,
          completedAt: new Date().toISOString(),
        },
      },
    });
  };

  const handlePrevious = () => {
    if (!isFirstExercise) {
      setExerciseIndex(exerciseIndex - 1);
    } else if (setIndex > 1) {
      setExerciseIndex(totalExercises - 1);
      setSetIndex(setIndex - 1);
    }
  };

  const isFirstStep = setIndex === 1 && exerciseIndex === 0;
  const isLastStep = isLastSet && isLastExercise;

  if (!user) return <NotLogedIn />;

  // Guard: if no exercises available, display a fallback message.
  if (!exercises || exercises.length === 0) {
    return (
      <div className="flex justify-center p-10">
        <p>No exercises available for the "{group}" group.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 md:p-10">
      <Card className="w-full max-w-md md:max-w-2xl border-none shadow-none">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left Column: Image */}
          <div className="flex items-center justify-center">
            <img
              src={currentExercise.image}
              alt={currentExercise.name}
              className="w-full h-auto max-h-[400px] object-contain rounded-xl shadow"
            />
          </div>

          {/* Right Column: Info + Controls */}
          <div className="flex flex-col justify-center gap-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold">{currentExercise.name}</h2>

            <p className="text-sm font-semibold text-yellow-700 bg-yellow-100 inline-block px-4 py-1 rounded-full self-center md:self-start">
              Set {setIndex} of {sets} — {reps} Reps
            </p>

            <p className="text-muted-foreground">
              {currentExercise.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstStep}
              >
                Previous
              </Button>
              <Button onClick={handleNext}>
                {isLastStep ? "Finish Workout" : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutSession;
