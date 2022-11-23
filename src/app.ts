import express from 'express';
import fileUpload from 'express-fileupload';
import middleware from './middleware';
import routes from './routes';

const app: express.Application = express();

middleware(app);
routes(app);

export default app;
