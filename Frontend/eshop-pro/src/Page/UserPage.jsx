import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const UserPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user ? (
        <h1 className="text-3xl font-bold">Welcome, {user.displayName || user.email}!</h1>
      ) : (
        <h1 className="text-3xl font-bold">Welcome, Guest!</h1>
      )}
    </div>
  );
};

export default UserPage;
