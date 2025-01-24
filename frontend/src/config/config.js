const config={
    googleClientId: String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    googleClientSecret: String(import.meta.env.VITE_GOOGLE_CLIENT_SECRET),
    firebase_api_key: String(import.meta.env.VITE_FIREBASE_API_KEY),
    firebase_auth_domain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    firebase_project_id: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    firebase_storage_bucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    firebase_messagingSenderId: Number(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    firebase_app_id: String(import.meta.env.VITE_FIREBASE_APP_ID),
    firebase_measurement_id: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
}

export default config;