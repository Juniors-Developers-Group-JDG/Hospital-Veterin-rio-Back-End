import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const routes = new Router();

routes.get('/user', UsersController.getAllUsers);
routes.post('/user', UsersController.createUser);

export default routes;
