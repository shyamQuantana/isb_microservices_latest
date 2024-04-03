
const ProgramPolicyModel = require('../models/program_policy.model');

const LearningTracksModal = require('../../learning_tracks/model/learning_track.model')

const LessonsModal = require('../../lessons/models/lessons.model')

const CohortSchedulesController = require('../../cohort_schedules/controllers/cohort_schedule.controller')

const CohortSchedulesModal = require('../../cohort_schedules/models/cohort_schedule.model')

const ModuleSchedulesModal = require('../../module_schedules/models/modules_schedule.model')

const LessonsScheduleModel = require('../../lesson_schedules/models/lessons_schedule.model')

const CohortStudentsModel = require('../../cohort_students/model/cohort_student.model');

const ProgramApplicationsModel = require('../../program_applications/models/program_application.model');

const CoursesModel = require('../../courses/models/courses.model');

const ModulesModel = require('../../modules/models/modules.model');

const Constants = require('../../../config/constants');

const SFDCController = require('../../sfdc_enrollment/controllers/sfdc_enrollment.controller');

const ProgramsModel = require('../../programmes/models/programmes.model');

const CurrentDate = require('../../utilities/get_current_date');

var moment = require('moment');
const { response } = require('../../../app');
const async = require('async');

exports.saveProgramPolicy = (req, res, next) => {
    try{

        const { error } = ProgramPolicyModel.validate(req.body);

        if (error) return res.status(400).send({ "message": error.details[0].message });

        var program_id = req.body.program_id;
        

        ProgramPolicyModel.getEmailContentForProgramPlicy(program_id).then(program_policy =>{


            if(program_policy.length > 0){

                var program_policy_details = req.body;
                //console.log("program_policy_details:",program_policy_details);
                delete program_policy_details["program_id"];
                //console.log("program_policy_details2:",program_policy_details);

                ProgramPolicyModel.updateProgramPolicyByProgramId(program_id,program_policy_details).then(result => {


                    let program_type = program_policy.length > 0 ? program_policy[program_policy.length - 1].program_id.program_type : Constants.PROGRAM_TYPE_LEARNING_TRACK;

                    CohortStudentsModel.updateStudentsEndandExpiryDateBasedOnProgramId(program_id, program_policy_details.course_duration, program_policy_details.course_buffer_time, program_type);

                    res.status(200).send({ status: 200, message: "Program policy updated successfully", data: result })
                       

                })

            }else{

                const program_policy_data = {
                    program_id: program_id,
                    certificate_pass_percentage: req.body.certificate_pass_percentage,
                    badge_percentage: req.body.badge_percentage,
                    badge_on_schedule: req.body.badge_on_schedule,
                    certificate_on_schedule:req.body.certificate_on_schedule ,
                    slas: req.body.slas,
                    quizzes: req.body.quizzes,
                    program_certificate: req.body.program_certificate,
                    course_certificate: req.body.course_certificate,
                    course_duration: req.body.course_duration,
                    course_buffer_time: req.body.course_buffer_time ,
                    free_lesson_thank_you_subject: req.body.free_lesson_thank_you_subject,
                    free_lesson_thank_you_content: req.body.free_lesson_thank_you_content,
                    apply_now_thank_you_subject:req.body.apply_now_thank_you_subject ,
                    apply_now_thank_you_content:req.body.apply_now_thank_you_content ,
                    welcome_email_subject:req.body.welcome_email_subject,
                    welcome_email_content:req.body.welcome_email_content,
                    approved_email_subject: req.body.approved_email_subject,
                    approved_email_content: req.body.approved_email_content,
                    declined_email_subject: req.body.declined_email_subject,
                    declined_email_content: req.body.declined_email_content,
                    learning_track_url: req.body.learning_track_url,
                    learning_track_message: req.body.learning_track_message,
                    email_template_header_image: req.body.email_template_header_image
                };

                ProgramPolicyModel.saveProgramPolicy(program_policy_data).then(result => {

                    res.status(200).send({ status: 200, message: "Program policy created successfully", data: result })    

                })
               
            }

        });

       

    }catch(err){
        next(err);
    }

}


exports.getProgramPolicyDetails = async(req, res, next) => {
    try{

        const { error } = ProgramPolicyModel.validateGetProgramPolicyData(req.body);

        if (error) return res.status(400).send({ "message": error.details[0].message });

        await ProgramPolicyModel.getProgramPolicyByProgramId(req.body.program_id).then(program_policy => {
            
            res.status(200).send({status: 200, data: program_policy})

        })
       

    }catch(err){
        next(err);
    }

}



