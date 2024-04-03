const AWS       = require('aws-sdk');
const Constants = require('../../config/constants');

const s3 = new AWS.S3({
    accessKeyId: Constants.AWS_ACCESS_KEY_ID,
    secretAccessKey: Constants.AWS_SECRET_ACCESS_KEY,
    region: Constants.AWS_REGION
    //endpoint: spacesEndpoint
})

async function uploadBase64FiletoAWS(base64Data, fileName, mimetype){
    const buffer        = Buffer.from(base64Data, 'base64');
    let current_date    = new Date().getTime();
    
    const params = {
        Bucket: Constants.AWS_BUCKET_NAME,
        Key: Constants.AWS_FOLDER_NAME+"/"+current_date+fileName,
        Body: buffer, // The buffer containing the file data
        ContentType: mimetype,
    };
    return new Promise((resolve, reject) =>{
        s3.upload(params, function (s3Err, data)
         {
            if (s3Err) 
            {
                resolve('')
            }
            if (data) 
            {
                if (data.Location) 
                {
                    resolve(data.Location)
                } 
                else 
                {
                    resolve('')
                }
            }
        });
    })
};

exports.uploadBase64FileuploadFiletoAWS = uploadBase64FiletoAWS;