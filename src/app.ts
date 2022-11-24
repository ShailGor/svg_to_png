import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import middleware from './middleware';
import routes from './routes';

const app: express.Application = express();

middleware(app);
routes(app);

app.get('/health', (req: Request, res: Response) => {
  return res.status(200).send('healthy');
});

export default app;
