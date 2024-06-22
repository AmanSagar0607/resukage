import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 px-8 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" width={25} height={25} />
        <span className="text-2xl ml-[-3px] font-bold">ResuKage.</span>
      </div>

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Link to="/auth/sign-in">
            <Button>Get Started</Button>
          </Link>
          <Link to="/auth/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
