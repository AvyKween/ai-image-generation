import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import dbConnection from './db/database';

dotenv.config();

import postRoutes from './routes/post';
import dalleRoutes from './routes/dalle';

// Server
const app = express();

// Database
dbConnection();

// Middlewares
app.use( cors() );
app.use( express.json({ limit: '50mb' }) );
app.use( express.static('public') );

// Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


// Listen
app.listen(process.env.PORT || 8000, () => {
    console.log( `Server running on port: ${process.env.PORT || 8000}` );
})

