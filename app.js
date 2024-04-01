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
// import swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
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

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'TheCodebuzz API',
			version: '1.0.0',
			description: 'Thecodebuzz test service to demo how to document your API',
			license: {
				name: 'MIT',
				url: 'https://www.thecodebuzz.com',
			},
			contact: {
				name: 'TheCodeBuzz',
				url: 'https://www.thecodebuzz.com',
				email: 'info@thecodebuzz.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:3000/',
			},
		],
	},
	apis: ['./api-method.js'],
};

const specs = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve);
app.get(
	'/docs',
	swaggerUi.setup(specs, {
		explorer: true,
	})
);

// initialize server
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
// export app for further vercel deployment
export default app;
