import { Router } from 'express';
import SchedulingController from '../controllers/SchedulingController.js';

const routes = new Router();

routes.get('/getAll', SchedulingController.getAllSchedules);
routes.put('/reschedule/:id', SchedulingController.reschedule);
routes.put('/closeSchedule/:id', SchedulingController.closeSchedule);
routes.post('/create', SchedulingController.createSchedule);
routes.delete('/delete/:id', SchedulingController.deleteSchedule);

export default routes;
