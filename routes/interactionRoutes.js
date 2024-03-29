import express from 'express';
import InteractionController from '../controllers/interactionController.js';

const router = express.Router();

router.post('/interactions', InteractionController.createInteraction);
router.get('/interactions', InteractionController.getAllInteractions);
router.get('/interactions/search', InteractionController.searchAllinteractions);
router.get('/interactions/:id', InteractionController.getInteractionById);
router.put('/interactions/:id', InteractionController.updateInteraction);
router.delete('/interactions/:id', InteractionController.deleteInteraction);

export default router;
