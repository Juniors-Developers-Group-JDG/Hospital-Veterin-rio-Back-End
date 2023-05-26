import { Router } from 'express';
import PostsController from '../controllers/PostsController';

const routes = new Router();

routes.get('/posts', PostsController.getAllPosts);
routes.post('/posts', PostsController.createPost);
routes.delete('/posts/:id', PostsController.deletePost);
routes.patch('/posts/:id/content', PostsController.editContent);
routes.patch('/posts/:id/title', PostsController.editTitle);
routes.put('/posts/:id/comments', PostsController.addNewComment);
