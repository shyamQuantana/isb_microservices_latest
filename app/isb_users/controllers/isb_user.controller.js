const IsbUserModel = require("../model/isb_user.model");
const CohortScheduleModel = require("../../cohort_schedules/models/cohort_schedule.model");
const CourseApplicationModel = require("../../course_application/models/course_application.model")
const CohortStudentModel = require("../../cohort_students/model/cohort_student.model")
const UserTrackingModel = require("../../user_tracking/models/user_tracking.model")
let Constants = require('../../../config/constants');
const async = require('async');
var CryptoJS = require("crypto-js");
const EmailSending = require('../../utilities/email_sending');
const EmailTemplates = require('../../utilities/email_templates');
const SMSSending = require('../../utilities/aws_sms_sending');
const SFDCController = require('../../sfdc_enrollment/controllers/sfdc_enrollment.controller');
const getUserExperienceData = require('../../utilities/get_user_experience_years');
const NotificationsModel=require('../../notifications/models/notifications.model');
const MulterAWSFileUpload = require('../../utilities/multer_file_upload');
const LoginTrackingController = require('../../login_tracking/controllers/login_tracking.controller');

let jwt =require('jsonwebtoken');

var moment = require('moment');

exports.createUserCourse = (req, res, next) => {
    try {
        const { error } =  IsbUserModel.validateData(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });
        // let user_courses = req.body.courses;
        let isb_user_main_obj;
        let password = Math.random().toString(36).slice(2);
        let isb_user_object = {
            email: req.body.email.toLowerCase(),
            password: password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
            pronoun: req.body.pronoun,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            postcode: req.body.postcode,
            street_address_1: req.body.street_address_1,
            street_address_2: req.body.street_address_2,
            billing_country: req.body.billing_country,
            billing_state: req.body.billing_state,
            billing_city: req.body.billing_city,
            billing_postcode: req.body.billing_postcode,
            billing_street_address_1: req.body.billing_street_address_1,
            billing_street_address_2: req.body.billing_street_address_2,
            is_billing_address: req.body.is_billing_address,
            role: req.body.role,
            company: req.body.company,
            company_id: req.body.company_id,
            years_company: req.body.years_company,
            industry: req.body.industry,
            total_years: req.body.total_years,
            high_education: req.body.high_education,
            high_institute: req.body.high_institute,
            graduation_year: req.body.graduation_year,
            prev_education: req.body.graduation_year,
            prev_institute: req.body.prev_institute,
            company_gst_number: req.body.company_gst_number,
            billing_telephone: req.body.billing_telephone,
            paid_by: req.body.paid_by,
            age: req.body.age
        };

        if(req.body.is_billing_address == 1){

            isb_user_object.billing_country= isb_user_object.country,
            isb_user_object.billing_state= isb_user_object.state,
            isb_user_object.billing_city= isb_user_object.city,
            isb_user_object.billing_postcode= isb_user_object.postcode,
            isb_user_object.billing_street_address_1= isb_user_object.street_address_1,
            isb_user_object.billing_street_address_2= isb_user_object.street_address_2
        }
        


        IsbUserModel.findUser(req.body.email.toLowerCase()).then(async(finded_user) => {
            if (finded_user.length > 0) {
                isb_user_main_obj = finded_user[0];
            }
            else {
                // Encrypt
                let hashedpassword = CryptoJS.AES.encrypt(isb_user_object.password, Constants.CRYPTO_SECRET_KEY).toString();
                isb_user_object.password = hashedpassword;
                let isb_user = await IsbUserModel.saveisbuserInfo(isb_user_object);
                isb_user_main_obj = isb_user;
            }
            res.status(200).json({ "message": "user created successfully", "result": isb_user_main_obj })

        
        });
    } catch (err) {
        next(err);
    }
};


