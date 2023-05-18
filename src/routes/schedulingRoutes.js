import { Router } from 'express';
import SchedulingController from '../controllers/SchedulingController.js';

const routes = new Router();

routes.get('/teste', SchedulingController.index);

export default routes;
