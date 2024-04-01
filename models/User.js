import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	nickname: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
});
const User = mongoose.model('User', userSchema);
export default User;
