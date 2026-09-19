export const msalConfig = {
    auth: {
        clientId: "e2b91943-82bc-4369-a4c5-151aa20c8f6c", // ID de la aplicación en Entra ID
        authority: "https://login.microsoftonline.com/06c17780-fea1-442b-9f82-9c3e5224d664", // Tu Tenant ID
        redirectUri: "http://localhost:3000", // O el puerto donde corra tu React
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

// Scopes necesarios para leer el perfil del usuario y generar el token
export const loginRequest = {
    scopes: ["User.Read"]
};