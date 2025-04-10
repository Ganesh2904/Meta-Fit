import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import exerciseData from "../data/exerciseData.js";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ExerciseDetails = () => {
  const { group, level } = useParams();
  const navigate = useNavigate();

  const getSetsReps = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "3 sets of 8 reps";
      case "intermediate":
        return "3 sets of 12 reps";
      case "advanced":
        return "4 sets of 12 reps";
      default:
        return "";
    }
  };

  const setsReps = getSetsReps(level);

  const getExercises = () => {
    if (group.toLowerCase() === "push") {
      return [
        ...(exerciseData["Chest"] || []).slice(0, 2),
        ...(exerciseData["Shoulder"] || []).slice(0, 2),
        ...(exerciseData["Triceps"] || []).slice(0, 2),
      ];
    }

    if (group.toLowerCase() === "pull") {
      return [
        ...(exerciseData["Biceps"] || []).slice(0, 3),
        ...(exerciseData["Back"] || []).slice(0, 3),
      ];
    }

    return (exerciseData[group] || []).slice(0, 6); // Default: 6 exercises
  };

  const selectedExercises = getExercises();

  const startWorkoutUrl = `/workout-session/${group}/${level}`;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate(-1)}
          className="text-black hover:opacity-70"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold capitalize">
          {group} - {level} Exercises
        </h1>
      </div>
      {/* Exercise Cards */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {selectedExercises.map((exercise, index) => (
          <Card
            key={index}
            className="break-inside-avoid py-0 overflow-hidden rounded-2xl shadow-sm mb-5"
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full object-cover"
            />
            <CardContent className="py-3">
              <CardTitle className="text-lg font-medium">
                {exercise.name}
              </CardTitle>

              {/* Highlighted Sets/Reps */}
              <p className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mt-2">
                {setsReps}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2">
                {exercise.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to={startWorkoutUrl}>
          <Button variant="default" size="lg">
            Start Workout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ExerciseDetails;
