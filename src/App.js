import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import "./App.css";
import Footer from "./Footer";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" component={Calendar} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
