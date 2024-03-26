import Interaction from '../models/Interaction.js';
import Post from '../models/Post.js';

const InteractionController = {
	// Create interaction
	createInteraction: async (req, res) => {
		try {
			const {type, userId, postId, content} = req.body;
			const interactionData = {
				type,
				user: userId,
				post: postId,
			};
			if (content) {
				interactionData.content = content;
			}

			const newInteraction = new Interaction(interactionData);
			const savedInteraction = await newInteraction.save();

			// Add interaction id to corresponding post
			await Post.findByIdAndUpdate(postId, {
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
			const interactions = await Interaction.find();
			res.status(200).json(interactions);
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
	// Get interaction by ID
	getInteractionById: async (req, res) => {
		try {
			const interaction = await Interaction.findById(req.params.id);
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
			const interaction = await Interaction.findByIdAndRemove(req.params.id);
			if (!interaction) {
				return res.status(404).json({message: 'Interaction not found'});
			}

			// Delete reference in post
			await Post.findByIdAndUpdate(interaction.post, {
				$pull: {interactions: interaction._id},
			});

			res.status(204).send();
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	},
};

export default InteractionController;
