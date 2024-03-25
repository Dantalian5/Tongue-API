import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['like', 'comment'],
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	// Link to user that made the interaction
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	// Ref to post interacted
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
	},
});

const Interaction = mongoose.model('Interaction', interactionSchema);

export default Interaction;
