import axios from 'axios';


const API_URL = 'http://98.94.0.68:8081/api/usuarios'; 

class AuthService {
    
    // Iniciar Sesión
    async login(email, password) {
        // Ajusta la ruta '/login' según tenga tu controlador Java
        return axios.post(API_URL + '/login', { email, password })
            .then(response => {
                
                if (response.data) {
                    
                    if (response.data.token) {
                        localStorage.setItem('token', response.data.token);
                    }
                    
                    
                    localStorage.setItem('usuario_zyre', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    // Cerrar Sesión
    logout() {
       
        localStorage.removeItem('token');
        localStorage.removeItem('usuario_zyre');
    }

    // Verificar si hay sesión activa
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('usuario_zyre'));
    }
}

export default new AuthService();