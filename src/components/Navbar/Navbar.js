import React, { useContext } from "react";
import "./Navbar.scss";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/auth";

const googleLogout = () => {
  signOut(auth);
};

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <h1>Instant Connect</h1>
      </div>
      <div className="navbar-links">
        {user && <button onClick={() => googleLogout()}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