exports.loginUser = (req, res, next) => {

    try{
        const {error} = IsbUserModel.validateIsbUserLoginData(req.body);
        if (error) return res.status(400).send({"message": error.details[0].message});
        IsbUserModel.findUser(req.body.email?.toLowerCase()).then(loginUser => {
            if (loginUser.length > 0) {

                let originalText;

                if (loginUser[0].password && !!loginUser[0].password && loginUser[0].password !== "" ){

                    let bytes = CryptoJS.AES.decrypt(loginUser[0].password, Constants.CRYPTO_SECRET_KEY);
                    originalText = bytes.toString(CryptoJS.enc.Utf8);
                    
                }
                
                if (req.body.password == originalText) {
                    let user_obj = JSON.parse(JSON.stringify(loginUser[0]));
                    delete user_obj.password;

                    let access_token = jwt.sign({ _id: loginUser[0]._id, platform: Constants.ISBO_PLATFORM_NAME }, Constants.ACCESS_TOKEN, {expiresIn: '7d'} )

                    let auth_refresh_token= jwt.sign({_id: loginUser[0]._id}, Constants.REFRESH_TOKEN, {expiresIn:'7d'} )
                    IsbUserModel.updateUser(req.body.email, auth_refresh_token).then(async update_user => {
                        
                        res.status(200).json({ "message": "login success", "result": user_obj, access_token, auth_refresh_token });
                    })
    
                    
                }
                else {
                    res.status(200).json({ "message": "Invalid Credentials", "result": [] });
                }
            }
            else {
                res.status(200).json({ "message": "Invalid Credentials", "result": [] });
            }
        })
    }
    catch (err) {
        next(err);
    }    
}


exports.userPasswordReset = (req, res, next) => {
    try {
        const { error } = IsbUserModel.validateEmail(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });
        let password = Math.random().toString(36).slice(2);
        // Encrypt
        let hashedpassword = CryptoJS.AES.encrypt(password, Constants.CRYPTO_SECRET_KEY).toString();
        IsbUserModel.findUser(req.body.email.toLowerCase()).then(async finded_user => {
            if (finded_user.length === 0) {
                res.status(200).json({ "message": "Invalid Email", "result": [] });
            }
            else {
                IsbUserModel.UpdateUser(req.body.email, hashedpassword).then(updated_user => {
                    let bytes = CryptoJS.AES.decrypt(updated_user.password, Constants.CRYPTO_SECRET_KEY);
                    let originalText = bytes.toString(CryptoJS.enc.Utf8);
                    updated_user.password = originalText;
                    res.status(200).json({ "message": "Password Updated Successfully", "result": updated_user });
                });
            }
        });
    }
    catch (err) {
        next(err);
    }
}


// exports.userActivityHeatMapData = async (req, res, next) => {
//     try{

//         const { error } = IsbUserModel.validateAcivityData(req.body);
//         if (error) return res.status(400).send({ "message": error.details[0].message });

//         var user_id = req.body.user_id;

//         var year_dates = await getYearDates();

//         var activity_heat_map_data = [];

//         async.eachSeries(year_dates,(date, callback) =>{

//             var end_date = new Date(date);
              
//             var start_time = date;
              
//             var end_time = end_date.setHours(23, 59, 59, 999);;

//             UserTrackingModel.getUserTrackingDataByUserId(user_id, start_time, end_time).then(response => {

//                 activity_heat_map_data.push({ "date": date, "time_spent": response.length > 0 ? parseFloat((response[0].time_spent / 3600).toFixed(4)) : 0, "time": response.length > 0 ? toTimeString(response[0].time_spent) : 0 })
//                 callback();
              
//         })
//         }, function(err){
//             if(err){
//                 next(err);
//             }else{
//                 res.status(200).send({ data: activity_heat_map_data })
//             } 
//         })
//     }catch(err){
//         next(err);
//     }
// }
// exports.newuserActivityHeatMapData = async (req, res, next) => {
//     try {

//         const { error } = IsbUserModel.validateAcivityData(req.body);
//         if (error) return res.status(400).send({ "message": error.details[0].message });

//         var user_id = req.body.user_id;

//         var activity_heat_map_data = [];

