import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/routes.js';  // Import all routes


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middlewares
if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
}

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
