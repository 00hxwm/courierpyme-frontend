import React from 'react';

const Nosotros = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <h1 className="fw-bold text-primary mb-3">Sobre CourierPyme</h1>
          <p className="lead text-muted">
            Somos la solución logística de confianza para pequeñas y medianas empresas.
          </p>
          <p>
            Nacimos con la misión de democratizar los envíos rápidos, seguros y con 
            trazabilidad en tiempo real. Con nuestra tecnología impulsada por la nube, 
            garantizamos que tus paquetes lleguen a su destino mientras tú te enfocas 
            en hacer crecer tu negocio.
          </p>
        </div>
        <div className="col-lg-6">
          {/* Aquí puedes poner una imagen de camiones o logística */}
          <div className="bg-light rounded p-5 text-center shadow-sm border">
            <h3 className="text-secondary">Innovación en Logística</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;