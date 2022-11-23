import express, { Application } from 'express';
import fileUpload from 'express-fileupload';

export default (app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        fileUpload({
            parseNested: true,
            createParentPath: true,
        })
    );

    app.use(express.static('public'));
};
