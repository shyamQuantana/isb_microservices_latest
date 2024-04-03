var AWS = require('aws-sdk');
const Constants = require('../../config/constants');

var config = {
    AWS: {
        accessKeyId: Constants.AWS_SMS_ACCESS_KEY,
        secretAccessKey: Constants.AWS_SMS_SECRET_KEY,
        region: Constants.AWS_SMS_REGION
    }
}

exports.sendSMS = (mobile_number, otp, app_sms_autofill_signature_id, app_name) => {
    AWS.config.update({
        accessKeyId: config.AWS.accessKeyId,
        secretAccessKey: config.AWS.secretAccessKey,
        region: config.AWS.region
    });
    var params = {
        Message: `Your OTP for ${app_name} app is ${otp}. Token:${app_sms_autofill_signature_id}`,
        MessageStructure: 'string',
        PhoneNumber: mobile_number,
        // MessageAttributes: {
        //     "AWS.SNS.SMS.SenderID": {
        //         DataType: 'String', StringValue: 'CustomSenderID'
        //     },
        //     "AWS.SNS.SMS.SMSType": {
        //         DataType: 'String', StringValue: 'Transactional'
        //     },
        //     "AWS.MM.SMS.EntityID": {
        //         DataType: 'String', StringValue: 'EntityID'
        //     },
        //     "AWS.MM.SMS.TemplateId": {
        //         DataType: 'String', StringValue: 'TemplateID'
        //     }
        // }
    }
    var sns = new AWS.SNS();
    return sns.publish(params).promise();
}