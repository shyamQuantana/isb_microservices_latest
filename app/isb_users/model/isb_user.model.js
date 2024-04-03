const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("../../../config/db").mongoose;
const Schema = mongoose.Schema;
const Constants = require('../../../config/constants');
const CurrentDate = require('../../utilities/get_current_date');
var isbUsersSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            //required: true
        },
        created_date: {
            type: Number,
            default: function () {
                return CurrentDate.getCurrentDateTime()
            }
        },
       
        refresh_token: {
            type: String,
            //required: true
        },
        
        first_name: {
            type: String,
            required: true
        },
    
        last_name: {
            type: String
        },
    
    
        mobile: {
            type: String,
            //required: true,
            minLength: 4,
            maxLength: 13,
        },
        country_code: {
            type: String
        },
    
        dob: {
            type: String,
            //required: true
        },
    
        gender: {
            type: String,
            //required: true
        },

        age:{
            type: Number
        },
    
        pronoun: {
            type: String,
            //required: true
        },
    
        country: {
            type: String,
            //required: true
        },
    
        state: {
            type: String,
            //required: true
        },
    
        city: {
            type: String,
           // required: true
        },
    
        postcode: {
            type: String,
            //required: true,
            // minLength: 3,
            // maxLength: 8,
        },
    
        street_address_1:{
            type:String,
           // required: true
          },
        
        street_address_2:{
            type:String,
           // required: true
          },

        billing_country: {
            type: String,
            //required: true
        },
    
        billing_state: {
            type: String,
            //required: true
        },
    
        billing_city: {
            type: String,
           // required: true
        },
    
        billing_postcode: {
            type: String,
            //required: true,
            // minLength: 3,
            // maxLength: 8,
        },
    
        billing_street_address_1:{
            type:String,
           // required: true
          },
        
        billing_street_address_2:{
            type:String,
           // required: true
          },  

        is_billing_address:{
            type: Boolean,
            default: 0
        } , 
    
        role: {
            type: String,
            //required: true
        },
    
        company: {
            type: String,
            //required: true
        },

        company_id:{
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
            type: Number,
            // required: true
        },
    
        high_education: {
            type: String,
            //required: true
        },
    
        high_institute: {
            type: String,
            //required: true
        },
    
        graduation_year: {
            type: Number,
        },
    
        prev_education: {
            type: String,
            //required: true
        },
    
        prev_institute: {
            type: String,
            //required: true
        },

        company_gst_number:{
            type: String,
            //required: true,
        },
        billing_telephone:{
                type: String,
                //required: true, 
        },
        billing_telephone_code:{
                type: String,
                //required: true, 
        },
        paid_by:{
            type: String,
            //required: true, 
        },
        payee_first_name:{
            type: String,
        },
        payee_last_name:{
            type: String,
        },
        payee_email:{
            type: String,
        },
        payee_mobile:{
            type: String,
        },
        payee_mobile_code:{
            type: String,
        },
        pan_id:{
            type:String
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
        is_banned:{
            type:Boolean,
            default:0
        },
        verification_otp:{
            type:Number
        },
        profile_pic:{
            type:String
        },
        auth_refresh_token:[
            {token:{type:String}, _id:false}],
        enabled_platforms: {
            type: [String],
            default: [Constants.ISBO_PLATFORM_NAME]
        },
        class: {
            type: String,
        },
        // 1 -- Teacher
        // 2 -- Student
        // 3 -- Audit Learner
        user_roles: {
            type: [Number],
            default: [Constants.ISBX_ROLE_STUDENT]
        },    
        user_college_code: {
            type: String
        },    
        college_place: {
            type: String
        },    
        college_logo: {
            type: String
        },    
        learner_class: {
            type: String
        },    
        fcm_token: {
            type: [String],
            default: []
        },
        is_verizon_student: {
            type: Number,
            default: Constants.PROGRAM_STUDENT
        },    
        access_token: {
            type: String
        },    
        },
        { collection: "isbusers" }
);

const isbusers = mongoose.model("isbusers", isbUsersSchema);

exports.saveisbuserInfo = (data) => {
    const isbusersObject = new isbusers(data);
    return isbusersObject.save();
};
exports.findUser = (email) => {
    return isbusers.find({ email: email });
};


exports.LoginUserCheck = (email, password) => {
    return isbusers.aggregate([
        {
            $match: {
                email: email,
                password: password,
            },
        },
        {
            $project: {
                password: 0,
            },
        },
    ]);
};

