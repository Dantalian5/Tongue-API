import Interaction from '../models/Interaction.js';
import Post from '../models/Post.js';

const InteractionController = {
	// Crear una interacción
	createInteraction: async (req, res) => {
		try {
			const {type, userId, postId} = req.body;
			const newInteraction = new Interaction({
				type,
				user: userId,
				post: postId,
			});
			const savedInteraction = await newInteraction.save();

			// Añadir la interacción al post correspondiente
			await Post.findByIdAndUpdate(postId, {
				$push: {interactions: savedInteraction._id},
			});

			res.status(201).json(savedInteraction);
		} catch (error) {
			res.status(400).json({message: error.message});
		}
	},

	// Obtener una interacción por ID
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

	// Actualizar una interacción
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

	// Eliminar una interacción
	deleteInteraction: async (req, res) => {
		try {
			const interaction = await Interaction.findByIdAndRemove(req.params.id);
			if (!interaction) {
				return res.status(404).json({message: 'Interaction not found'});
			}

			// Eliminar la referencia de esta interacción en el post correspondiente
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
