import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const BarraNavegacion = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_zyre');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('usuario_zyre');
    setUsuario(null);
    navigate('/Inicio');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
      <div className="container">
        
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/images/logo.jpg" 
            alt="Logo Zyre" 
            height="50" 
            className="d-inline-block align-text-top me-2" 
          />
          <span className="fw-bold text-primary">Zyre</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/menu">Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">Admin</NavLink>
            </li>
            
            <li className="nav-item ms-3">
              <Link className="btn btn-warning position-relative" to="/carrito">
                Carrito
              </Link>
            </li>
             
            {usuario ? (
                <>
                    <li className="nav-item ms-2">
                        <span className="nav-link fw-bold text-primary">
                            {usuario.nombre}
                        </span>
                    </li>
                    <li className="nav-item ms-2">
                        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className="nav-item ms-2">
                        <NavLink className="btn btn-outline-primary" to="/login">
                            Ingresar
                        </NavLink>
                    </li>
                    <li className="nav-item ms-2">
                        <NavLink className="btn btn-primary" to="/registro">
                            Crear Cuenta
                        </NavLink>
                    </li>
                </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;