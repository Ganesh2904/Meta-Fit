import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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
    <header className="w-full border-b">
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" className="text-xl font-bold flex gap-1">
          <img src="/META FIT logo.png" className="w-8" />
          MetaFit
        </Link>

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
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] p-6">
              <nav className="flex flex-col gap-4 mt-6">
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
      </div>
    </header>
  );
};

export default Header;
