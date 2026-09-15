import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Agregué Navigate por si acaso
import Inicio from './components/pages/public/Inicio.js';
import Menu from './components/pages/public/productos/Menu.js';
import Carrito from './components/pages/public/Carrito.js';
import ProductAdmin from './components/pages/admin/ProductAdmin.js';
import Checkout from './components/pages/public/Checkout';
import RegistrationPage from './components/pages/public/RegistrationPage.js';
import Exito from './components/pages/public/Exito';
import BarraNavegacion from './components/organisms/BarraNavegacion.js'; 
import Nosotros from './components/pages/public/Nosotros.js';
import { CarritoProvider } from './context/CarritoC.js';
import Login from './components/pages/public/Login';
import Dashboard from './components/pages/admin/Dashboard';
import VentasAdmin from './components/pages/admin/VentasAdmin';


function App() {

  const usuarioLogueado = JSON.parse(localStorage.getItem('usuario_zyre'));

  return (
    <>
      <CarritoProvider>
        <BrowserRouter>
          <BarraNavegacion /> 
      
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/carrito" element={<Carrito />} />


            <Route path="/admin" element={
              usuarioLogueado && usuarioLogueado.email === 'admin@gmail.com' 
              ? <Dashboard /> : <Login />
            } />
            
            <Route path="/admin/productos" element={
              usuarioLogueado && usuarioLogueado.email === 'admin@gmail.com' 
              ? <ProductAdmin /> :  <Login />
            } />

            <Route 
              path="/admin/ventas" 
              element={
                usuarioLogueado && usuarioLogueado.email === "admin@gmail.com" 
                  ? <VentasAdmin /> 
                  : <Login />
              } 
            />


            <Route path="/checkout" element={<Checkout />} />
            <Route path="/registro" element={<RegistrationPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/exito" element={<Exito />} />
        
          </Routes>

          <footer className='bg-black text-white py-4 mt-5'>
            <div className='container text-center'>
              <p className="mb-1">Zyre. Todos los derechos reservados.</p>
              <p className="mb-3">zyresupport@bussines.com</p>
          
              <ul className="list-unstyled d-flex justify-content-center gap-3 mb-0">
                <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-white">Facebook</a></li>
                <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-white">Instagram</a></li>
                <li><a href="https://x.com" target="_blank" rel="noreferrer" className="text-white">X</a></li>
              </ul>
            </div>
          </footer>
        </BrowserRouter>
      </CarritoProvider>
    </>
  );
}

export default App;