import Interaction from '../models/Interaction.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

const InteractionController = {
	// Create interaction
	createInteraction: async (req, res) => {
		try {
			const {type, content, user, post} = req.body;
			// Validate if user and post exist
			const [userExists, postExists] = await Promise.all([
				User.findById(user),
				Post.findById(post),
			]);
			// Throw error if user or post not found
			if (!userExists || !postExists) {
				return res.status(404).json({message: 'User or Post not found'});
			}
			// Create new interaction
			const interactionData = {
				type,
				user: user,
				post: post,
			};
			if (content) {
				interactionData.content = content;
			}
			const newInteraction = new Interaction(interactionData);
			const savedInteraction = await newInteraction.save();
			// Update post interactions
			await Post.findByIdAndUpdate(post, {
				$push: {interactions: savedInteraction._id},
			});

			res.status(201).json(savedInteraction);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},
	// Get all Interactions
	getAllInteractions: async (req, res) => {
		try {
			const interactions = await Interaction.find().populate('user');
			res.status(200).json(interactions);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
	// Search Interactions
	searchAllinteractions: async (req, res) => {
		try {
			// Use date format ISO 8601 : YYYY-MM-DD, e.g. 2020-01-01 or 2020-01-01T00:00:00.000Z
			const interactionQuery = {};
			const userQuery = {};
			const {istartDate, iendDate, userId, userName, userCity} = req.query;
			if (userCity || userId || userName) {
				userCity && (userQuery.city = new RegExp(userCity, 'i'));
				userId && (userQuery._id = new RegExp(userId, 'i'));
				userName && (userQuery.nickname = new RegExp(userName, 'i'));
			}
			if (istartDate || iendDate) {
				interactionQuery.insertionDate = {};
				istartDate &&
					(interactionQuery.insertionDate.$gte = new Date(istartDate));
				iendDate && (interactionQuery.insertionDate.$lte = new Date(iendDate));
			}
			const interactions = await Interaction.find(interactionQuery).populate({
				path: 'user',
				match: userQuery,
			});
			const filteredInteractions = interactions.filter(
				interaction => interaction.user !== null
			);
			res.status(200).json(filteredInteractions);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
	// Get interaction by ID
	getInteractionById: async (req, res) => {
		try {
			const interaction = await Interaction.findById(req.params.id).populate(
				'user'
			);
			if (!interaction) {
				return res.status(404).json({message: 'Interaction not found'});
			}
			res.status(200).json(interaction);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},

	// Update interaction
	updateInteraction: async (req, res) => {
		try {
			const interaction = await Interaction.findByIdAndUpdate(
				req.params.id,
				req.body,
				{new: true}
			);
			if (!interaction) {
				return res.status(404).json({message: 'Interaction not found'});
			}
			res.status(200).json(interaction);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},

	// Delete interaction
	deleteInteraction: async (req, res) => {
		try {
			const deletedInteraction = await Interaction.findByIdAndDelete(
				req.params.id
			);
			if (!deletedInteraction) {
				return res.status(404).json({message: 'Interaction not found'});
			}

			// Delete reference in post
			await Post.findByIdAndUpdate(deletedInteraction.post, {
				$pull: {interactions: deletedInteraction._id},
			});

			res.status(200).json(deletedInteraction);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
};

export default InteractionController;
