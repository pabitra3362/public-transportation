import 'dotenv/config';

export default{
    mongodb_uri: String(process.env.MONGODB_URI),
    port: Number(process.env.PORT),
    jwtSecret: String(process.env.JWT_SECRET),
}