import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import Search from "./pages/Search/Search";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useLoader } from "./components/Loader/LoaderContext";
import Loader from "./components/Loader/Loader";
import { useLocation, useNavigationType } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();

  const { loading, setLoading } = useLoader();
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in");
        navigate("/");
      } else {
        console.log("No user is signed in");
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 99900);
    return () => clearTimeout(timeout);
  }, [location, navigationType, setLoading]);

  return (
    <div>
      {loading && <Loader />}
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
};

export default App;
