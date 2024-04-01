import express from 'express';
import PostController from '../controllers/postController.js';

const router = express.Router();

router.post('/posts', PostController.createPost);
router.get('/posts', PostController.getAllPosts);
router.get('/posts/search', PostController.searchAllPosts);
router.get('/posts/:id', PostController.getPostById);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);

export default router;
