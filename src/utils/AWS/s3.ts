import 'dotenv/config';
import S3 from 'aws-sdk/clients/s3';

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

export async function uploadimageToS3(data: any, type: string) {
    try {
        let pngFile = type + '-' + Date.now() + '.' + type;

        const uploadParams: {
            Bucket: string;
            Key: any;
            Body: any;
        } = {
            Bucket: bucketName as string,
            Key: pngFile,
            Body: data,
        };

        await s3.putObject(uploadParams).promise();
        return pngFile;
        // return new Promise(resolve => {
        //     s3.putObject(uploadParams)
        // })
    } catch (error) {
        console.log(error);
    }
}
