import mongoose from 'mongoose';
import dotenv from 'dotenv/config';

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log('MongoDB Database connected...');
	} catch (error) {
		console.error('Connection to MongoDB Database failed:', error.message);
		// process.exit(1);
	}
};

export default connectDB;
