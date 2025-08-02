import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardAction, CardFooter } from "./ui/card";

function NotLogedIn() {
  return (
    <Card className="max-w-[400px] mx-auto min-mx-4 mt-16 bg-gradient-to-br from-card to-background">
      <CardHeader>
        <h2 className="text-2xl font-serif font-semibold mb-2 text-center">
          Please log in to continue
        </h2>
        <p className="text-muted-foreground text-sm mb-4 text-center">
          You need to be logged in to access this feature.
        </p>
      </CardHeader>
      <CardFooter>
        <CardAction className="flex gap-4 mx-auto">
          <Button variant="outline" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}

export default NotLogedIn;
