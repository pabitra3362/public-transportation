const config={
    googleClientId: String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    googleClientSecret: String(import.meta.env.VITE_GOOGLE_CLIENT_SECRET),
    auth0Domain: String(import.meta.env.VITE_AUTH0_DOMAIN),
    auth0ClientId: String(import.meta.env.VITE_AUTH0_CLIENT_ID),
}

export default config;