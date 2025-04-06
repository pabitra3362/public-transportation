import express from 'express';
import config from './config/config.js';
import connectDB from './db/connection.js';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.route.js';
import captainRoutes from './routes/captain.route.js';
import adminRoutes from './routes/admin.route.js';
import mapRoutes from './routes/map.route.js';
import rideRoutes from './routes/ride.route.js';
import paymentRoutes from './routes/payment.route.js';
import complaintRoutes from './routes/complaint.route.js';
import reviewRoutes from './routes/review.route.js';
import cookieParser from 'cookie-parser';
import { initializeSocket } from './socket.js';
import http from 'http';


connectDB();

const port = config.port
const app = express()

const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


initializeSocket(server);



app.get("/", (req, res) => {
    res.send("Server is ready");
})


// all routes
app.use('/api/user',userRoutes);
app.use('/api/captain',captainRoutes);
app.use('/api/admin',adminRoutes);
app.use('/maps',mapRoutes);
app.use('/ride',rideRoutes);
app.use("/api/payment",paymentRoutes);
app.use('/api/complaint',complaintRoutes);
app.use('/api/review',reviewRoutes);



server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
