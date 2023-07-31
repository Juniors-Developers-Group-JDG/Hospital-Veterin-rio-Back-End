import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';
import LoginController from '../controllers/LoginController.js';

const routes = new Router();

routes.post('/login', LoginController.login);
routes.get('/getAllUsers', UsersController.getAllUsers);
routes.post('/createUser', UsersController.createUser);
// routes.post('/recoverPassword', UsersController.forgotPassword);
routes.get('/resetpassword/:id/:token', UsersController.resetPassword);
routes.post('/resetpassword/:id/:token', UsersController.changePassword);
routes.get('/user/:id', UsersController.findById);
routes.get('/users/:name', UsersController.findByName);
routes.delete('/user/:id', UsersController.delete);
routes.put('/user/:id', UsersController.update);

export default routes;
