
const ProgramPolicyModel = require('../../program_policy/models/program_policy.model');
const ProgramApplicationModel = require('../models/program_application.model');
const GeneratepaynowlinkSendEmail = require('../../utilities/generate_paynow_link_send_email');
const Constants = require('../../../config/constants.js');

const ProgrammesModel =  require('../../programmes/models/programmes.model');
const IsbUserModel = require("../../isb_users/model/isb_user.model");
const async = require('async');


//this function is to approve the application
exports.approveApplication = async (req, res, next) => {
    try {
        const program_id = req.body.program_id;
        const user_id = req.body.user_id;
        const application_status = Constants.APPROVED_APPLICATION_STATUS;
        ProgramApplicationModel.updateProgramApplicationStatus(program_id, user_id, application_status).then(async application_result => {
            let programApplication = await ProgramApplicationModel.getProgramApplicationDetails(program_id,user_id);
            IsbUserModel.getIsbUserDetails(user_id).then(async isb_user_details => {
            let response =  await GeneratepaynowlinkSendEmail.emailConfigurationForPayNow(req,isb_user_details,programApplication,user_id)
                    res.status(200).json({ "messasge": "Program Application Approved and Email Send Successfully", "result": response });
            })
        })
    } catch (err) {
        next(err)
    }
}


//this function is to send the reminders based on the conditions
exports.sendEmailReminders = async (req, res, next) => {

    
    //need to get the application approved date 
    //initial i is =7 
    //check the payment status
    // i need to store this i value in the data to check the how many reminder

    //get all the program applications and loop each program applications and check the payment status ad trigger the reminder to the perticipent
    let programApplications = await ProgramApplicationModel.getAllProgramApplicationsDetails();
    console.log("sending the reminders to the perticipents for every 7 minutes",programApplications)
    async.eachSeries(programApplications, function (each_program_application, programApplicationCallback) {
        let i =7;
        if(each_program_application.is_paid==0){

        }

    })

}
