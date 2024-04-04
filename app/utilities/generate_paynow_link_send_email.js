
const Constants = require('../../config/constants');
const async = require('async');
var moment = require('moment-timezone');
const axios = require('axios');
const EmailTemplates = require('../../app/utilities/email_templates');
const EmailSending = require('../../app/utilities/email_sending');
async function emailConfigurationForPayNow(req,isb_user_details,programApplication,user_id){
    var base_url = "https://"+req.headers.host;
    var payment_url = "";
    payment_url = base_url+ "/pay/"+user_id+"/"+programApplication[0].program_id ;
        var payment_date =new Date(programApplication[0].start_date + (Constants.PROGRAM_POLICY_PAY_BY_DAY * 24 * 60 * 60 * 1000)).setHours(23, 59, 59, 999);
        var accepted_mail_subject = `Congratulations! You have been accepted to the ISB Online Certificate Programme in ${programApplication[0].learning_track_title}`;
        var user_name = `${isb_user_details[0].first_name}`;
        var learning_track_name = `${programApplication[0].learning_track_title}`;
        var start_date = moment.tz(programApplication[0].start_date, "Asia/Kolkata").format("Do MMMM YYYY");
        var payment_last_date = moment(payment_date).startOf('day');//new Date(programApplication[0].program_start_date - 86400000); // that is: 24 * 60 * 60 * 1000
        var formated_payment_last_date = moment.tz(payment_last_date, "Asia/Kolkata").format("Do MMMM YYYY");
        html = EmailTemplates.getApplicationApprovedTemplate(user_name?.trim(), learning_track_name, start_date, formated_payment_last_date, payment_url);
            try {
                //let dummy_email = "himabindu+1@quantana.in"
                var email_response = await EmailSending.emailSender(
                    isb_user_details[0].email,
                    accepted_mail_subject,
                    html
                );
                return email_response;
            }
            catch (email_err) {
                console.log("email err:", email_err);
                return email_err;
            }
}

module.exports = {emailConfigurationForPayNow};