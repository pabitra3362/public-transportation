const config={
    googleClientId: String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    googleClientSecret: String(import.meta.env.VITE_GOOGLE_CLIENT_SECRET),
    baseUrl: String(import.meta.env.VITE_BASE_URL),
    hereApiKey: String(import.meta.env.VITE_HERE_API_KEY)
}

export default config;