import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import NotLogedIn from "./NotLogedIn";

const workoutData = [
  { group: "Chest", levels: ["Beginner", "Intermediate", "Advanced"] },
  { group: "Shoulder", levels: ["Beginner", "Intermediate", "Advanced"] },
  { group: "Triceps", levels: ["Beginner", "Intermediate", "Advanced"] },
  { group: "Biceps", levels: ["Beginner", "Intermediate", "Advanced"] },
  { group: "Back", levels: ["Beginner", "Intermediate", "Advanced"] },
  { group: "Abs", levels: ["Beginner", "Intermediate", "Advanced"] },
  { group: "Legs", levels: ["Beginner", "Intermediate", "Advanced"] },
  { group: "Push", levels: ["Beginner", "Intermediate", "Advanced"] },
  { group: "Pull", levels: ["Beginner", "Intermediate", "Advanced"] },
];

const Workouts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <NotLogedIn />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {workoutData.map(({ group, levels }) => (
        <div key={group} className="space-y-4">
          <h2 className="text-xl font-semibold">{group}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {levels.map((level) => {
              const key = `${group}-${level}`;
              const imagePath = `/Images/${group.toLowerCase()}.jpg`;

              return (
                <Card
                  key={key}
                  onClick={() => navigate(`/exercise/${group}/${level}`)}
                  className="overflow-hidden py-0 rounded-2xl shadow-sm cursor-pointer transition hover:scale-[1.02]"
                >
                  <img
                    src={imagePath}
                    alt={`${group} ${level}`}
                    className="w-full object-cover"
                  />
                  <CardContent className="pb-4">
                    <CardTitle className="text-lg font-medium">
                      {group} - {level}
                    </CardTitle>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Workouts;
