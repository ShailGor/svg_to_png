import { NextFunction, Response } from 'express';
import { customRequest } from '../../../environment';

export const validation = {
    file_validation: (req: customRequest, res: Response, next: NextFunction) => {
        let { email } = req.body;
        let svgFile = req.files.svgFile;
        let svgdata = req.body.svgdata;

        if (!email) {
            return res.send({
                status: 422,
                message: 'Email is required',
            });
        }

        if (svgFile) {
            if (svgFile.mimetype != 'image/svg+xml') {
                return res.send({
                    status: 422,
                    message: 'file must be in svg format',
                });
            }
        }

        if (svgdata) {
            let size = Buffer.byteLength(svgdata);
            if (size > 5 * 1024 * 1024) {
                return res.send({
                    status: 422,
                    message: 'file size is not greater than 5MB',
                });
            }
        }
        next();
    },
};
