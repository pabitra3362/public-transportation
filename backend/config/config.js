import 'dotenv/config';

export default{
    mongodb_uri: String(process.env.MONGODB_URI),
    port: Number(process.env.PORT) || 3000,
    jwtSecret: String(process.env.JWT_SECRET),
    clientID: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    mapApiKey: String(process.env.GOOGLE_MAPS_API),
    nodemailerAuthUser: String(process.env.NODEMAILER_AUTH_USER),
    nodemailerAuthPass: String(process.env.NODEMAILER_AUTH_PASS),
    email_verify_api: String(process.env.EMAIL_VERIFY_API),
    cloudName: String(process.env.CLOUD_NAME),
    cloudAPIKey: Number(process.env.CLOUD_API_KEY),
    cloudSecret: String(process.env.CLOUD_SECRET),
    stripeSecret: String(process.env.STRIPE_SECRET),
}