exports.UpdateUser = (email,password) => {
  
    return isbusers.findOneAndUpdate({ email: email},
        {  password:password},{new:true} );

    // return isbusers.updateOne({ email: email},
    //     { $set: { password:password} });
}


exports.getUserById = (user_id) => {
    return new Promise((resolve, reject) => {
        isbusers.find({_id: user_id})
            .exec(function (err, element) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(element);
                }
            })
    });


};

exports.updateUserDetails = (user_id,user_details) => {
    
    return new Promise((resolve, reject) => {
    isbusers.updateOne({_id:user_id} ,{ $set:user_details}, {new: true})
            .exec(function (err, element) {
                if (err) {
                    resolve(err);
                } else {
                    resolve(element);
                }
            })
        })


};


exports.findUserByEmailAndToken = (user_id, email) => {
    return isbusers.find({_id: user_id, email: email});
};

exports.UpdateUserByEmail = (email, password) => {
  
    return isbusers.findOneAndUpdate({ email: email},
        {  password:password, refresh_token:""},{new:true} );

    // return isbusers.updateOne({ email: email},
    //     { $set: { password:password} });
}


function validateData(data) {
    const schema = Joi.object({
        email: Joi.string().trim()
            .required().email(),
        first_name: Joi.string().trim()
            .required(),
        last_name: Joi.string().trim()
            .required().allow(null).allow(""),
        mobile: Joi.string().trim()
            .min(10) .max(13),
        dob: Joi.date()
            .allow(null).allow(""),
        gender: Joi.string().trim()
            .allow(null).allow(""),
        role: Joi.string().trim()
            .allow(null).allow(""), 
        company: Joi.string().trim()
            .allow(null).allow(""), 
        company_id: Joi.string().trim()
            .allow(null).allow(""),           
        pronoun: Joi.string().trim()
            .allow(null).allow(""),
        country:  Joi.string().trim()
            .allow(null).allow(""),
        state:  Joi.string().trim()
            .allow(null).allow(""),
        city:  Joi.string().trim()
            .allow(null).allow(""),
        postcode: Joi.string().trim()
            .allow(null).allow(""),
        street_address_1: Joi.string().trim()
            .allow(null).allow(""),
        street_address_2: Joi.string().trim()
            .allow(null).allow(""),
        billing_country:  Joi.string().trim()
            .allow(null).allow(""),
        billing_state:  Joi.string().trim()
            .allow(null).allow(""),
        billing_city:  Joi.string().trim()
            .allow(null).allow(""),
        billing_postcode: Joi.string().trim()
            .allow(null).allow(""),
        billing_street_address_1: Joi.string().trim()
            .allow(null).allow(""),
        billing_street_address_2: Joi.string().trim()
            .allow(null).allow(""),  
        is_billing_address:  Joi.boolean()
            .allow(null).allow(""),   
        current_role: Joi.string().trim()
            .allow(null).allow(""),
        current_company:  Joi.string().trim()
            .allow(null).allow(""),
        industry:  Joi.string().trim()
            .allow(null).allow(""),
        years_company: Joi.number()
            .allow(null),
        total_years:  Joi.number()
            .required(),
        high_education: Joi.string().trim()
            .allow(null).allow(""),
        high_institute: Joi.string().trim()
            .allow(null).allow(""),
        graduation_year: Joi.number()
            .allow(null).allow(""),
        prev_education: Joi.string().trim()
            .allow(null).allow(""),
        prev_institute: Joi.string().trim()
            .allow(null).allow(""),
        company_gst_number: Joi.string().trim()
            .allow(null).allow(""),
        billing_telephone: Joi.string().trim()
            .allow(null).allow(""),        
        paid_by: Joi.string().trim()
            .allow(null).allow(""),     
        age: Joi.number().allow(null).allow(""),
        pan_id: Joi.string().trim().allow(null).allow(""),
        is_verizon_student: Joi.number()
            .allow(null).allow("") 
        //courses: Joi.array().allow(null).allow(""),
    });
    return schema.validate(data);
}

function validateEmail(data) {
    const schema = Joi.object({
        email: Joi.string().trim().required().email(),
    });
    return schema.validate(data);
}

function validateResetPassword(data) {
    const schema = Joi.object({
        email: Joi.string().trim().required().email(),
        password: Joi.string().trim().required(),
        user_id: Joi.string().trim().required(),
        refresh_token: Joi.string().trim().allow(null).allow(""),

    });
    return schema.validate(data);
}

function validateAcivityData(data) {
    const schema = Joi.object({
        user_id: Joi.string().length(24).required(),
    });
    return schema.validate(data);
}

