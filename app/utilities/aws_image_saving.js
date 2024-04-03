
const AWS = require('aws-sdk');

const Constants = require('../../config/constants');


//const spacesEndpoint = new AWS.Endpoint(Constants.VULTR_HOST_URL);

const s3 = new AWS.S3({
    accessKeyId: Constants.AWS_ACCESS_KEY_ID,
    secretAccessKey: Constants.AWS_SECRET_ACCESS_KEY,
    region: Constants.AWS_REGION
    //endpoint: spacesEndpoint
})

async function uploadFiletoAWS(fileName,fileData, mimetype){

    const params = {
        Bucket: Constants.AWS_BUCKET_NAME,
        Key: Constants.AWS_FOLDER_NAME+"/"+fileName,
        Body: Buffer.from(fileData),
        ContentType: mimetype ? mimetype : 'application/pdf',
        // ACL: "public-read",
    };
    return new Promise((resolve, reject) =>{
        s3.upload(params, function (s3Err, data) {
            if (s3Err) {
                resolve('')
            }
            if (data) {
                if (data.Location) {
                    resolve(data.Location)
                } else {
                    resolve('')
                }
            }
        });
    })

};

exports.uploadFileuploadFiletoAWS = uploadFiletoAWS;