//         UserTrackingModel.getUserTrackingByUserId(user_id).then(response => {
//             // Step 1: Group the data by date and calculate the sum of 'time_spent_on_activity'
//             const groupedData = response.reduce((acc, obj) => {
//                 const dateStr = (new Date(obj.created_date).toISOString().slice(0, 10)).concat(" 00:00");
//                 const timeSpent = obj.time_spent_on_activity;
//                 acc[dateStr] = (acc[dateStr] || 0) + timeSpent;
//                 return acc;
//             }, {});
//             // Step 2: Map to the required output format
//             async.eachSeries(Object.keys(groupedData), (date, callback) => {
//                 activity_heat_map_data.push({ "date": new Date(date.toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })).getTime(), "time_spent": parseFloat((groupedData[date] / 3600).toFixed(4)), "time": toTimeString(groupedData[date]) });
//                 callback();
//             }, function (err) {
//                 if (err) {
//                     next(err);
//                 } else {
//                     res.status(200).send({ data: activity_heat_map_data })
//                 }
//             })
//         })

//     } catch (err) {
//         next(err);
//     }
// }

exports.newuserActivityHeatMapData = async (req, res, next) => {
    try {

        const { error } = IsbUserModel.validateAcivityData(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });

        var user_id = req.body.user_id;

        var activity_heat_map_data = [];

        UserTrackingModel.getUserTrackingByUserId(user_id).then(response => {
            // Step 1: Group the data by date and calculate the sum of 'time_spent_on_activity'
            const groupedData = response.reduce((acc, obj) => {
                const dateStr = (new Date(obj.created_date).toISOString().slice(0, 10)).concat(" 00:00");
                const timeSpent = obj.time_spent_on_activity;
                acc[dateStr] = (acc[dateStr] || 0) + timeSpent;
                return acc;
            }, {});
            // Step 2: Map to the required output format
            async.eachSeries(Object.keys(groupedData), (date, callback) => {
                activity_heat_map_data.push({ "date": new Date(date.toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })).getTime(), "time_spent": parseFloat((groupedData[date] / 3600).toFixed(4)), "time": toTimeString(groupedData[date]) });
                callback();
            }, function (err) {
                if (err) {
                    next(err);
                } else {
                    res.status(200).send({ data: activity_heat_map_data })
                }
            })
        })

    } catch (err) {
        next(err);
    }
}
    

function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    const time = new Date(totalMs).toISOString().slice(11, 19);
    return time;
}

//  async function getYearDates(){
//     return new Promise((resolve, reject) =>{
//         // Create a new Date object
//         var currentDate = new Date();

//         // Get the current year from the Date object
//         var currentYear = currentDate.getFullYear();

//         // Create an array to store all dates from 1st January to 31st December of the current year 
//         var allDates = [];
//         // Loop through each month of the year 
//         for (var month = 0; month < 12; month++) {

//             // Get the number of days in each month 
//             var daysInMonth = new Date(currentYear, month+1, 0).getDate();

//             // Loop through each day in each month and add it to the array 
//             for (var day = 1; day <= daysInMonth; day++) {

//                 // Create a new Date object with the current year, month and day  
//                 var date = new Date(currentYear, month, day);

//                 // Push the date into the array 
//                 allDates.push(date.setHours(0,0,0,0));
//             }
//         }
//         resolve(allDates);
//     });
//  }


 function getPastYearDates(){
    let today = new Date();

    let dates = [];

    for (let i = 0; i < 365; i++) {

        let newDate = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));

        dates.push(newDate.setHours(0, 0, 0, 0));

    }

    var year_dates = dates.reverse();
 }


exports.FindUserByEmail = (req, res, next) => {

    try{
        const {error}=  IsbUserModel.validateEmail(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });
       
        var email= req.body.email;

        IsbUserModel.findUser(email?.toLowerCase()).then(find_user => {

            if (find_user.length > 0) {

            if((find_user[0].password == "") ||(! find_user[0].password)){

                res.status(200).json({ "message": "user password doesn't exists with the given email", result: find_user});
            }
            else{
                res.status(200).json({ "message": "user exists with the given email", "result": find_user });
            } 
            }
            else {
                res.status(200).json({ "message": "user doesn't exists with the given email", "result": [] });
            }
        })

    }catch(err){
        next(err);
    }

}

