import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Blog from "./Components/Blog";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;

