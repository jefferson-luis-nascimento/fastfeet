import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';

import authMiddlware from './app/middlewares/auth';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlware);

routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipient_id', RecipientController.update);

routes.post('/files', uploads.single('file'), FileController.store);

routes.get('/couriers/:courier_id', CourierController.index);
routes.get('/couriers/', CourierController.show);
routes.post('/couriers', CourierController.store);
routes.put('/couriers/:courier_id', CourierController.update);
routes.delete('/couriers/:courier_id', CourierController.delete);

export default routes;
