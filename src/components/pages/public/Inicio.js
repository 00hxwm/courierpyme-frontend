import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return(
    <>
    <img 
            src="/images/Zyre.png" 
            alt="Banner Zyre" 
            className="img-fluid w-100 shadow-lg"
            style={{objectFit: 'cover', maxHeight: '650px'}}
        />
    <div className='container my-5'>
        
        <div className="text-center mb-3">
            <h1 className="display-3 fw-bold mb-2">
                Bienvenido a Zyre
            </h1>

            <div>
                <Link to="/menu" className="btn btn-danger btn-lg px-5 py-3 fw-bold shadow">
                    Pide ahora
                </Link>
            </div>
        </div>

        <div className="row mt-5 g-4">
            
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4 bg-light">
                    <div className="display-4 mb-3"></div>
                    <h4 className="card-title">Puntos Zyre</h4>
                    <p className="card-text text-muted">
                        Gana <strong>1 punto</strong> por cada $1.000 pesos gastados.
                    </p>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4 bg-light">
                    <div className="display-4 mb-3"></div>
                    <h4 className="card-title">Envios</h4>
                    <p className="card-text text-muted">
                        Ten un 5% de descuento al pedir por la web.
                    </p>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4 bg-light">
                    <div className="display-4 mb-3"></div>
                    <h4 className="card-title">Canjear</h4>
                    <p className="card-text text-muted">
                        Canjea productos con tus puntos Zyre.
                    </p>
                </div>
            </div>

        </div>
    </div>
    </>
  );
}

export default Inicio;