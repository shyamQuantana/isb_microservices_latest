
const ProgramPolicyModel = require('../../program_policy/models/program_policy.model');
const ProgramApplicationModel = require('../models/program_application.model');
const GeneratepaynowlinkSendEmail = require('../../utilities/generate_paynow_link_send_email');
const Constants = require('../../../config/constants.js');
const utilities = require('../../../app/utilities/get_current_date.js');

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
            let response =  await GeneratepaynowlinkSendEmail.emailConfigurationForPayNow(isb_user_details,programApplication,user_id,reminder="")
                    res.status(200).json({ "messasge": "Program Application Approved and Email Send Successfully", "result": response });
            })
        })
    } catch (err) {
        next(err)
    }
}


//this function is to send the reminders based on the conditions
exports.sendEmailReminders = async (req, res, next) => {
//checking for the positive first reminder
//program_start_date: 11 april;

//this for reminder 1
//application_approved : 28 march+7 days; and program_start: 27rd march+7

//this for reminder 2
//application_approved : 21 march

//send the reminders untill D+7 program_start_date: 20 apr +7 untill this 
//this function is to send the reminders untill D+7
//initial i= 7;
//first reminder is application_approved_date+(1*i);
// then the second reminder is  application_approved_date+ (2 *i)
//this process should execute untill the D+7 condition
    //get all the program applications and loop each program applications and check the payment status ad trigger the reminder to the perticipent
    let programApplications = await ProgramApplicationModel.getAllProgramApplicationsDetails();
    let no_of_reminders;
    let reminders_list=[];
    let i=7;
    async.eachSeries(programApplications,  function ( each_program_application, programApplicationCallback) {
        no_of_reminders=each_program_application.reminders_list != undefined && each_program_application.reminders_list != []?each_program_application.reminders_list.length+1:1;
        if(each_program_application.is_paid==0){
             if( new Date(each_program_application.program_start_date + (i * 24 * 60 * 60 * 1000)).setHours(23, 59, 59, 999)>=utilities.getCurrentDateTime()){
                const approvedDate = new Date(each_program_application.application_approved_date);
            // Add 7 days to the approved date
            const modifiedDate = new Date(approvedDate.getTime() + ((no_of_reminders*i) * 24 * 60 * 60 * 1000));
            // Check if the modified date is equal to the current date
            if (modifiedDate.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]) {
                        if (each_program_application.reminders_list == undefined || each_program_application.reminders_list == []) {
                            IsbUserModel.getIsbUserDetails(each_program_application.aws_id).then(async isb_user_details => {
                                let programApplication = [each_program_application];
                                let response = await GeneratepaynowlinkSendEmail.emailConfigurationForPayNow(isb_user_details, programApplication, each_program_application.aws_id,no_of_reminders)
                                if (response[0].statusCode == 202) {
                                    reminders_list.push({ "reminder": no_of_reminders, "reminder_sent_on": utilities.getCurrentDateTime()});
                                    each_program_application.reminders_list=reminders_list;
                                }
                                await ProgramApplicationModel.updateTheProgramApplicationsDetails(each_program_application);

                                programApplicationCallback()
                            })
                        }
                        else{
                            IsbUserModel.getIsbUserDetails(each_program_application.aws_id).then(async isb_user_details => {
                                let programApplication = [each_program_application];
                                let response = await GeneratepaynowlinkSendEmail.emailConfigurationForPayNow(isb_user_details, programApplication, each_program_application.aws_id,no_of_reminders)
                                if (response[0].statusCode == 202) {
                                    each_program_application.reminders_list.push({ "reminder": no_of_reminders, "reminder_sent_on": utilities.getCurrentDateTime()})
                                    await ProgramApplicationModel.updateTheProgramApplicationsDetails(each_program_application);                               
                                }
                                programApplicationCallback()
                            })
                        }
            }
            else{
                programApplicationCallback()
            }
        }
        else{
            programApplicationCallback()
        }
        }
        else{
            programApplicationCallback()
        }

    },function(err){
        if(err){
            console.log(err)
        }
        else{

            res.status(200).json({ "messasge": "success"});
        }
    }
    )

}
