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
// import swagger
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

// initialice app for vercel test on deployment
app.get('/', (req, res) => res.send('Express on Vercel'));
// initialize routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', interactionRoutes);
// set port for local deployment
const PORT = process.env.PORT || 3000;
// set helmet to allow redocly cdn to load
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			'script-src': ["'self'", 'https://cdn.redoc.ly'],
			'worker-src': ["'self'", 'blob:'],
			'img-src': ["'self'", 'data:', 'https://cdn.redoc.ly'],
		},
	})
);
// serve redoc json to used on documentation
app.get('/docs/swagger.json', (req, res) => {
	res.sendFile('swagger.json', {root: './docs'});
});
// serve redoc html
app.get('/docs', (req, res) => {
	res.sendFile('index.html', {root: './docs'});
});
// initialize server
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
// export app for further vercel deployment
export default app;
