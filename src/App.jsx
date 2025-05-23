import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// Pages stored in ./components
import Home from "./components/Home";
import Workouts from "./components/Workouts";
import Progress from "./components/Progress";
import WorkoutSession from "./components/WorkoutSession";
import NotFound from "./components/NotFound";
import ExerciseDetails from "./components/ExerciseDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/exercise/:group/:level" element={<ExerciseDetails />} />
        <Route
          path="/workout-session/:group/:level"
          element={<WorkoutSession />}
        />
        <Route path="/progress" element={<Progress />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
