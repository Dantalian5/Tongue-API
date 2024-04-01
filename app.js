import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import 'dotenv/config';
// import routes
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import interactionRoutes from './routes/interactionRoutes.js';
// import mongoDB
import connectDB from './config/database.js';

// create express app
const app = express();
// connect to mongoDB
connectDB();

// initialize middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// initialize routes
app.get('/', (req, res) => res.send('Express on Vercel'));
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', interactionRoutes);
// set port
const PORT = process.env.PORT || 3000;

// initialize server
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
module.exports = app;
