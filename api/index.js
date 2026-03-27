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
import serverless from 'serverless-http';

config();

const app = express();
app.use(cors());
app.use(json());

//? Routes
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


//? test firebase connection 
async function testFirebaseConnection() {
    try {
        const snapshot = await db.collection('test').limit(1).get();
        if (snapshot) {
            console.log('Firebase is connected successfully');
        }
    } catch (error) {
        console.error('Firebase connection failed:', error.message);
    }
}

testFirebaseConnection();

// Local: start HTTP server. Vercel/Render: use serverless handler.
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
if (!isServerless) {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Mensa API running at http://localhost:${PORT}`));
}

export default serverless(app);