function validateIsbxUserLoginData(data) {
    const schema = Joi.object({
        mobile_number: Joi.string().trim()
            .min(10).max(13).required(),
        country_code: Joi.string().trim()
            .min(2).max(5).allow(null).allow(""),
    });
    return schema.validate(data);
}

function validateIsbxUserOTPData(data) {
    const schema = Joi.object({
        mobile_number: Joi.string().trim()
            .min(10).max(13).required(),
        otp: Joi.number().integer()
            .min(1000).max(9999).required(),
        fcm_token: Joi.string().allow(null),
    });
    return schema.validate(data);
}

function validateIsbxUserLogOutData(data) {
    const schema = Joi.object({
        user_id: Joi.string().trim().required(),
        fcm_token: Joi.string().allow(null)
    });
    return schema.validate(data);
}

exports.isbusers = isbusers;
exports.validateData = validateData;
exports.validateEmail = validateEmail;
exports.validateIsbxUserLoginData = validateIsbxUserLoginData;
exports.validateIsbxUserOTPData = validateIsbxUserOTPData;
exports.validateIsbxUserLogOutData = validateIsbxUserLogOutData;


exports.getIsbUserDetails = (user_id) => {

    return isbusers.find({ _id: user_id });

}

exports.updateRefreshToken = (user_id,refresh_token) => {
    
    return isbusers.updateOne({_id:user_id} ,{ $set:{ refresh_token: refresh_token} });
    
}

exports.validateResetPassword = validateResetPassword; 
exports.validateAcivityData = validateAcivityData;


exports.getUsersfromPlace = (place, user_id, place_type) => {

    if (place_type == Constants.RANK_TYPE_CITY) {
        return isbusers.find({ city: new RegExp(place, 'i'), _id: { $nin: [user_id] } });


    }
    else if (place_type == Constants.RANK_TYPE_STATE) {
        return isbusers.find({ state: new RegExp(place, 'i'), _id: { $nin: [user_id] } });
    }
    else if (place_type == Constants.RANK_TYPE_COUNTRY) {
        return isbusers.find({ country: new RegExp(place, 'i'), _id: { $nin: [user_id] } });
    }

}

exports.getAllUsersforRank = (user_id) => {

    return isbusers.find({ _id: { $nin: [user_id] } });

}

exports.getUsersWithoutFirstname = () => {

    //return isbusers.find({first_name:{ $in: [null, ""] }}) 
    return isbusers.find({ $or: [ {first_name:{ $in: [null, ""] }}, {city:{ $in: [null, ""] }}, {state:{ $in: [null, ""] }} ] })

}

exports.updateMissingUserData = (id, first_name, last_name, city, state, country, postcode) => {

    return isbusers.findOneAndUpdate({ _id: id},
     {  first_name: first_name, last_name: last_name, city: city, state: state, country: country, postcode: postcode}, {new:true} );


}

exports.updateUser= (email,  token) => {  

    var auth_refresh_token={token: token}
    return isbusers.updateOne({email:email} , 
      {
        $push: { auth_refresh_token: auth_refresh_token }
  
      })
      
      
    }

exports.updateToken = (id, token) => {

    return isbusers.updateOne ({_id:id,  auth_refresh_token: { $elemMatch: { token: token } } } , 
    {$pull: { auth_refresh_token: {token:token}}});
    
  }
  
  
  exports.findAdminById = (id) => {
  
    return isbusers.find ({_id:id} );
    
  }
  
  exports.findByAuthRefreshToken = (id, token) => {
  
    return isbusers.find({_id:id,  auth_refresh_token: { $elemMatch: { token: token } } })
    
  }
