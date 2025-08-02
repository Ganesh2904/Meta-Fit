import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Personalized Workouts",
    description:
      "Get daily training plans tailored to your goals and fitness level.",
    link: "/workouts",
  },
  {
    title: "Track Your Progress",
    description:
      "Log workouts, monitor water intake, sleep, and more in one place.",
    link: "/progress",
  },
];

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-8xl bg-linear-to-br md:bg-linear-to-b from-muted via-foreground to-muted md:from-foreground bg-clip-text text-transparent font-serif ">
          Welcome to MetaFit
        </h1>
        <p className="text-lg px-4 text-muted-foreground">
          Your personalized fitness journey. Track workouts, progress, and
          achieve your goals.
        </p>
        <Link to="/workouts">
          <Button>Get Started</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="flex justify-center items-center mt-14">
        <div className="grid md:grid-cols-2 gap-6 justify-center">
          {features.map((item) => (
            <Card className="relative overflow-hidden bg-gradient-to-br from-card/20 to-card" key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to={item.link}>Explore</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MetaFit. All rights reserved.
      </footer>
    </main>
  );
};

export default Home;
