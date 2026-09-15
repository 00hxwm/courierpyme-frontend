import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario_zyre');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      
      <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '250px' }}>
        <h4 className="mb-4">Zyre</h4>
        <hr />
        
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <Link to="/admin" className="nav-link active bg-primary text-white">
              Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/ventas" className="nav-link text-white">
              Órdenes
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/productos" className="nav-link text-white">
              Productos
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/categorias" className="nav-link text-white">
              Categorías
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/usuarios" className="nav-link text-white">
              Usuarios
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/perfil" className="nav-link text-white">
              Perfil
            </Link>
          </li>
        </ul>

        <hr />
        
        <div className="mt-auto">
            <Link to="/" className="btn btn-dark w-100 mb-2 border text-start">
                Ir a la Tienda
            </Link>
            <button onClick={handleLogout} className="btn btn-danger w-100 text-start">
                Cerrar Sesión
            </button>
        </div>
      </div>

      <div className="flex-grow-1 bg-light p-4">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">Resumen de las actividades diarias</p>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-white bg-primary mb-3 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="card-title">Compras</h5>
                        <h2 className="fw-bold">602</h2>
                    </div>
                    <span style={{ fontSize: '2rem' }}></span>
                </div>
                <p className="card-text small mt-2">Probabilidad de aumento: 12.3%</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-success mb-3 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="card-title">Productos</h5>
                        <h2 className="fw-bold">6</h2>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-dark bg-warning mb-3 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="card-title">Usuarios</h5>
                        <h2 className="fw-bold">568</h2>
                    </div>
                    <span style={{ fontSize: '2rem' }}></span>
                </div>
                <p className="card-text small mt-2">Nuevos usuarios este mes: 79</p>
              </div>
            </div>
          </div>
        </div>


        <div className="row">
            <div className="col-md-3 mb-4">
                <Link to="/admin" className="text-decoration-none text-dark">
                <div className="card h-100 text-center p-3 shadow-sm border-0">
                    <div className="card-body">
                        <h1 className="text-primary"></h1>
                        <h5>Dashboard</h5>
                        <p className="small text-muted">Visión general de métricas</p>
                    </div>
                </div>
                </Link>
            </div>

            <div className="col-md-3 mb-4">
                <Link to="/admin/ventas" className="text-decoration-none text-dark">
                    <div className="card h-100 text-center p-3 shadow-sm border-0">
                        <div className="card-body">
                            <h1 className="text-primary"></h1>
                            <h5>Órdenes</h5>
                            <p className="small text-muted">Gestión de compras realizadas</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="col-md-3 mb-4">
                <Link to="/admin/productos" className="text-decoration-none text-dark">
                    <div className="card h-100 text-center p-3 shadow-sm border-0 btn-light">
                        <div className="card-body">
                            <h1 className="text-primary"></h1>
                            <h5>Productos</h5>
                            <p className="small text-muted">Administrar productos</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-3 shadow-sm border-0">
                    <div className="card-body">
                        <h1 className="text-primary"></h1>
                        <h5>Categorías</h5>
                        <p className="small text-muted">Organizar tipos de productos</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-3 shadow-sm border-0">
                    <div className="card-body">
                        <h1 className="text-primary"></h1>
                        <h5>Usuarios</h5>
                        <p className="small text-muted">Administrar usuarios</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-4">
                <Link to="/" className="text-decoration-none text-dark">
                    <div className="card h-100 text-center p-3 shadow-sm border-0">
                        <div className="card-body">
                            <h1 className="text-primary"></h1>
                            <h5>Tienda</h5>
                            <p className="small text-muted">Ve tu tienda</p>
                        </div>
                    </div>
                </Link>
            </div>
            
        </div>

      </div>
    </div>
  );
};

export default Dashboard;