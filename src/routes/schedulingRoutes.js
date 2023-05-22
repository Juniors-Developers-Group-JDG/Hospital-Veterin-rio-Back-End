import { Router } from 'express';
import SchedulingController from '../controllers/SchedulingController.js';

const routes = new Router();

routes.get('/getAll', SchedulingController.getAllSchedules);
routes.post('/create', SchedulingController.createSchedule);

export default routes;
