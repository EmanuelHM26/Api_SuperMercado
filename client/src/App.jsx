import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Inicio from './pages/Inicio.jsx';
import Clientes from './pages/Clientes.jsx';
import Productos from './pages/Productos.jsx';
import Proveedores from './pages/Proveedores.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/proveedores" element={<Proveedores />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;