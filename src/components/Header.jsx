import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Workouts", href: "/workouts" },
  { name: "Progress", href: "/progress" },
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      await logout();
      navigate("/login");
    }
  };

  return (
    <header className="border-b border-foreground/10 sticky top-0 z-50 bg-background/40 backdrop-blur-xs">
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" className="text-xl font-bold flex items-center gap-1">
          {/* <img src="/META FIT logo.png" className="w-8" /> */}
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA60lEQVR4nO2ZUQ7DIAxDc7yx+58ADuIJrZMmGIOkDIXO76vqh8FOQFErQgghhGwAgDuAhJr8LnjXr2gs9iKKc/0KdBDn+tcxhKKXvRmC9myVvezY0NjZQoFzQ6AhYYVssOUO1ElpE7Qyqg/tujTkrUJoT7lfhVYj/X08J4fOlLuToUw0l3o1Mtqas4Q8GUozhDy1XMgPJ4V+jvT3kT3cuten9lq1YjUkWmEaMsIKHaiT0ibICikDgzZIVmg0KWWQMyuURoR2+owV3icHx4bix8lg9oJe9f/CULra75TQmMrP9fIifUIIIYQQkQfzXuPUlSYH8gAAAABJRU5ErkJggg=="
            alt="dumbbell"
            className="h-6 -rotate-[30deg] hidden dark:block"
          ></img>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA60lEQVR4nO2ZUQ7DIAxDc7yx+58ADuIJrZMmGIOkDIXO76vqh8FOQFErQgghhGwAgDuAhJr8LnjXr2gs9iKKc/0KdBDn+tcxhKKXvRmC9myVvezY0NjZQoFzQ6AhYYVssOUO1ElpE7Qyqg/tujTkrUJoT7lfhVYj/X08J4fOlLuToUw0l3o1Mtqas4Q8GUozhDy1XMgPJ4V+jvT3kT3cuten9lq1YjUkWmEaMsIKHaiT0ibICikDgzZIVmg0KWWQMyuURoR2+owV3icHx4bix8lg9oJe9f/CULra75TQmMrP9fIifUIIIYQQkQfzXuPUlSYH8gAAAABJRU5ErkJggg=="
            alt="dumbbell"
            className="h-6 -rotate-[30deg] filter invert dark:hidden"
          />
          MetaFit
        </Link>

        <div className="flex gap-4 md:gap-6">
          <div className="md:hidden">
            <ModeToggle />
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium hover:underline"
              >
                {item.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Button asChild variant="secondary">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="default">
                  <Link to="/signup">Signup</Link>
                </Button>
              </>
            ) : (
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[250px] p-6"
                aria-label="Navigation drawer"
              >
                <SheetHeader className="hidden">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through the app using the options below
                  </SheetDescription>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-4 mt-6"
                  role="navigation"
                  aria-label="Main"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-base font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {!user ? (
                    <>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link to="/signup">Signup</Link>
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden  md:block">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