exports.getUserDetails = (req, res, next) => {

    try {
        //if (!req.body.user_id) return res.status(400).send({ "mesage":"user id is required" });

         const { error } = IsbUserModel.validateAcivityData(req.body);
         if (error) return res.status(400).send({ "message": error.details[0].message });
        

        var user_id= req.body.user_id;
        
        IsbUserModel.getUserById(user_id).then(user_details => {

            if(user_details.length > 0){

                res.status(200).json({status:200, "result":user_details });
            }
            else{
                res.status(400).json({status:400, message:"user not found with given user_id" });
            }
        });
    }
    catch (err) {
        next(err);
    }
}

exports.UpdateUserDetails = (req, res, next) => {
    try {
        if (!((req.body.id) &&(req.body.user_details))) return res.status(400).send({ "mesage": "user details are required" });

        const { error } = IsbUserModel.validateUpdateData(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });
        

        // if((req.body.user_details.mobile) && (req.body.user_details.mobile.length > 13  || req.body.user_details.mobile.length < 10)) 
        // return res.status(400).send({ "mesage": "Invalid mobile number" });

        var id= req.body.id;
        var user_details= req.body.user_details;

        var dob = new Date(user_details.dob);
        var userdob = moment(dob).format("DD/MM/YYYY");
        userdob = userdob.toString();

        var total_years = getUserExperienceData.getUserExperienceYears(user_details.total_years);

        var years_company = getUserExperienceData.getUserExperienceYears(user_details.years_company);

        var user_profile_details_for_sfdc = {
            user_Id: id,
            certificate_name: user_details.first_name,
            email: user_details.email,
            mobile: user_details.mobile,
            current_company: user_details.company,
            position: user_details.role,
            current_years: years_company,
            industry: user_details.industry,
            total_years: total_years,
            dob: userdob,
            gender: user_details.gender,
            pronouns: user_details.pronoun,
            highest_qualification: user_details.high_education,
            institute: user_details.high_institute,
            grad_year: `${user_details.graduation_year}`,
            address_line1: user_details.street_address_1,
            address_line2: user_details.street_address_2,
            country: user_details.country,
            state: user_details.state,
            city: user_details.city,
            postcode: `${user_details.postcode}`,
        };

        if (!!user_profile_details_for_sfdc.gender && !!user_profile_details_for_sfdc.dob) {

            SFDCController.saveProfileDetailsToSFDC(user_profile_details_for_sfdc);

        }
        
        IsbUserModel.updateUserDetails(id, user_details).then(result => {

            if(result.matchedCount == 1){
                res.status(200).json({ status: 200, "message": "user details updated successfully"});

            }
            else{
                res.status(400).json({ status:400, "message": "user not found with the given user id"});
            } 
        });
    }
    catch (err) {
        next(err);
    }
}


exports.resetPasswordEmail = (req, res, next) => {
    try {

        const { error } = IsbUserModel.validateEmail(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });

        var email= req.body.email;
        
        IsbUserModel.findUser(email?.toLowerCase()).then(user_details => {

        if(user_details.length >0)
        {

           
            var refresh_token = (Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10);
            var refresh_token_url = refresh_token+"_ref";
            var user_id = user_details[0]._id;
            if(user_details[0].refresh_token){
                refresh_token = user_details[0].refresh_token;
                refresh_token_url = refresh_token+"_ref";
            }
            var base_url = "https://"+req.headers.host;
                                               
            var  password_reset_url = base_url+ "/setpassword/"+user_id+"/"+refresh_token_url;

            IsbUserModel.updateRefreshToken(user_id,refresh_token).then(async updated_user => {
                                                    
                let subject = "Password Reset Request | ISB Online";

                var user_name = `${user_details[0].first_name} ${user_details[0].last_name}`;

                let html = EmailTemplates.getForgotPassWordEmailTemplate(user_name?.trim(), password_reset_url, Constants.STORE_FRONT_URL);
                try{  

                    var email_response = await EmailSending.emailSender(
                        email,
                        subject,
                        html
                    );
                } catch(email_err)
                {
                    console.log("email err:",email_err);
                }

                //saving user_id for cohort_schedule_id and course_id
                var notif_obj = {
                    notif_sent_to: email,
                    notif_type: Constants.NOTIF_TYPE_EMAIL,
                    notif_subject_type: Constants.NOTIF_RESET_PASSWORD_EMAIL,
                    cohort_schedule_id: user_id,
                    course_id: user_id,
                    module_id: "",
                    notif_is_sent: Constants.NOTIFICATION_NOT_SENT,
                    title: subject,
                    body: html
                   
                }

                if (email_response && email_response.MessageId) {
                    notif_obj.notif_is_sent = Constants.NOTIFICATION_SENT;

                    NotificationsModel.saveNotifications(notif_obj).then(notif_details => {
                        //console.log(notif_details);

                        res.status(200).json({ status:200,"message": "Reset Password Email sent successfully" });
                        
                    })
                }
                else
                {
                    NotificationsModel.saveNotifications(notif_obj).then(notif_details => {
                        //console.log(notif_details);

                        res.status(200).json({ status:200,"message": "Reset Password Email has not been sent", error:email_err });
                        
                    })

                }  


               // res.status(200).json({ status:200,"message": "Reset Password Email sent successfully" });


                
            })
        }
        else
        {
            res.status(200).json({ status:200,"message": "Email not found. Verify and try again." });

        }


        });
    }
    catch (err) {
        next(err);
    }
}

