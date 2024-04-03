

const ProgramApplicationController = require('./controllers/program_application.controllers');

exports.routesConfig = (app) => {
    app.post('/api/user/program/application/approve',
    ProgramApplicationController.approveApplication
);
}