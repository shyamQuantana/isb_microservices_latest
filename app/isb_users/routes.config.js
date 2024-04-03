
const IsbUserController = require('./controllers/isb_user.controller');
let { authorizeAdmin }  = require('../middleware/authenticateadmin');
let {authenticate}  = require('../middleware/authenticate');
const multerAWSFileUpload = require('../utilities/multer_file_upload');

exports.routesConfig = (app) => {

    app.post('/create/isb/user/course_create', authenticate,
    IsbUserController.createUserCourse
    );

    app.post('/login/isb/user',
    IsbUserController.loginUser
    );  
       
    app.post('/isb/user/forget_password',
    IsbUserController.userPasswordReset
    );    

    // app.post('/user/get_activity_heat_map_data',
    // IsbUserController.userActivityHeatMapData
    // );

    app.post('/user/get_activity_heat_map_data',
    IsbUserController.newuserActivityHeatMapData
    );

    app.post('/isb/user/find_user',
    IsbUserController.FindUserByEmail
    ); 
       
    app.post('/isb/user/update_user_details',
    IsbUserController.UpdateUserDetails
    );  

    app.post('/isb/user/get_user_details', 
    IsbUserController.getUserDetails
    );  

    app.post('/isb/user/reset_password_email',
    IsbUserController.resetPasswordEmail
    );
    
    app.post('/isb/user/reset_password',
    IsbUserController.resetPassword
    );  

    app.post('/isb/user/update_missing_user_data',
    IsbUserController.updateMissingUserData
    ); 

    app.post('/isb/user/refreshtoken', authenticate,
    IsbUserController.refreshtoken
    );

    app.post('/isb/user/logout', authenticate,
     IsbUserController.logout
     ); 

    app.post('/isb/user/get_user_information', 
        IsbUserController.getUserInformation
     ); 

    app.get('/isb/user/get_users', authorizeAdmin,
        IsbUserController.getUsers
     ); 

    app.post('/isbx/login_user',
        IsbUserController.isbXLoginUser
    );

    app.post('/isbx/verify_otp',
        IsbUserController.verifyUserOTP
    ); 
    
    app.post('/isbx/user_profile_update', multerAWSFileUpload.single('user_profile'),
        IsbUserController.userProfileUpdate
    );

    app.post('/isbx/logout',
        IsbUserController.logoutUser
    );
    
    app.post('/isb/user/update_verizon_student_details', authenticate,
    IsbUserController.UpdateVerizonStudentDetails
    );  
   
}

