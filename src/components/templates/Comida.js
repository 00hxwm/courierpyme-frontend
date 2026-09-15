import React from "react";

function Comida({title, children}){ 
    return(
        <div className='container mt-5'>
            <h2 className="mb-4 text-center">
            </h2>
            <div className="row">
                {children}
            </div>
        </div>
    ); 
}

export default Comida;