function validateUpdateData(data) {
    const schema = Joi.object({
        id: Joi.objectId().required(),
        user_details:{
            email: Joi.string().trim().email(),
        first_name: Joi.string().trim(),
        last_name: Joi.string().trim()
            .allow(null).allow(""),
        mobile: Joi.string().trim()
            .allow(null).allow(""),
        country_code: Joi.string().trim()
            .allow(null).allow(""),
        dob: Joi.date()
            .allow(null).allow(""),
        gender: Joi.string().trim()
            .allow(null).allow(""),
        role: Joi.string().trim()
            .allow(null).allow(""), 
        company: Joi.string().trim()
            .allow(null).allow(""), 
        company_id: Joi.string().trim()
            .allow(null).allow(""),           
        pronoun: Joi.string().trim()
            .allow(null).allow(""),
        country:  Joi.string().trim()
            .allow(null).allow(""),
        state:  Joi.string().trim()
            .allow(null).allow(""),
        city:  Joi.string().trim()
            .allow(null).allow(""),
        postcode: Joi.string().trim()
            .allow(null).allow(""),
        street_address_1: Joi.string().trim()
            .allow(null).allow(""),
        street_address_2: Joi.string().trim()
            .allow(null).allow(""),
        billing_country:  Joi.string().trim()
            .allow(null).allow(""),
        billing_state:  Joi.string().trim()
            .allow(null).allow(""),
        billing_city:  Joi.string().trim()
            .allow(null).allow(""),
        billing_postcode: Joi.string().trim()
            .allow(null).allow(""),
        billing_street_address_1: Joi.string().trim()
            .allow(null).allow(""),
        billing_street_address_2: Joi.string().trim()
            .allow(null).allow(""),  
        is_billing_address:  Joi.boolean()
            .allow(null).allow(""),   
        current_role: Joi.string().trim()
            .allow(null).allow(""),
        influencer: Joi.string().trim()
            .allow(null).allow(""),
        learn_program: Joi.string().trim()
            .allow(null).allow(""),
        participant_name: Joi.string().trim()
            .allow(null).allow(""),
        program_year: Joi.string().trim()
            .allow(null).allow(""),
        description: Joi.string().trim()
            .allow(null).allow(""),
        current_company:  Joi.string().trim()
            .allow(null).allow(""),
        industry:  Joi.string().trim()
            .allow(null).allow(""),
        years_company: Joi.number()
            .allow(null),
        total_years:  Joi.number(),
        high_education: Joi.string().trim()
            .allow(null).allow(""),
        high_institute: Joi.string().trim()
            .allow(null).allow(""),
        graduation_year: Joi.number()
            .allow(null).allow(""),
        prev_education: Joi.string().trim()
            .allow(null).allow(""),
        prev_institute: Joi.string().trim()
            .allow(null).allow(""),
        company_gst_number: Joi.string().trim()
            .allow(null).allow(""),
        billing_telephone: Joi.string().trim()
            .allow(null).allow(""), 
        billing_telephone_code: Joi.string().trim()
            .allow(null).allow(""), 
        paid_by: Joi.string().trim()
            .allow(null).allow(""),
        payee_first_name: Joi.string().trim()
            .allow(null).allow(""),
        payee_last_name: Joi.string().trim()
            .allow(null).allow(""),
        payee_email: Joi.string().trim()
            .allow(null).allow(""),
        payee_mobile: Joi.string().trim()
            .allow(null).allow(""),
        payee_mobile_code: Joi.string().trim()
            .allow(null).allow(""),
        age: Joi.number().allow(null).allow("")    ,
        pan_id: Joi.string().trim()
            .allow(null).allow(""),
        is_verizon_student: Joi.number()
                .allow(null).allow("")    
         
        }
       
    });
    return schema.validate(data);
}

exports.validateUpdateData = validateUpdateData;

exports.getUserDataByID = (user_id) => {

    return isbusers.find({ _id: user_id });

}

exports.getIsbUserDetailsByEmail = (email) => {

    return isbusers.find({ email: email });

}

exports.getUserList = () => {
    return isbusers.aggregate([
        {
            $match: {},
        },
        {
            $project: {
                _id: 1,
                first_name: 1,
                mobile: 1,
                dob: 1,
                email: 1,
                gender: 1,
                pronoun: 1,
                country: 1,
                state: 1,
                city: 1,
                postcode: 1,
                current_role: 1,
                company: 1,
                total_years: 1,
                years_company: 1,
                industry: 1,
                high_education: 1,
                high_institute: 1,
                graduation_year: 1,
            },
        },
    ]);
}

exports.findUserByMobileNumber = (mobile, enabled_platform) => {
    return isbusers.aggregate([{ $match: { mobile: mobile, enabled_platforms: enabled_platform }}, {$project: {auth_refresh_token: 0}}]);
};

exports.updateUserOTP = (mobile_number, otp) => {

    return isbusers.updateOne({ mobile: mobile_number }, { $set: { verification_otp: otp } });

}

exports.updateUserTokens = (mobile, token, access_token, fcm_token) => {

    var auth_refresh_token = { token: token }
    return isbusers.updateOne({ mobile: mobile },
        {
        $set: { verification_otp: 0, access_token: access_token},
            $push: { auth_refresh_token: auth_refresh_token, fcm_token: fcm_token }
        })


}

exports.updateUserProfile = (user_id, user_profile_url) => {
    return isbusers.updateOne(
        { _id: user_id }, 
        { $set: { profile_pic: user_profile_url } }
    );
}


