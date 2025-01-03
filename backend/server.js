import express from 'express'
import config from './config/config.js'
import connectDB from './db/connection.js'
import cors from 'cors'


connectDB();

const port=config.port
const app = express()

app.use(express.json())
app.use(cors())




app.get("/",(req,res)=>{
    res.send("Server is ready");
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})