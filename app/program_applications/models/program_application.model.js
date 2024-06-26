const Joi = require('joi')
    .extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi)

const mongoose = require('../../../config/db').mongoose;
const CurrentDate = require('../../utilities/get_current_date');
const Constants = require('../../../config/constants.js');

const Schema = mongoose.Schema;


var programApplicationsSchema = new Schema({

    aws_id: {
        type: String,
        required: true,
    },

   
    learning_track_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'learningtracks',
    },

    learning_track_title: {
        type: String,
        //required: true,
    },
    email:{
        type:String
    },
    role: {
        type: String,
        //required: true
    },

    company: {
        type: String,
        //required: true
    },

    years_company: {
        type: Number,
        //required: true
    },

    industry: {
        type: String,
        //required: true
    },

    total_years: {
        type: Number
    },
    influencer:{
        type:String
    },
    learn_program:{
        type:String
    },
    participant_name:{
        type:String
    },
    program_year:{
        type:String
    },
    description:{
        type:String
    },
    user_consent1:{
        type:Boolean,
        default:0
    },
    user_consent2:{
        type:Boolean,
        default:0
    },
    program_start_date: {
        type: Number,
        required: true,
    },

    program_end_date: {
        type: Number,
        required: true,
    },

    application_status: {
        type: Number,
        default: Constants.PENDING_APPlICATION_STATUS
    },

    application_reject_reason: {
        type: String,
        default: null,
    },

    application_reject_comment: {
        type: String,
        default: null,
    },

    program_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Programmes',
    },

    application_created_date: {
        type: Number,
        default: function () {
            return CurrentDate.getCurrentDateTime()
        }
    },

    application_updated_date: {
        type: Number,
        default: function () {
            return CurrentDate.getCurrentDateTime()
        }
    },
    application_approved_date: {
        type: Number,
        default: function () {
            return CurrentDate.getCurrentDateTime()
        }
    },
    application_submission_email_sent: {
        type: Number,
        default: 0
    },
    learning_track_certificate_url:{
        type:String
    },
    learning_track_certificate_thumbnail_url:{
        type:String
    },

    is_deleted: {
        type: Number,
        default: Constants.NOT_DELETED_STATUS
    },
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freelessonusers'
    },
    payment_date: {
        type: Number

    },
    program_certificate_issued_date: {
        type: Number
    },
    payment_type: {
        type: Number
    },
    payment_details: [
        {   
            payment_name: {
                type:String,
                
            },
            payment_amount: {
                type: Number,
            },
            pay_by_date: {
                type: Number
            },
            payment_status: {
                type: Number,
            },
            paid_date: {
                type: Number
            },
            paid_amount: {
                type: Number
            },
            razorpay_order_id: {
                type: String
            }, 
            razorpay_transaction_id: {
                type: String
            },
           
            _id: false
        }
       
    ],


    is_paid: {
        type: Number,
        default: Constants.NOT_PAID_STATUS
    },

    full_payment_data: {
        type: Object,
        default: null
    },
    reminders_list:{
        type:Array,
        default:[]
    }


}, { collection: "programapplications" });

const programapplications = mongoose.model('programapplications', programApplicationsSchema);

exports.programapplications = programapplications;

exports.updateProgramApplicationStatus = (program_id, user_id, application_status) => {

    return programapplications.updateOne({ program_id: mongoose.Types.ObjectId(program_id), aws_id: user_id },
        { $set: { application_status: application_status, application_updated_date: CurrentDate.getCurrentDateTime(),application_approved_date:CurrentDate.getCurrentDateTime() } }, { upsert: true });
}

exports.getProgramApplicationDetails = (program_id,user_id) => {

    return programapplications.find({program_id: mongoose.Types.ObjectId(program_id),aws_id:user_id});

}

// exports.getAllProgramApplicationsDetails = () => {
//     return programapplications.find({program_id: mongoose.Types.ObjectId("65df02f4c0653b8146bc3266"),aws_id:"65e5a031f26d79cb5a980c18"});
// }
exports.getAllProgramApplicationsDetails = () => {
    return programapplications.find();
}
exports.updateTheProgramApplicationsDetails = (each_program_application) => {
    return programapplications.updateOne({ program_id: mongoose.Types.ObjectId(each_program_application.program_id), aws_id: each_program_application.aws_id },
    { $set: { reminders_list: each_program_application.reminders_list, application_updated_date: CurrentDate.getCurrentDateTime() } }, { upsert: true });
}
