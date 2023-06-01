import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const routes = new Router();

routes.get('/user', UsersController.getAllUsers);
routes.post('/user', UsersController.createUser);
routes.get('/user/:id', UsersController.findById);
routes.get('/users/:name', UsersController.findByName);
routes.delete('/user/:id', UsersController.delete);
routes.put('/user/:id', UsersController.update);

export default routes;
