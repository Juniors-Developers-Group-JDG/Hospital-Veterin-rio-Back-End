import { Router } from 'express';
import SchedulingController from '../controllers/SchedulingController.js';
import JwtMiddleware from '../middleware/ValidateToken.js';

const routes = new Router();

routes.get('/getAll', JwtMiddleware.validateJwt, SchedulingController.getAllSchedules);
routes.put('/reschedule/:id', JwtMiddleware.validateJwt, SchedulingController.reschedule);
routes.put('/closeSchedule/:id', JwtMiddleware.validateJwt, SchedulingController.closeSchedule);
routes.post('/create', JwtMiddleware.validateJwt, SchedulingController.createSchedule);
routes.delete('/delete/:id', JwtMiddleware.validateJwt, SchedulingController.deleteSchedule);

export default routes;
