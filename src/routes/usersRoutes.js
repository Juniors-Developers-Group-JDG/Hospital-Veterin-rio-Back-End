import { Router } from 'express';
import LoginController from '../controllers/LoginController.js';
import UsersController from '../controllers/UsersController.js';

const routes = new Router();

routes.post('/login', LoginController.login);
routes.get('/user', UsersController.getAllUsers);
routes.post('/user', UsersController.createUser);
routes.post('/recoverPassword', UsersController.forgotPassword);
routes.get('/resetpassword/:id/:token', UsersController.resetPassword);
routes.post('/resetpassword/:id/:token', UsersController.changePassword);
routes.get('/user/:id', UsersController.findById);
routes.get('/users/:name', UsersController.findByName);
routes.delete('/user/:id', UsersController.delete);
routes.put('/user/:id', UsersController.update);
routes.patch('/user/:id', UsersController.patch);

export default routes;
