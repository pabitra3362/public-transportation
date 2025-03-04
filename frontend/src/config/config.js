const config={
    googleClientId: String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    googleClientSecret: String(import.meta.env.VITE_GOOGLE_CLIENT_SECRET),
    googleMapApiKey: String(import.meta.env.VITE_GOOGLE_MAP_API_KEY),
    baseUrl: String(import.meta.env.VITE_BASE_URL),
    hereApiKey: String(import.meta.env.VITE_HERE_API_KEY),
    stripeKey: String(import.meta.env.VITE_STRIPE_KEY)
}

export default config;