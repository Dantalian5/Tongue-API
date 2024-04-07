import Post from '../models/Post.js';
import User from '../models/User.js';

const PostController = {
	createPost: async (req, res) => {
		try {
			const {title, content, user} = req.body;
			// Validate if user exist
			const userExists = await User.findById(user);
			// Throw error if user not found
			if (!userExists) {
				return res.status(404).json({message: 'User id not found'});
			}
			// Create new post
			const post = new Post({
				title: title,
				content: content,
				user: user,
			});
			const savedPost = await post.save();
			res.status(201).json(savedPost);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},

	getAllPosts: async (req, res) => {
		try {
			const {minify} = req.query;
			let posts;
			if (minify && minify === 'true') {
				posts = await Post.find();
			} else {
				posts = await Post.find()
					.populate('user')
					.populate({
						path: 'interactions',
						populate: {
							path: 'user',
							model: 'User',
						},
					});
			}

			res.status(200).json(posts);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
	searchAllPosts: async (req, res) => {
		try {
			// Use date format ISO 8601 : YYYY-MM-DD, e.g. 2020-01-01 or 2020-01-01T00:00:00.000Z
			const postQuery = {};
			const interactionQuery = {};
			const userQuery = {};
			const {pstartDate, pendDate, userCity, istartDate, iendDate} = req.query;

			if (pstartDate || pendDate) {
				postQuery.insertionDate = {};
				pstartDate && (postQuery.insertionDate.$gte = new Date(pstartDate));
				pendDate && (postQuery.insertionDate.$lte = new Date(pendDate));
			}

			if (userCity) {
				userQuery.city = new RegExp(userCity, 'i');
			}
			if (istartDate || iendDate) {
				interactionQuery.insertionDate = {};
				istartDate &&
					(interactionQuery.insertionDate.$gte = new Date(istartDate));
				iendDate && (interactionQuery.insertionDate.$lte = new Date(iendDate));
			}
			const posts = await Post.find(postQuery)
				.populate('user')
				.populate({
					path: 'interactions',
					match: interactionQuery,
					populate: {
						path: 'user',
						model: 'User',
						match: userQuery,
					},
				});
			const filteredPosts = posts.map(post => {
				post.interactions = post.interactions.filter(
					interaction => interaction.user !== null
				);
				return post;
			});
			res.status(200).json(filteredPosts);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
	getPostById: async (req, res) => {
		try {
			const {minify} = req.query;
			let post;
			if (minify && minify === 'true') {
				post = await Post.findById(req.params.id);
			} else {
				post = await Post.findById(req.params.id)
					.populate('user')
					.populate({
						path: 'interactions',
						populate: {
							path: 'user',
							model: 'User',
						},
					});
			}
			if (!post) {
				return res.status(404).json({message: 'Post not found'});
			}
			res.status(200).json(post);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},

	updatePost: async (req, res) => {
		try {
			const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
			if (!post) {
				return res.status(404).json({message: 'post not found'});
			}
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
			res.status(400).json({message: error.message});
		}
	},
};

export default PostController;
