import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="text-teal-200 focus:text-white focus:rounded-full focus:bg-pink-500 hover:bg-pink-500 hover:text-white text-s font-semibold px-6 rounded-full transition duration-300 ease-in-out hover:drop-shadow-lg"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;