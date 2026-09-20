import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BarraNavegacion from "./components/organisms/BarraNavegacion";
import Inicio from "./components/pages/public/Inicio";
import Nosotros from "./components/pages/public/Nosotros";
import Dashboard from "./components/pages/authenticated/Dashboard";
import Shipments from "./components/pages/authenticated/Shipments";
import PlantillaProtegida from "./components/templates/PlantillaProtegida";
import Catalog from "./components/pages/authenticated/Catalog";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<><BarraNavegacion /><main className="container my-4"><Inicio /></main></>} />
        <Route path="/nosotros" element={<><BarraNavegacion /><main className="container my-4"><Nosotros /></main></>} />

        
        <Route element={<PlantillaProtegida />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/catalog" element={<Catalog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;