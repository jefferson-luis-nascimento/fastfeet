import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddlware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import StartEndDeliveryController from './app/controllers/StartEndDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliverymanSessionController from './app/controllers/DeliverymanSessionController';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/deliverymen/sessions', DeliverymanSessionController.store);

routes.use(authMiddlware);

routes.put('/users', UserController.update);

routes.get('/recipients/:recipient_id', RecipientController.index);
routes.get('/recipients', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipient_id', RecipientController.update);
routes.delete('/recipients/:recipient_id', RecipientController.delete);

routes.post('/files', uploads.single('file'), FileController.store);

routes.get('/deliverymen/:deliveryman_id', DeliverymanController.index);
routes.get('/deliverymen/', DeliverymanController.show);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:deliveryman_id', DeliverymanController.update);
routes.delete('/deliverymen/:deliveryman_id', DeliverymanController.delete);

routes.get(
  '/deliverymen/:deliveryman_id/deliveries',
  StartEndDeliveryController.show
);

routes.post(
  '/deliverymen/:deliveryman_id/deliveries',
  StartEndDeliveryController.store
);

routes.put(
  '/deliverymen/:deliveryman_id/deliveries',
  StartEndDeliveryController.update
);

routes.get('/deliveries/:delivery_id', DeliveryController.index);
routes.get('/deliveries', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:delivery_id', DeliveryController.update);
routes.delete('/deliveries/:delivery_id', DeliveryController.delete);

routes.get('/problems', DeliveryProblemController.show);
routes.get('/problems/:problem_id', DeliveryProblemController.index);

routes.post(
  '/deliveries/:delivery_id/problems',
  DeliveryProblemController.store
);

routes.delete(
  '/problems/:problem_id/cancel-delivery',
  DeliveryProblemController.delete
);

export default routes;
