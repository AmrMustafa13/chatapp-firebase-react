import React, { useContext } from "react";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Navbar from "./components/Navbar/Navbar";
import { auth } from "./config/firebase";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "./context/auth";

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      {user ? <Chat /> : <GoogleButton onClick={() => googleSignIn()} />}
    </div>
  );
};

export default App;
