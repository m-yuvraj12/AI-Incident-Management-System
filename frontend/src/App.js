import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard component
import IncidentList from "./components/IncidentList"; // Import the Incidents component
import CreateIncidentPage from "./pages/CreateIncidentPage"; // Import the CreateIncident component
import IncidentDetail from "./components/IncidentDetail";

function App() {
  return (
    <div>
       {/* Sidebar will be present on all pages */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<IncidentList />} />
        <Route path="/create" element={<CreateIncidentPage />} />
        <Route path="/incidents/:id" element={<IncidentDetail/>} /> {/* New Route */}

      </Routes>
    </div>
  );
}

export default App;
