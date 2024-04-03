const Constants = require('../../config/constants');
const API_KEY = Constants.SENDGRID_API_KEY;
const sgMail = require("@sendgrid/mail");
const AWS = require('aws-sdk');
const mailcomposer = require("mailcomposer");
sgMail.setApiKey(API_KEY);
const SES_CONFIG = {
  accessKeyId: Constants.AWS_EMAIL_ACCESS_KEY,
  secretAccessKey: Constants.AWS_EMAIL_SECRET_KEY,
  region: Constants.AWS_EMAIL_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let emailAttachment = async (recipientEmail, subject, html, report_email, role_handout_url_link)=>{
  if(Constants.IS_EMAIL_ENABLED){
    return Promise.resolve().then(() => {
      let sendRawEmailPromise;
    
      const mail = mailcomposer({
        from: report_email ? report_email:Constants.REPORT_EMAIL,
        to: recipientEmail,
        subject: subject,
        html: html,
        attachments: [
          {
            path: role_handout_url_link
          },
        ],
      });
    
      return new Promise((resolve, reject) => {
        mail.build(async (err, message) => {
          if (err) {
            console.log(`Error sending raw email: ${err}`)
            reject(`Error sending raw email: ${err}`);
          }
          sendRawEmailPromise = await AWS_SES.sendRawEmail({RawMessage: {Data: message}}).promise();
          //console.log(sendRawEmailPromise)
          resolve(sendRawEmailPromise);
        });
      });
    });
  }else{
    return {MessageId:'email functionality disabled'}
  }

}


let emailSender = (recipientEmail, subject, html, report_email) => {
  if(Constants.IS_EMAIL_ENABLED){
   let params = {
     Source: report_email ? report_email:Constants.REPORT_EMAIL,
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
         Data: subject,
       }
     },
   };
 
   if(Constants.SERVER_NAME === 'UAT-LXP' || Constants.SERVER_NAME === 'Prod-LXP')
   {
     return AWS_SES.sendEmail(params).promise();
 
   }
   else{
     return sendEmail(recipientEmail, subject, html, report_email);
   }
 }else{
  return {MessageId:'email functionality disabled'}
 }
  
};

let sendEmail = async (mail, subject, html, report_email) => {
  const msg = {
    from: {
      email: report_email ? report_email : Constants.REPORT_EMAIL,
      name: Constants.REPORT_EMAIL_NAME,
    },
    to: mail,
    subject: subject, // Subject line 
    html: html,// plain text body
  };
  return await sgMail
    .send(msg)
    .then((response) => {
      response.MessageId =new Date() ;
      return response
  })
    .catch((error) => { return error });
}


module.exports = {emailSender,emailAttachment,sendEmail}