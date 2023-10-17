import { useState } from "react";
import "./App.css";
import { ContextStore } from "./Context/StoreContext";
import { Login, Tasks } from "./components";
import { Route, Routes } from "react-router-dom";

function App() {
  const [activePage, setActivePage] = useState(1);
  const [currentTasks, setCurrentTasks] = useState([]);

  return (
    <ContextStore.Provider
      value={{ activePage, setActivePage, currentTasks, setCurrentTasks }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </ContextStore.Provider>
  );
}

export default App;