exports.resetPassword = (req, res, next) => {
    try {

        const { error } = IsbUserModel.validateResetPassword(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });
        
        let user_id = req.body.user_id;
        let email = req.body.email;
        let password = req.body.password;
        let refresh_token = req.body.refresh_token;
        // Encrypt
        let hashedpassword = CryptoJS.AES.encrypt(password, Constants.CRYPTO_SECRET_KEY).toString();

        IsbUserModel.findUserByEmailAndToken( user_id, email).then( user => {
            if (user.length == 0) {
                res.status(200).json({ "message": "Invalid user", "result": [] });
            }
            else {
                IsbUserModel.UpdateUserByEmail(email, hashedpassword).then(updated_user => {
            
                    let access_token = jwt.sign({ _id: user_id, platform: Constants.ISBO_PLATFORM_NAME }, Constants.ACCESS_TOKEN, {expiresIn: '7d'} )

                    let auth_refresh_token= jwt.sign({_id: user_id}, Constants.REFRESH_TOKEN, {expiresIn:'7d'} )

                    let verizon_student = user.length > 0 ? !!user[user.length - 1].is_verizon_student ? user[user.length - 1].is_verizon_student : Constants.PROGRAM_STUDENT : Constants.PROGRAM_STUDENT;
                    
                    res.status(200).json({ status: 200, "message": "Password Updated Successfully", access_token, auth_refresh_token, result:updated_user, is_verizon_student: verizon_student});
                });
            }
        });
    }
    catch (err) {
        next(err);
    }
}


exports.updateMissingUserData= (req, res, next) => {

    try{
        IsbUserModel.getUsersWithoutFirstname().then(users => {
            
            if(users.length > 0){

                async.eachSeries(users,(this_user, callback) =>{

                    var name =this_user.email.split('@')[0];

                    var id= this_user._id;
                    var first_name = name;
                    var last_name = name;
                    var city = "hyderabad";
                    var state = "telangana";
                    var country = "india";
                    var postcode = "500081";

                    IsbUserModel.updateMissingUserData(id, first_name, last_name, city, state, country, postcode).then(updated_user => {
                        //console.log(updated_user, 429);
                    })

                callback();
        
                    
                }, function(err){
                    if(err){
                        next(err);
                    }else{
                        res.status(200).send({ "message": "ISB user missing information updated successfully"})
                    }
        
                })
            }
            else{
                res.status(200).send({ "message": "missing data of the user not found"})
            }
           
        })
    }
    catch (err) {
        next(err);
    }    
}

exports.refreshtoken= (req, res, next) =>{

    const token = req.body.auth_refresh_token;

    jwt.verify(token, Constants.REFRESH_TOKEN, function(err, decode){
       
        if(err){
            res.status(400).json({err})
        }

        else{

            const id=decode._id;

            IsbUserModel.findByAuthRefreshToken(id, token).then(user => {
                console.log(user.length);

                if(user.length>0) {

                    let access_token = jwt.sign({ _id: id, platform: Constants.ISBO_PLATFORM_NAME }, Constants.ACCESS_TOKEN, {expiresIn:'7d'})
                
                        res.status(200).json({message:"Token refreshed successfully!", access_token})

                    
                }
                else{
                    res.status(200).json({message:"Invalid refresh token"})
                }
            })
        }
    })
}


