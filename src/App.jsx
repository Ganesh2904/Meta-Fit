import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Home from "./components/Home";
import Workouts from "./components/Workouts";
import Progress from "./components/Progress";
import WorkoutSession from "./components/WorkoutSession";
import NotFound from "./components/NotFound";
import ExerciseDetails from "./components/ExerciseDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
