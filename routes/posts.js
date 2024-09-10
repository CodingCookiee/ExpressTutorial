// Using Express Router
import { Router } from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
const router = Router();

// Get all posts
router.get('/', getPosts);

// GET single post
router.get('/:id', getPost);

// Create new posts - POST method
router.post('/', createPost);

// Update post
router.put('/:id', updatePost);

// Delete post
router.delete('/:id', deletePost);

export default router;
