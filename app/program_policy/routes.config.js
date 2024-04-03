let ProgramPolicyController = require('./controllers/program_policy.controller');

let { authorizeAdmin }  = require('../middleware/authenticateadmin');

const {authenticate}  = require('../middleware/authenticate');

exports.routesConfig = (app) => {

    
    app.post('/program_policy/save_program_policy', authorizeAdmin,
        ProgramPolicyController.saveProgramPolicy
    );

    app.post('/program_policy/get_program_policy', authorizeAdmin,
        ProgramPolicyController.getProgramPolicyDetails
    );


   
}