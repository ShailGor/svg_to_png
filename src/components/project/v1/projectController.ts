import { Request, Response } from 'express';
// import path from 'path';
import sharp from 'sharp';
import { customRequest } from '../../../environment';
import uploadimageToS3 from '../../../utils/AWS';
import { addEmail, addLink, countLinks, getEmail } from '../model/projectModel';

export const svgToPng = async (req: customRequest, res: Response) => {
    try {
        let email = req.body.email;
        console.log(email);
        // for svg file
        let svgdata = req.body.svgdata;

        // for svg string data
        let svgFile = req.files.svgFile;
        let data: any = {};

        let is_email_exist = await getEmail(email);
        // console.log(is_email_exist?.id);

        data.user_id = is_email_exist?.id;

        if (!is_email_exist) {
            let userdata = await addEmail(email);
            data.user_id = userdata.id;
        } else {
            let count = await countLinks(data.user_id);
            if (count >= 5) {
                return res.send({
                    status: 422,
                    message: 'For download more file please subscribe..',
                });
            }
        }

        const svgBuffer = Buffer.from(svgdata, 'utf-8');
        // console.log(svgBuffer);

        // convert svg file to png
        // let file = await sharp(svgFile.data).png().toBuffer();
        let file = await sharp(svgBuffer).png().toBuffer();
        // console.log(file);

        // for png file upload
        let png_file = await uploadimageToS3(file, 'png');
        // console.log(png_file);
        data.png_link = 'http://svg-to-png-bucket.s3.ap-south-1.amazonaws.com/' + png_file;

        // for svg file upload
        let svg_file = await uploadimageToS3(svgBuffer, 'svg');
        // console.log(svg_file);
        data.svg_link = 'http://svg-to-png-bucket.s3.ap-south-1.amazonaws.com/' + svg_file;

        await addLink(data);

        return res.send({
            status: 200,
            message: 'image links are:',
            payload: {
                email,
                png_link: data.png_link,
                svg_link: data.svg_link,
            },
        });
    } catch (error) {
        console.log(error);
        return res.send({
            status: 500,
            message: 'Internal Server error',
        });
    }
};
