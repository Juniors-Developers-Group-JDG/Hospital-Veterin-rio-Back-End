import { Router } from 'express';
import PostsController from '../controllers/PostsController.js';

const routes = new Router();

routes.get('/', PostsController.getAllPosts);
routes.post('/', PostsController.createPost);
routes.delete('/:id', PostsController.deletePost);
routes.patch('/:id/content', PostsController.editContent);
routes.patch('/:id/title', PostsController.editTitle);
routes.put('/:id/comments', PostsController.addNewComment);

export default routes;
