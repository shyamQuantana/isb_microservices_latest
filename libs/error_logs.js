const Constants = require('../config/constants.js');


const { IncomingWebhook } = require('@slack/webhook');
 
// Read a url from the environment variables
const url = Constants.SLACK_WEBHOOK_URL;
// process.env.SLACK_WEBHOOK_URL;
 
// Initialize
const webhook = new IncomingWebhook(url);



exports.send_to_slack = async (error) =>
{
    check_error_message = error;
    error = JSON.stringify(error);
    error = error.replace(/[}{]/g,'');
    error = error.split(',').join('\n');
    error = '***********************\n' + error + '\n***********************';
  if (check_error_message.message !== Constants.SLACK_ALERTS_IGNORE_JWT_EXPIRED
    && !check_error_message.agent?.includes("Slackbot")
    && !check_error_message.agent?.includes("WhatsApp")){
      await webhook.send({
          text: error
        });
    }

}


exports.send_payment_details_to_slack = async (details) =>
{
    //check_payment_message = details;
    details = JSON.stringify(details);
    //details = details.replace(/[}{]/g,'');
    details = details.split(',').join('\n');
    
      await webhook.send({
          text: details
        });
    

}




