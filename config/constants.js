/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const express = require('express');
var os = require('os');

var app = express();
require('dotenv').config();
let Constants = {
    DB_URL: process.env.DB_URL,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_GET_BOOKJOY_CO_URL,
    SENDGRID_API_KEY:process.env.SENDGRID_API_KEY,
    REPORT_EMAIL:process.env.REPORT_EMAIL,
    SUPPORT_EMAIL:process.env.SUPPORT_EMAIL,
    REPORT_EMAIL_NAME:process.env.REPORT_EMAIL_NAME,
    AWS_EMAIL_ACCESS_KEY:process.env.AWS_EMAIL_ACCESS_KEY,
    AWS_EMAIL_SECRET_KEY:process.env.AWS_EMAIL_SECRET_KEY,
    AWS_EMAIL_REGION:process.env.AWS_EMAIL_REGION,
    //this key_id and key_secret to integrate with razor-pay integration
    KEY_ID:process.env.KEY_ID,
    KEY_SECRET:process.env.KEY_SECRET,
    //crypto js secret key
    CRYPTO_SECRET_KEY:process.env.CRYPTO_SECRET_KEY,

    PEER_RESPONSE_SHORT_ANSWER_COUNT: 5,

    RANDOM_MONGO_OBJ_ID: "123456789ab123abc123b123",
                         


    REEVALUATION_APPROVED_POINTS: 1,

    //course application status
    PENDING_APPlICATION_STATUS: 0,
    APPROVED_APPLICATION_STATUS: 2,
    REJECTED_APPLICATION_STATUS: 1,
    BANNED_APPLICATION_STATUS: 3,

    //user rankings type
    RANK_TYPE_CITY: 1,
    RANK_TYPE_STATE: 2,
    RANK_TYPE_COUNTRY: 3,

   // admin roles
    ADMIN_ROLE:1,
    PROGRAM_MANAGEMENT_ROLE:2,
    ENROLLMENT_MANAGER_ROLE:3,

    //program_types
    PROGRAM_TYPE_LEARNING_TRACK:1,
    PROGRAM_TYPE_STANDALONE:2,


    //auth0 keys for sfdc student enrollment
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CONNECTION: "Username-Password-Authentication",
    AUTH0_SIGNUP_URL: process.env.AUTH0_SIGNUP_URL,
    PASSWORD_GENREARATION_STRING: "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    VERIFICATION_GENREARATION_STRING: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    //Please dont change these values these are given to clients
    SFDC_HEADER_STRING: process.env.SFDC_HEADER_STRING,
    SFDC_BODY_AUTH_STRING: process.env.SFDC_BODY_AUTH_STRING,

    // program status Constants
    PROGRAM_PUBLIC_STATUS: 1,
    PROGRAM_PRIVATE_STATUS: 2,
    PROGRAM_UNLISTED_STATUS: 3,

    //course status
    PUBLIC_STATUS: 1,
    NOT_PUBLIC_STATUS: 0,

    //free lesson status
    FREE_LESSON_COMPLETED: 1,
    FREE_LESSON_NOT_COMPLETED:0,

    //deleted status
    NOT_DELETED_STATUS: 0,
    DELETED_STATUS: 1,

    //payment status
    NOT_PAID_STATUS: 0,
    PAID_STATUS: 1,

    //razorpay payment success status
    PAYMENT_SUCCESS_STATUS: "paid",

    //CONDITION CHECK 
    CONDITION_CHECK_FALSE: 0,
    CONDITION_CHECK_TRUE: 1,

    CUSTOM_PROGRAM_TRACK_NAME: "Custom Courses Learning Track",
    QUIZ_NAME: "Quiz",
    COURSE_QUIZ_NAME: "Course Quiz",
    SOCIAL_LEARNING_ACTIVITY_NAME: "Social Learning Activity",
    INTEGRATIVE_THINKING_ACTIVITY_NAME: "Integrative Thinking Activity",
    //S3 bucket keys
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_FOLDER_NAME: process.env.AWS_FOLDER_NAME,
    AWS_REGION: process.env.AWS_REGION,
    VULTR_HOST_URL: process.env.VULTR_HOST_URL,
   // s3 encoder video URL
    S3_VIDEO_ENCODER_VID: process.env.S3_VIDEO_ENCODER_VID,
    //reporting cloud api key

    REPORTING_CLOUD_ACCESS_KEY_ID: process.env.REPORTING_CLOUD_ACCESS_KEY_ID,
    REPORTING_CLOUD_COURSE_CERTIFICATE_TEMPLATE_NAME: process.env.REPORTING_CLOUD_COURSE_CERTIFICATE_TEMPLATE_NAME,

    //SFDC API URL's
    SFDC_ACCESS_TOKEN_API_URL: process.env.SFDC_API_BASE_URL + process.env.SFDC_ACCESS_TOKEN_API_URL,
    SFDC_APPLICATION_API_URL: process.env.SFDC_API_BASE_URL + process.env.SFDC_APPLICATION_API_URL,
    SFDC_PAYMENT_API_URL: process.env.SFDC_API_BASE_URL + process.env.SFDC_PAYMENT_API_URL,
    SFDC_PROGRAM_API_URL: process.env.SFDC_API_BASE_URL + process.env.SFDC_PROGRAM_API_URL,
    SFDC_LEAD_API_URL: process.env.SFDC_API_BASE_URL + process.env.SFDC_LEAD_API_URL,
    SFDC_PROFILE_API_URL: process.env.SFDC_API_BASE_URL + process.env.SFDC_PROFILE_API_URL,
    IS_SFDC_ENABLED: process.env.IS_SFDC_ENABLED,

    //Course Progress Status
    COURSE_NOT_STARTED_STATUS: 0,
    COURSE_IN_PROGRESS_STATUS: 1,
    COURSE_COMPLETED_STATUS: 2,

    // Storfront url
    STORE_FRONT_URL: process.env.STORE_FRONT_URL,
    DECRYPT_HEADER_STRING: process.env.DECRYPT_HEADER_STRING,
    // Course Certificate issuing score percentage
    COURSE_CERTIFICATE_ISSUING_PERCENTAGE: 75,

    //APPLY NOW URL
    APPLY_NOW_URL: "https://hippolearn.isb.edu/onlineapplication",

    // short answer question type answers evolution
    OPEN_RESPONSE_ANSWER_EVALUTION_URL: "https://yvms4gtwd3.execute-api.ap-south-2.amazonaws.com/eval_open_responses",

    // gather town url
    GATHER_TOWN_URL: process.env.GATHER_TOWN_URL,

    // student enrollment enabled or not
    IS_STUDENT_ENROLLMENT_ENABLED: process.env.IS_STUDENT_ENROLLMENT_ENABLED === "true",
 
    //template names
    SLA_EMAIL_TEMPLATE_BODY     : 'sla_template',
    WELCOME_EMAIL_TEMPLATE_BODY : 'welcome_template',
    WEEKLY_PLAN_EMAIL_TEMPLATE_BODY : 'weekly_plan_template_body',
    WELCOME_ROLE_TEMPLATE1 : 'Rank Joint Secretary',
    WELCOME_ROLE_TEMPLATE2 : 'Deputy Secretary & Under Secretary',
    WELCOME_ROLE_TEMPLATE3 :  'Section Officer& Assistant Section Officer',
    WELCOME_ROLE_TEMPLATE_BODY : 'welcome_role_template',
    CBC_PROGRAMME1 : 'cbc programme 1',
    CBC_PROGRAMME2 : 'cbc programme 2',
    CBC_PROGRAMME3 : 'cbc programme 3',
    G20_PROGRAMME_NAME: 'Management Essentials (G20)',
    GOOGLE_DigiPivot_PROGRAMME_NAME: 'Google DigiPivot',
    VERIZON_PROGRAMME_NAME: 'Leading Self and Team',
    UNITE_PROGRAMME_NAME: 'Unite Programme',

    
    //template subjects  
    WELCOME_TEMPLATE_SUBJECT: "Welcome to ISB Online | Access Your Course – Critical Thinking",
    SLA_TEMPLATE__SUBJECT: "Social Learning Activity on May-20, 2023 | Group Decision Making, Critical Thinking",
    WELCOME_ROLE_TEMPLATE1_SUBJECT : "Access to ISB Courses | CBC Programme",

    //lesson objective purpose
    LESSON_OBJECTIVES_PURPOSE: "walkthrough",

    //prime activity purpose
    PRIMING_ACTIVITY_PURPOSE: "learnbydoing",

    //didiget this purpose
    DID_I_GET_THIS_PURPOSE: "didigetthis",

    //learn more purpose
    LEARN_MORE_PURPOSE: "learnmore",

    //quiz purpose
    QUIZ_PURPOSE: "quiz",

    //video component purpose
    VIDEO_ELEMENT_PURPOSE: "none",

    //attributions purpose
    ATTRIBUTION_ELEMENT_PURPOSE: "attribtions",

    //image element type
    IMAGE_ELEMENT_TYPE: "img",

    //video element type
    VIDEO_ELEMENT_TYPE: "video",

    //module badge earned status
    MODULE_BADGE_EARNED_STATUS: 1,

    //module badge missed status
    MODULE_BADGE_MISSED_STATUS: 0,

    //API Pagination No.of Records 
    NUMBER_OF_RECORDS_PER_PAGE: 20,

    //auto complete lesson numbers
    AUTO_COMPLETE_LESSON_INDEXES: [2, 3 , 4],
    //auto complete lesson names
    AUTO_COMPLETE_LESSON_TITLES: [ "Before You Begin", "Participant Code of Conduct", "Introduction to Social Learning Activities" ],
    REEVALUTION_NUMBER_OF_RECORDS_PER_PAGE: 100000,

    //summary lesson title
    SUMMARY_LESSON_TITLE: "Summary",

    //summary lesson title
    MOUDULE_SUMMARY_LESSON_TITLE: "Module Summary",

    //attributions lesson name
    ATTRIBUTIONS_LESSON_TITLE: "Additional Readings",

    //attributions lesson name
    ATTRIBUTIONS_MODULLE_LESSON_TITLE: "Additional Readings and Attributions",

    //attribution book type
    ATTRIBUTION_BOOK_TYPE: "Book",

    //attribution journel type
    ATTRIBUTION_JOURNEL_TYPE: "Journel article",

    //attribution video type
    ATTRIBUTION_VIDEO_TYPE: "Online video",

    //attribution webpage type
    ATTRIBUTION_WEBPAGE_TYPE: "Webpage",

    //attribution newspaper article
    ATTRIBUTION_NEWSARTICLE_TYPE: "Newspaper article",

    //attribution dictionary
    ATTRIBUTION_DICTIONARY_TYPE: "Dictionary entry",

    //attribution isb attribution type
    ATTRIBUTION_ISB_ATTRIBUTION_TYPE: "ISB Attribution",

    //attribution showing status
    ATTRIBUTION_SHOWING_STAUS: true,

    //attribution not showing status
    ATTRIBUTION_NOT_SHOWING_STAUS: false,

    //aws sns access keys
    AWS_SMS_ACCESS_KEY: process.env.AWS_SMS_ACCESS_KEY,
    AWS_SMS_SECRET_KEY: process.env.AWS_SMS_SECRET_KEY,
    AWS_SMS_REGION: process.env.AWS_SMS_REGION,

    //learning tracks names
    MANAGEMENT_ESSENTIALS_PROGRAMME_NAME: "Management Essentials",
    LEADERSHIP_ESSENTIALS_PROGRAMME_NAME: "Leadership Essentials",
    BUSINESS_STRATEGY_PROGRAMME_NAME: "Business Strategy",
    MARKETING_PROGRAMME_NAME: "Marketing",

    //email sending flag
    IS_EMAIL_ENABLED: process.env.IS_EMAIL_ENABLED === "true",

    //default course buffer time
    DEFAULT_COURSE_BUFFER_TIME: process.env.COURSE_BUFFER_TIME,
    DEFAULT_COURSE_DURATION_TIME: 14,

    //shareable types
    MODULE_BADGE_TYPE: 0,
    COURSE_CERTIFICATE_TYPE: 1,
    PROGRAM_CERTIFICATE_TYPE: 2,

    //program policy
    PROGRAM_POLICY_FALSE: false,
    PROGRAM_POLICY_TRUE: true,
    PROGRAM_POLICY_PAY_BY_DAY: 7,

    //ISBX Roles
    ISBX_ROLE_TEACHER: 1,
    ISBX_ROLE_STUDENT: 2,
    AUDIT_LEARNER_ROLE: 3,

    //platform names
    ISBO_PLATFORM_NAME: "ISBo",
    ISBX_PLATFORM_NAME: "ISBx",
    ISBM_PLATFORM_NAME: "ISBm",
    
    DEFAULT_BADGE_PERCENTAGE: 0.75,

    //slas and quizzes
    SLA_QUIZ_SLA:1,
    SLA_QUIZ_QUIZ:2,
    SLA_QUIZ_NONE:3,
    SLA_QUIZ_ALL:4,

    //emi installments
    EMI_TYPE_DEPOSIT: "Deposit",
    EMI_TYPE_PAYMENT1: "Payment-1",
    EMI_TYPE_PAYMENT2: "Payment-2",

    //Payment_type
    FULL_PAYMENT: 1,
    EMI_PAYMENT: 2,


    // Role

    ROLE_MYSELF : "MySelf",
    ROLE_TEAM : "My Team",
    ROLE_ORGANISATION : "My Organisation (L & D Responsibility)",

    //converts pdf to image
    PDF_TO_IMAGE_URL: process.env.PDF_TO_IMAGE_URL,

    //default ISBX otp value
    DEFAULT_ISBX_OTP_VALUE: 9999,

    //verizon program student flags
    PROGRAM_STUDENT: 0,
    VERIZON_PROGRAM_STUDENT: 1,
    VERIZON_PROFILE_STATUS: 2,

    //verizon sender email
    VERIZON_SENDER_MAIL: "ISB Online <isb_verizon_support@isb.edu>",
    ISBX_SENDER_MAIL: "ISB Online <support_isbx@isb.edu>",
    ISBX_UNITE_SENDER_MAIL: "ISB Online <support_unite@isb.edu>",
    ISBX_SUPPORT_MAIL: "support_isbx@isb.edu",
    ISBX_UNITE_SUPPORT_MAIL: "support_unite@isb.edu",

    //lead status
    STOREFRONT_LEAD: 0,
    OTHER_CAMPAIGN_LEAD: 1,
    
    //isbx message autofill code
    ISBX_APP_SMS_AUTOFILL_SIGNATURE_ID: process.env.ISBX_APP_SMS_AUTOFILL_SIGNATURE_ID,

    SERVER_NAME: os.hostname(),

    // slack alerts ignore on jwt expired
    SLACK_ALERTS_IGNORE_JWT_EXPIRED: "jwt expired",

    //january 2024 timestamp
    JANUARY_TIMESTAMP_FOR_POINTS: 1704090601000,
    
    //ITA Attendance bonus points
    ITA_ATTENDANCE_POINTS: 10,
    ITA_PARTIAL_ATTENDANCE_POINTS: 5,
    //Quiz default number of attempts
    DEFAULT_QUIZ_ATTEMPTS_COUNT: 99,
    //Max ITA Score
    MAX_ITA_ATTENDENCE_POINTS:10,


    
    NODE_ENV:process.env.NODE_ENV,
    SERVER_HOST:process.env.SERVER_HOST
}

if (app.get('env') === 'development') {
    // Constants.DB_USER = process.env.DB_USERS_DEV;
    // Constants.DB_PASSWORD = '';
    // Constants.DB_PORT = process.env.DB_PORTS_DEV;
    Constants.PROD_FLAG = 0;
    Constants.SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_LOCAL_URL;
} else {
    var host_name = os.hostname();
    switch (host_name)
    {
        case 'Prod-LXP':
            Constants.PROD_FLAG = 0;
            Constants.SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_BOOKJOY_CO_URL;
            break;
        default:
            Constants.PROD_FLAG = 0;
            Constants.SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_LOCAL_URL;
    }

}
module.exports = Object.freeze(Constants);