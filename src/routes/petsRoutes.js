import { Router } from 'express';
import petController from '../controllers/PetsController.js';

const router = new Router();

router.get('/pets', petController.index);

router.post('/pets', petController.create);

router.get('/pets/:id', petController.findById);

router.put('/pets/:id', petController.update);

router.delete('/pets/:id', petController.delete);

export default router;
