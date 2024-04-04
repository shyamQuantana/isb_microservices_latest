

const ProgramApplicationController = require('./controllers/program_application.controllers');
const CronJob = require('node-cron')
exports.routesConfig = (app) => {
    app.post('/api/user/program/application/approve',
    ProgramApplicationController.approveApplication
);

app.post('/api/user/program/send/reminder',
ProgramApplicationController.sendEmailReminders
);
}
//it will run for every 7 minutes
// CronJob.schedule(
//     '*/7 * * * *',
//     () => {
//         ProgramApplicationController.sendEmailReminders()
//     },
//     {
//       scheduled: true,
//       timezone: 'Asia/Kolkata'
//     }
// )
