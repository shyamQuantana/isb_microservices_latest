const { S3Client }  = require('@aws-sdk/client-s3');
const multerS3      = require('multer-s3');
const multer        = require('multer'); 
const path          = require('path'); 
const Constants     = require('../../config/constants');

const config  = {
    region: Constants.AWS_REGION,
    credentials: {
        accessKeyId: Constants.AWS_ACCESS_KEY_ID,
        secretAccessKey: Constants.AWS_SECRET_ACCESS_KEY
    }
}
const s3 = new S3Client(config);

const uploadFileMulter = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: Constants.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {   
            const fileName = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
            cb(null, `${fileName}${path.extname(file.originalname)}`);
        }
    })
});

module.exports = uploadFileMulter;