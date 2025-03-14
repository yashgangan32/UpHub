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
app.use(cors({
    origin: 'https://up-hub-front.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

// Explicit OPTIONS handler as a backup
app.options('*', cors({
    origin: 'https://up-hub-front.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));
// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
