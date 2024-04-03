let ProgrammesController = require('./controllers/programmes.controller');

let { authorizeAdmin }  = require('../middleware/authenticateadmin');

const {authenticate}  = require('../middleware/authenticate');

exports.routesConfig = (app) => {

    app.post('/create_program',
        ProgrammesController.saveProgram
    );

    app.post('/save_program', authorizeAdmin,
        ProgrammesController.createProgram
    );


    app.post('/get_programs_list',
        ProgrammesController.getProgrammes
    );

    app.post('/get_programes_for_admin', authorizeAdmin,
    ProgrammesController.getProgramsForAdmin
    );

    app.post('/get_program_data_by_id',
    ProgrammesController.getProgramDataById
    );

    app.post('/get_program_data_id', authorizeAdmin,
    ProgrammesController.getProgramDataId
    );
    
    app.post('/update_program_status',
    ProgrammesController.updateProgramStatus
    );

    app.post('/update_program_details', authorizeAdmin,
    ProgrammesController.updateProgramDetails
    );

    app.post('/add_courses_into_programs',
    ProgrammesController.addCoursesinPrograms
    );

    app.post('/create_custom_program',
        ProgrammesController.createCustomProgram
    );

    app.post('/save_custom_program', authorizeAdmin,
        ProgrammesController.saveCustomProgram
    );

    app.post('/get_courses_details_for_program', authorizeAdmin,
        ProgrammesController.getCoursesDetailsForProgram
    );

    app.post('/find_unique_program_code', authenticate,
        ProgrammesController.findUniqueProgramCode
    );

    app.post('/get_program/learningtrack_id/program_id',
    ProgrammesController.getProgrammesByLearningTrakandProgramId
);
}