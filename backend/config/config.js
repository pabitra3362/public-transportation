import 'dotenv/config';

export default{
    mongodb_uri: String(process.env.MONGODB_URI),
    port: Number(process.env.PORT) || 3000,
    jwtSecret: String(process.env.JWT_SECRET),
    clientID: String(process.env.GOOGLE_CLIENT_ID),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
    gmail_refesh_token: String(process.env.AUTH2_REFRESH_TOKEN)
}