import React from "react";
import { useAuth } from "../hook/useAuth";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <nav className="mb-6 flex items-center justify-between rounded-b-lg bg-black/80 px-6 py-4 shadow">
      <span className="text-xl font-bold text-white">Challenge</span>
      <Button onClick={logout} variant={"outline"} className="cursor-pointer">
        Logout
      </Button>
    </nav>
  );
};

export default Navbar;