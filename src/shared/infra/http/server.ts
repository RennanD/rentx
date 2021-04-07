import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import '../typeorm';
import '@shared/container';

import swaggerFile from '../../../swagger.json';
import { handleException } from './middlewares/handleException';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);
app.use(handleException);

app.listen(3333, () => {
  console.log('Server running');
});