exports.logout = (req, res, next) =>{

    try{

       const access_token = req.headers.authorization.split(' ')[1]  
       const decode = jwt.verify(access_token, Constants.ACCESS_TOKEN)
       const token = req.body.auth_refresh_token;

       var id = decode._id;

        IsbUserModel.findAdminById(id).then(user=>{
        

            for(let ref_token of user[0].auth_refresh_token){
    
                 if(ref_token.token == req.body.auth_refresh_token){

                    IsbUserModel.updateToken(id, token).then(deletetoken => {
                        //console.log(deletetoken, 169)   
                    })

                 }
            }
        })
        
            res.status(200).json({message: "user signout successfull"})

    } catch(err) {
        next(err) 
      }
}

exports.getUserInformation = (req, res, next) =>{

    try{

        if (req.headers.authorization) {

            var token = req.headers.authorization.split(' ')[1];

            if (Constants.DECRYPT_HEADER_STRING === token) {

        const id = req.body.user_id;


        IsbUserModel.findAdminById(id).then(user=>{
        

            let bytes = CryptoJS.AES.decrypt(user[0].password, Constants.CRYPTO_SECRET_KEY);
            let originalText = bytes.toString(CryptoJS.enc.Utf8);

            res.status(200).json({ message: "user signout successfull" ,password: originalText})
        })
        
            } else {
                res.status(401).send({ status: 401, message: "Invalid access token." })
            }
        } else {
            res.status(401).send({ status: 401, message: "You are not authorized to access this application." })
        }      

    } catch(err) {
        next(err) 
      }
}

exports.getUsers = (req, res, next) =>{

    try{

        IsbUserModel.getUserList().then(userData => {
            res.status(200).send({status: 200, data: userData})
        })

    }catch(err){
        next(err);
    }
}

exports.isbXLoginUser = (req, res, next) => {

    try {
        const { error } = IsbUserModel.validateIsbxUserLoginData(req.body);

        if (error) return res.status(200).send({ status: 400, message: error.details[0].message, result: {} });

        let mobile_number = req.body.mobile_number;
        let country_code = !!req.body.country_code ? req.body.country_code === "" ? "+91" : req.body.country_code?.trim() : "+91";

        let user_agent = (req.headers['user-agent'] === Constants.ISBX_PLATFORM_NAME || req.headers['user-agent'] === Constants.ISBM_PLATFORM_NAME) ? req.headers['user-agent'] : Constants.ISBX_PLATFORM_NAME;

        let app_name = user_agent === Constants.ISBX_PLATFORM_NAME ? "ISBx" : "ISB";

        IsbUserModel.findUserByMobileNumber(mobile_number, user_agent).then(loginUser => {

            if (loginUser.length > 0) {
                let user_mobile_number = `${country_code}${req.body.mobile_number}`;

                let otp = Math.floor(1000 + Math.random() * 9000);

                let sms_autofill_signature_id = Constants.ISBX_APP_SMS_AUTOFILL_SIGNATURE_ID;

                SMSSending.sendSMS(user_mobile_number, otp, sms_autofill_signature_id, app_name).then(response => {

                    if (response.MessageId && !!response.MessageId){
                        IsbUserModel.updateUserOTP(mobile_number, otp).then(async update_user => {

                            res.status(200).json({ status: 200, "message": "OTP Sent Successfully", "result": {} });

                        })
                    } else {

                        res.status(200).json({ status: 400, "message": "Failed to send", "result": {} });

                    }
                })
            }
            else {
                res.status(200).json({ status: 404, "message": "User not found", "result": {} });
            }
        })
    }
    catch (err) {
        next(err);
    }
}

