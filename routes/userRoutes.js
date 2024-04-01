import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/search', UserController.searchAllUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
