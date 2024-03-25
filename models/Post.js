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
	// Link User to Post
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	// Link Interaction to Post
	interactions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Interaction',
		},
	],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
