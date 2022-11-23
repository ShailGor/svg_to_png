import express from 'express';
import { svgToPng } from './projectController';
import { validation } from './projectValidation';

const Router = express.Router();

Router.post('/convert_svg_to_png', validation.file_validation, svgToPng);

export default Router;
