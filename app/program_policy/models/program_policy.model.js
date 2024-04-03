
const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("../../../config/db").mongoose;
const Schema = mongoose.Schema;
const CurrentDate = require('../../utilities/get_current_date');
const Constants = require('../../../config/constants');

const ProgramPolicySchema = new Schema({

    program_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Programmes'
    },
    // program_type: {
    //     type: Number,
    //     required: true,
    // },
    // program_visibility: {
    //     type: Number,
    //     required: true,
    // },
    certificate_pass_percentage: {
        type: Number,
        default: Constants.COURSE_CERTIFICATE_ISSUING_PERCENTAGE
    },
    badge_percentage: {
        type: Number,
        default: Constants.COURSE_CERTIFICATE_ISSUING_PERCENTAGE
    },
    badge_on_schedule: {
        type: Boolean,
        default: Constants.PROGRAM_POLICY_FALSE
    },
    certificate_on_schedule: {
        type: Boolean,
        default: Constants.PROGRAM_POLICY_FALSE
    },
    slas: {
        type: Boolean,
        default: Constants.PROGRAM_POLICY_TRUE
    },
    quizzes: {
        type: Boolean,
        default: Constants.PROGRAM_POLICY_TRUE
    },

    program_certificate: {
        type: Boolean,
        default: Constants.PROGRAM_POLICY_TRUE
    },
    course_certificate: {
        type: Boolean,
        default: Constants.PROGRAM_POLICY_TRUE
    },

    course_certificate_template_image: {
        type: String,
        default: ""
    },
    program_certificate_template_image: {
        type: String,
        default: ""
    },
    course_duration: {
        type: Number,
        default: Constants.DEFAULT_COURSE_BUFFER_TIME

    },
    course_buffer_time: {
        type: Number,
        default: Constants.DEFAULT_COURSE_BUFFER_TIME

    },
    created_date: {
        type: Number,
        default: function () {
            return CurrentDate.getCurrentDateTime()
        }
    },
    updated_date: {
        type: Number,
        default: function () {
            return CurrentDate.getCurrentDateTime()
        }
    },
    free_lesson_thank_you_subject: {
        type: String,
        default: ""

    },
    free_lesson_thank_you_content: {
        type: String,
        default: ""

    },
    apply_now_thank_you_subject: {
        type: String,
        default: ""

    },
    apply_now_thank_you_content: {
        type: String,
        default: ""

    },
    welcome_email_subject: {
        type: String,
        default: ""

    },
    welcome_email_content: {
        type: String,
        default: ""

    },
    approved_email_subject: {
        type: String,
        default: ""

    },
    approved_email_content: {
        type: String,
        default: ""

    },
    declined_email_subject: {
        type: String,
        default: ""

    },
    declined_email_content: {
        type: String,
        default: ""

    },
    learning_track_url: {
        type: String,
        default: ""

    },
    learning_track_message: {
        type: String,
        default: ""

    },
    is_approval_needed: {
        type: Boolean,
        default: Constants.PROGRAM_POLICY_TRUE
    },
    email_template_header_image: {
        type: String,
        default: ""

    },
    allowed_quiz_attempts: {
        type: Number,
    }

}, { collection: "programpolicy" });

const ProgramPolicy = mongoose.model('ProgramPolicy', ProgramPolicySchema);

exports.ProgramPolicy = this.ProgramPolicy;


exports.saveProgramPolicy = (program_policy_data) => {
    const ProgramPolicyObj = new ProgramPolicy(program_policy_data);
    return ProgramPolicyObj.save();
}

exports.getProgramPolicyByProgramId = (program_id) => {
    return ProgramPolicy.find({ program_id: mongoose.Types.ObjectId(program_id) })
}

exports.updateProgramPolicyByProgramId = (program_id, program_policy_details) => {

    return ProgramPolicy.findOneAndUpdate({ program_id: program_id }, { $set: program_policy_details, updated_date: CurrentDate.getCurrentDateTime() }, { new: true })

}

function validateData(data) {
    const schema = Joi.object({
        program_id: Joi.objectId().required(),
        certificate_pass_percentage: Joi.number().allow(null),
        badge_percentage: Joi.number().allow(null),
        badge_on_schedule: Joi.boolean().allow(null),
        certificate_on_schedule: Joi.boolean().allow(null),
        slas: Joi.boolean().allow(null),
        quizzes: Joi.boolean().allow(null),
        program_certificate: Joi.boolean().allow(null),
        course_certificate: Joi.boolean().allow(null),
        course_duration: Joi.number().allow(null),
        course_buffer_time: Joi.number().allow(null),
        free_lesson_thank_you_subject: Joi.string().trim().allow("").allow(null),
        free_lesson_thank_you_content: Joi.string().allow("").allow(null),
        apply_now_thank_you_subject: Joi.string().trim().allow("").allow(null),
        apply_now_thank_you_content: Joi.string().allow("").allow(null),
        welcome_email_subject: Joi.string().trim().allow("").allow(null),
        welcome_email_content: Joi.string().allow("").allow(null),
        approved_email_subject: Joi.string().trim().allow("").allow(null),
        approved_email_content: Joi.string().allow("").allow(null),
        declined_email_subject: Joi.string().trim().allow("").allow(null),
        declined_email_content: Joi.string().allow("").allow(null),
        learning_track_url: Joi.string().trim().allow("").allow(null),
        learning_track_message: Joi.string().trim().allow("").allow(null),
        email_template_header_image: Joi.string().trim().allow("").allow(null),

    });
    return schema.validate(data);
}

function validateGetProgramPolicyData(data) {
    const schema = Joi.object({
        program_id: Joi.objectId().required(),
    });
    return schema.validate(data);
}

exports.getEmailContentForProgramPlicy = (program_id) => {
    return ProgramPolicy.find({ program_id: mongoose.Types.ObjectId(program_id) }).populate('program_id');
};







exports.validate = validateData;
exports.validateGetProgramPolicyData = validateGetProgramPolicyData;







