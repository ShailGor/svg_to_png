import { Application } from 'express';
import convert from '../components/project/v1/projectroutes';

export default (app: Application) => {
    app.use(convert);
};
