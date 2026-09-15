import axios from 'axios';

// 1. Crear una instancia de Axios apuntando a tu Java
const api = axios.create({
   
    baseURL: 'http://98.94.0.68:8081/api' 
});

// 2. Configurar el Interceptor

api.interceptors.request.use(
    (config) => {
        // Buscar el token en el almacenamiento local
       
        const token = localStorage.getItem('token');
        
        // Si existe, agregarlo al encabezado Authorization
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;