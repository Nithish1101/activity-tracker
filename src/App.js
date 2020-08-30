import React from "react";
import Header from "./components/header/Header";
import ActivityTracker from "./components/activity-tracker/ActivityTracker";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <ActivityTracker />
    </div>
  );
}

export default App;
