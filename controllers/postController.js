import Post from '../models/Post.js';

const PostController = {
	createPost: async (req, res) => {
		try {
			const post = new Post({
				title: req.body.title,
				content: req.body.content,
				user: req.body.user,
			});
			const savedPost = await post.save();
			res.status(201).json(savedPost);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},

	getAllPosts: async (req, res) => {
		try {
			const posts = await Post.find().populate('user');
			res.status(200).json(posts);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},

	getPostById: async (req, res) => {
		try {
			const post = await Post.findById(req.params.id).populate('user');
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({message: 'Post not found'});
			}
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},

	updatePost: async (req, res) => {
		try {
			const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
			res.status(200).json(post);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},

	deletePost: async (req, res) => {
		try {
			const deletedPost = await Post.findByIdAndDelete(req.params.id);
			if (!deletedPost)
				return res.status(404).json({message: 'Post not found'});
			res.status(200).json(deletedPost);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
};

export default PostController;
