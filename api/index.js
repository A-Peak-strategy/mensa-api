import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { db } from '../config/firebase.js';
import authRoutes from '../routes/auth.routes.js';
import userRoutes from '../routes/user.routes.js';
import productRoutes from '../routes/product.routes.js';
import orderRoutes from '../routes/order.routes.js';
import foodRoutes from "../routes/food.routes.js";
import categoryRoutes from "../routes/category.routes.js";
import eventRoutes from "../routes/event.routes.js";
import galleryRoutes from "../routes/gallery.routes.js";
import quoteRoutes from "../routes/quote.routes.js";
import contactRoutes from "../routes/contact.routes.js";

config();

const app = express();
app.use(cors());
app.use(json());

// Health checks
app.get('/health', async (req, res) => {
    try {
        await db.collection('test').limit(1).get();

        res.status(200).json({
            status: 'OK',
            services: {
                server: 'running',
                firebase: 'connected'
            },
            uptime: process.uptime(),
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            services: {
                server: 'running',
                firebase: 'disconnected'
            },
            error: error.message,
            timestamp: new Date()
        });
    }
});

app.get('/health/live', (req, res) => {
    res.status(200).json({ status: 'alive' });
});

app.get('/health/ready', async (req, res) => {
    try {
        await db.collection('test').limit(1).get();

        res.status(200).json({
            status: 'ready',
            firebase: 'connected'
        });
    } catch (error) {
        res.status(500).json({
            status: 'not_ready',
            firebase: 'disconnected',
            error: error.message
        });
    }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contacts', contactRoutes);

// Test Firebase connection on startup
async function testFirebaseConnection() {
    try {
        await db.collection('test').limit(1).get();
        console.log('Firebase is connected successfully');
    } catch (error) {
        console.error('Firebase connection failed:', error.message);
    }
}

testFirebaseConnection();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Mensa API running at http://localhost:${PORT}`);
});