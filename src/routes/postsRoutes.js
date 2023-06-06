import { Router } from 'express';
import PostsController from '../controllers/PostsController.js';
import JwtMiddleware from '../middleware/ValidateToken.js';

const routes = new Router();

routes.get('/', PostsController.getAllPosts);
routes.post('/', JwtMiddleware.validateJwt, PostsController.createPost);
routes.delete('/:id', JwtMiddleware.validateJwt, PostsController.deletePost);
routes.patch('/:id/content', PostsController.editContent);
routes.patch('/:id/title', PostsController.editTitle);
routes.put('/:id/comments', JwtMiddleware.validateJwt, PostsController.addNewComment);

export default routes;
