import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className=" text-white text-center p-8">
      <img
        src={user.picture}
        alt={user.name}
        className="w-16 h-16 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold">Name: {user.name}</h2>
      <p className="text-lg">Email: {user.email}</p>
    </div>
    
    )
  );
};

export default Profile;