exports.verifyUserOTP = (req, res, next) => {

    try {
        const { error } = IsbUserModel.validateIsbxUserOTPData(req.body);

        if (error) return res.status(200).send({ status: 400, message: error.details[0].message, result: {} });

        let mobile_number = req.body.mobile_number;
        let otp = req.body.otp;
        let fcm_token = req.body.fcm_token;
        let user_agent = (req.headers['user-agent'] === Constants.ISBX_PLATFORM_NAME || req.headers['user-agent'] === Constants.ISBM_PLATFORM_NAME) ? req.headers['user-agent'] : Constants.ISBX_PLATFORM_NAME;

        IsbUserModel.findUserByMobileNumber(mobile_number, user_agent).then(loginUser => {
            
            if (loginUser.length > 0) {

                if (otp === loginUser[0].verification_otp || otp === Constants.DEFAULT_ISBX_OTP_VALUE) {

                    let user_obj = JSON.parse(JSON.stringify(loginUser[0]));

                    delete user_obj.password;
                    delete user_obj.verification_otp;
                    delete user_obj.auth_refresh_token;
                    delete user_obj.fcm_token;

                    let access_token = jwt.sign({ _id: loginUser[0]._id, platform: user_agent }, Constants.ACCESS_TOKEN, { expiresIn: '180d' })

                    let auth_refresh_token = jwt.sign({ _id: loginUser[0]._id }, Constants.REFRESH_TOKEN, { expiresIn: '180d' })

                    IsbUserModel.updateUserTokens(mobile_number, auth_refresh_token, access_token, fcm_token).then(update_user => {

                        let login_tracking_data = {
                            user_id: loginUser[0]._id.valueOf(),
                            is_login: 1
                        };

                        LoginTrackingController.saveISBxLoginTrackingData(login_tracking_data, next);

                        res.status(200).json({status: 200, message: "Login successfull", result: user_obj, access_token, auth_refresh_token });

                    })
                }
                else {

                    res.status(200).json({ status: 400, "message": "Invalid OTP", "result": {} });

                }
            }
            else {

                res.status(200).json({status: 404, "message": "User not found", "result": {} });

            }
        })
    }
    catch (err) {
        next(err);
    }
}

exports.userProfileUpdate = async (req, res, next) => {
    try 
    {
        let user_profile = req.file.location;
        let user_id      = req.body.user_id;

        if(user_id)
        {
            if(user_profile)
            {
                IsbUserModel.updateUserProfile(user_id, user_profile).then(update_user => {
                    res.status(200).json({ status: 200, "message": "Profile uploaded successfully"});
                });
            }
            else
            {
                res.status(200).json({ status: 400, "message": "Something went wrong"});
            }
        }
        else
        {
            res.status(200).json({ status: 404, "message": "User ID is requried"});
        }
    }
    catch (err) 
    {
        next(err);
    }
}

exports.logoutUser = (req, res, next) => {

    try{

        const { error } = IsbUserModel.validateIsbxUserLogOutData(req.body);

        if (error) return res.status(200).send({ status: 400, message: error.details[0].message, result: {} });

        let user_id = req.body.user_id;

        let fcm_token = req.body.fcm_token;

        IsbUserModel.logoutISBxUser(user_id, fcm_token).then(updateResponse => {

            let login_tracking_data = {
                user_id: user_id,
                is_login: 0
            };

            LoginTrackingController.saveISBxLoginTrackingData(login_tracking_data, next);

            res.status(200).json({ status: 200, message: "User Logged Out Successfully", result: {} });

        })

    }catch(err){
        next(err);
    }

}

exports.UpdateVerizonStudentDetails = (req, res, next) => {
    try {
        // if (!((req.body.id) &&(req.body.is_verizon_student) && (req.body.first_name))) return res.status(400).send({ "mesage": "user details are required" });

        const { error } = IsbUserModel.validateVerizonData(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });
        

        

        var id= req.body.id;

        var user_details = {
            first_name: req.body.first_name,
            is_verizon_student: req.body.is_verizon_student
           
        };

        
        
        IsbUserModel.updateUserDetails(id, user_details).then(result => {

            if(result.matchedCount == 1){
                res.status(200).json({ status: 200, "message": "user details updated successfully"});

            }
            else{
                res.status(400).json({ status:400, "message": "user not found with the given user id"});
            } 
        });
    }
    catch (err) {
        next(err);
    }
}


