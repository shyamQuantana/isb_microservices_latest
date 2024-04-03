const AWS = require('aws-sdk');
const Constants = require('../../config/constants');

const SES_CONFIG = {
    accessKeyId: Constants.AWS_EMAIL_ACCESS_KEY,
    secretAccessKey: Constants.AWS_EMAIL_SECRET_KEY,
    region: 'us-east-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let sendEmail = (html, recipientEmail, name) => {
    let params = {
      Source: Constants.REPORT_EMAIL,
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
};


module.exports = {sendEmail};