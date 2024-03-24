import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import 'dotenv/config';
// import routes
import userRoutes from './routes/userRoutes.js';
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
app.use('/api', userRoutes);
// set port
const PORT = process.env.PORT || 3000;

// initialize server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
