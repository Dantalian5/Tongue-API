import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['like', 'comment'],
		required: true,
	},
	content: {
		type: String,
	},
	insertionDate: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	// Link to user that made the interaction
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	// Ref to post interacted
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	},
});
// Middleware: Automatically update 'updatedAt' field
interactionSchema.pre('findOneAndUpdate', function (next) {
	this.set({updatedAt: new Date()});
	next();
});

const Interaction = mongoose.model('Interaction', interactionSchema);

export default Interaction;