exports.getIsbxTeacherDetails = (user_id) => {

    return isbusers.find({ _id: user_id, user_roles: Constants.ISBX_ROLE_TEACHER });

}

exports.getIsbxLearnerDetails = (user_id) => {

    return isbusers.find({ _id: user_id, user_roles: Constants.ISBX_ROLE_STUDENT });

}

exports.getIsbxUserNameData = (user_id) => {

    return isbusers.aggregate([

        { $project: { "name": "$first_name", "_id": "$_id"} },

        {
            $match: { _id: mongoose.Types.ObjectId(user_id) }
        }

    ]);

}


exports.updateISBxUserDetails = (user_id, mobile_number, college_code, college_logo, learner_class, college_place, platform, user_role) => {

    return isbusers.updateOne({ _id: user_id }, { $set: { mobile: mobile_number, user_college_code: college_code, college_place: college_place, learner_class: learner_class, college_logo: college_logo }, $addToSet: { enabled_platforms: platform, user_roles: user_role} }, { upsert: true });

}


exports.getIsbxUserDetailsData = (user_id, platform, role) => {

    return isbusers.aggregate([
        {
          $match: {
            enabled_platforms: platform,
            user_roles: role,
            _id: mongoose.Types.ObjectId(user_id),
          },
        },
        {
          $project: {
            first_name: "$first_name",
            _id: "$_id",
            email: "$email",
            mobile: "$mobile",
            user_college_code: "$user_college_code",
            college_place: "$college_place",
            learner_class: "$learner_class",
          },
        },
      ]);

}

exports.findUserDetailsByMobileNumber = (mobile) => {
    return isbusers.aggregate([{ $match: { mobile: mobile } }, { $project: { auth_refresh_token: 0 } }]);
};

exports.logoutISBxUser = (user_id, fcm_token) => {
    return isbusers.updateOne({ _id: user_id }, { $pull: { fcm_token: fcm_token }, $set: { access_token: "" }});
};


exports.getUserDetailsByListofUserIds = (userIds) => {

    return isbusers.aggregate([
        {
            $match: {
                _id: {
                    $in: userIds,
                },
            },
        },
    ]);

}

exports.getUserNameAndEmailByListofUserId = (user_id) => {

    return isbusers.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(user_id),
                user_roles: { $nin: [Constants.AUDIT_LEARNER_ROLE] } 
            },
        },
        {
            $project: {
                _id: 0,
                first_name: 1,
                email: 1
            },
        },
    ]);
}


exports.getHippoLearnersData = () => {
    let query = isbusers.find(
            {
                "email": {$regex: "isb|emeritus"}
                    
            },
            { _id:1, first_name:1, last_name:1,email:1});
    return query;
  }

  exports.revokeaccess = (user_id,changeaccess) => {
    return isbusers.updateOne({ _id: mongoose.Types.ObjectId(user_id) }, { $set: { is_banned:changeaccess} });
   };

exports.UpdateUserEmail=(existing_email,new_email)=>{
    return isbusers.updateOne({email: existing_email}, { $set: {email:new_email } } )
}

exports.getUserDetailsByListofEmails = (emails) => {

    return isbusers.aggregate([
        {
            $match: {
                email: {
                    $in: emails,
                },
            },
        },
        {
            $group: {
                _id: null,
                user_ids: {
                    $push: {
                        $toString: "$_id",
                    },
                },
            },
        }
    ]);

}

exports.getUserDetailsByListofEmailsforItaAttendance = (emails) => {

    return isbusers.aggregate([
        {
            $match: {
                email: {
                    $in: emails,
                },
            },
        },
        {
            $group: {
                _id: null,
                user_ids: {
                    $push: {
                       _id: {$toString: "$_id"},
                        email: "$email"
                    },
                },
                user_emails :{
                    $push: {
                        $toString: "$email",
                    },
                },
            },
            
        },
        {
            $project: {
                user_ids:1,
                non_users: {
                    $setDifference: [emails, '$user_emails']
                },
                _id: 0
            }
        }
    ]);

}

function validateIsbUserLoginData(data) {
    const schema = Joi.object({
        email: Joi.string().trim().required().email(),
        password: Joi.string().trim().required(),
    });
    
    return schema.validate(data);
}

exports.validateIsbUserLoginData=validateIsbUserLoginData;

function validateVerizonData(data){
    const schema= Joi.object({
        id:Joi.objectId().required(),
        first_name: Joi.string().trim().required(),
        is_verizon_student: Joi.number().required(),
    });
    
    return schema.validate(data);
}
exports.validateVerizonData = validateVerizonData;