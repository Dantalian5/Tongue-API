import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	insertionDate: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	// Link User to Post
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	// Link Interaction to Post
	interactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Interaction',
		},
	],
});
// Middleware: Automatically update 'updatedAt' field
postSchema.pre('findOneAndUpdate', function (next) {
	this.set({updatedAt: new Date()});
	next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
