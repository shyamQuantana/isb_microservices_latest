
const ProgrammesModal = require('../models/programmes.model');

const LearningTracksModal = require('../../learning_tracks/model/learning_track.model')

const LessonsModal = require('../../lessons/models/lessons.model')

const CohortSchedulesController = require('../../cohort_schedules/controllers/cohort_schedule.controller')

const CohortSchedulesModal = require('../../cohort_schedules/models/cohort_schedule.model')

const ModuleSchedulesModal = require('../../module_schedules/models/modules_schedule.model')

const LessonsScheduleModel = require('../../lesson_schedules/models/lessons_schedule.model')

const CohortStudentsModel = require('../../cohort_students/model/cohort_student.model');

const ProgramApplicationsModel = require('../../program_applications/models/program_application.model');

const CoursesModel = require('../../courses/models/courses.model');

const ModulesModel = require('../../modules/models/modules.model');

const Constants = require('../../../config/constants');

const SFDCController = require('../../sfdc_enrollment/controllers/sfdc_enrollment.controller');

const CurrentDate = require('../../utilities/get_current_date');

const ProgramPolicyModel = require('../../program_policy/models/program_policy.model');

var moment = require('moment');
const { response } = require('../../../app');
const async = require('async');

exports.saveProgram = async (req, res, next) => {
    try{

        const { error } = ProgrammesModal.validate(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });

        var product_id;
        var program_cost;
        var learning_track_name;
        var end_date = 1234566;
        var start_date = req.body.start_date;
        var program_display_name;

        LearningTracksModal.getLearningTrackbyId(req.body.learning_track_id).then(learning_track =>{
            if(learning_track.length > 0){

                learning_track_name = learning_track[0].learning_track_name;
                program_cost = learning_track[0].cost;

                let learning_track_acronym = learning_track_name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')

                var date = moment();

                var currentDate = date.format('YYYYMMDDHHMMSS');

                product_id = `${currentDate}_${learning_track_acronym}`;

                var display_learning_track_name = learning_track_name.trim().replaceAll(" ", "_");

                var display_start_date = moment(start_date).format('YYYY_MM_DD');

                program_display_name = `ISBOnline_${display_learning_track_name}_${display_start_date}_open`;


                const programData = {
                    learning_track_id: req.body.learning_track_id,
                    product_id: product_id,
                    start_date: start_date,
                    end_date: end_date,
                    available_date: req.body.available_date,
                    program_orientation_date: req.body.program_orientation_date,
                    capacity: req.body.capacity,
                    program_cost: program_cost,
                    status: req.body.status,
                    internal_notes: req.body.internal_notes,
                    learning_track_name: learning_track_name,
                    courses: learning_track[0].courses,
                    program_display_name: program_display_name,
                    program_type: req.body.program_type,
                    program_certificate_name: learning_track_name
                };

                ProgrammesModal.saveProgrammes(programData).then(result => {

                    CohortSchedulesController.saveProgramCourseCohorts(result._id, start_date, req.body.available_date,learning_track[0].courses).then( response => {
                        // console.log("response",response)
                        ProgrammesModal.updateProgramEndDate(result._id, response).then(updateResponse => {

                            saveProgramToSFDC(result._id, product_id, learning_track_name, start_date, response, program_cost, program_display_name);

                            res.status(200).send({ status: 200, message: "Program created successfully", data: result })
                        })
                    });

                })

            }else{
                res.status(200).send({status: 200, message: "Learning Track with given Id is not found"})
            }

        });

       

    }catch(err){
        next(err);
    }

}


exports.createProgram = (req, res, next) =>{
    try {

        const { error } = ProgrammesModal.validateCreateProgramData(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });
        ProgrammesModal.getProgrammeByProductId(req.body.program_id).then(programee_details=>{
            if(programee_details.length>0){
                return res.status(200).send({'status':200,'message':'The given program name is already existed'})
            }else{
                var product_id;
                var program_cost;
                var learning_track_name;
                var program_display_name;
        
                LearningTracksModal.getLearningTrackbyId(req.body.learning_track_id).then(learning_track => {
                    if (learning_track.length > 0) {
        
                        learning_track_name = learning_track[0].learning_track_name;
                        program_cost = learning_track[0].cost;
        
                        let learning_track_acronym = learning_track_name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
        
                        var date = moment();
        
                        var currentDate = date.format('YYYYMMDDHHMMSS');
        
                        product_id = `${currentDate}_${learning_track_acronym}`;
        
                        var display_learning_track_name = learning_track_name.trim().replaceAll(" ", "_");
        
                        var display_start_date = moment(req.body.start_date).format('YYYY_MM_DD');
        
                        program_display_name = `ISBOnline_${display_learning_track_name}_${display_start_date}_open`;
        
                        const programData = {
                            learning_track_id: req.body.learning_track_id,
                            product_id: req.body.program_id ? req.body.program_id :product_id,
                            start_date: req.body.start_date,
                            program_orientation_date: req.body.program_orientation_date,
                            end_date: req.body.end_date,
                            available_date: req.body.available_date,
                            capacity: req.body.capacity,
                            program_cost: program_cost,
                            status: req.body.status,
                            internal_notes: req.body.internal_notes,
                            learning_track_name: learning_track_name,
                            courses: learning_track[0].courses,
                            program_display_name: program_display_name,
                            program_type: req.body.program_type,
                            program_certificate_name: learning_track_name
                        };
        
                        ProgrammesModal.saveProgrammes(programData).then(result => {

                            var program_result = result;
        
                            saveProgramToSFDC(result._id, programData.product_id, programData.learning_track_name, programData.start_date, programData.end_date, programData.program_cost, program_display_name);
        
                            var courses = req.body.courses;
        
                            async.eachSeries(courses, function (course, coursesCallback) {
        
                                var course_data = {
                                    course_id : course.course_id,
                                    start_date : course.start_date,
                                    available_date : req.body.available_date,
                                    course_end_date : course.end_date,
                                    end_date : course.end_date,
                                    is_enabled : true,
                                    program_id : result._id,
                                    course_name : course.course_name,
                                    course_cost : course.course_cost,
                                    course_created_date: course.start_date
                                };
        
                                CohortSchedulesModal.saveCohort(course_data).then(cohort_save_result => {
        
                                    var modules = [];
        
                                    async.eachSeries(course.modules, function (this_module, modulesCallback) {
        
                                        var this_module_details = {
                                            module_id: this_module.module_id,
                                            cohort_schedule_id : cohort_save_result._id,
                                            module_score : 0,
                                            start_date: this_module.start_date,
                                            end_date: this_module.end_date,
                                            title : this_module.title
                                        };
        
                                        modules.push(this_module_details);
                                        // module lessons
                                        LessonsModal.getModuleLessons(this_module.module_id).then(module_lessons => {
                                            var lessons = [];
                                            var quiz_lesson_id;
                                            async.eachSeries(module_lessons, function (this_lesson, lessonsCallback) {
                                                var this_lesson_details = {};
        
                                                this_lesson_details.lesson_id = this_lesson.lesson_id;
                                                this_lesson_details.cohort_schedule_id = cohort_save_result._id;
                                                this_lesson_details.module_id = this_lesson.module_id;
                                                this_lesson_details.start_date = this_module.start_date;
                                                this_lesson_details.end_date = this_module.end_date;
                                                lessons.push(this_lesson_details);
        
                                                if (this_lesson.title === Constants.QUIZ_NAME){
                                                    quiz_lesson_id = this_lesson.lesson_id;
                                                }
                                                lessonsCallback();
                                            }, function (err1) {
                                                if (err1) {
        
                                                    next(err1);
                                                }
                                                LessonsScheduleModel.saveLessons(lessons).then(result => {
        
                                                    if(quiz_lesson_id !== undefined){
                                                        LessonsModal.updateQuizLessonDuration(quiz_lesson_id, this_module.quiz_duration).then(updateResult =>{
                                                            modulesCallback();
                                                        })
                                                    }else{
                                                        modulesCallback();
                                                    }
                                                    
                                                });
                                            })
                                        });
        
                                    }, function (err1) {
                                        if (err1) {
                                            next(err1);
                                        }
        
                                        ModuleSchedulesModal.saveModuleSchedules(modules).then(result => {
                                                coursesCallback();
                                        });
        
                                    })
                                })
                            }, function (err) {
                                if (err) {
                                    next(err)
                                } else {
        
                                    res.status(200).send({ status: 200, message: "Program Created Successfully", program:program_result})
        
                                }
                            })
        
                        })
        
                    } else {
                        res.status(404).send({ status: 404, message: "Learning Track with given Id is not found" })
                    }
        
                });
            }
        })

    } catch (err) {
        next(err);
    }
}


exports.getProgrammes = async (req, res, next) => {
    try{

        const { error } = ProgrammesModal.validateGetProgramsData(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });

        ProgrammesModal.getProgrammesList(req.body.learning_track_id).then(programmesList => {
            
            res.status(200).send({status: 200,mesage: "Programmes list for the learning track", data: programmesList})

        })
       

    }catch(err){
        next(err);
    }

}

exports.getProgrammesByLearningTrakandProgramId = async (req, res, next) => {
    try {

        const { error } = ProgrammesModal.validateGetProgramsDataForLearningTrak(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });

        ProgrammesModal.getProgrammesListByLearningTrakAndProgramId(req.body.learning_track_id,req.body.program_id).then(programme => {

            res.status(200).send({ status: 200, mesage: "Programme for the learning track", data: programme })

        })


    } catch (err) {
        next(err);
    }

}


exports.getProgramsForAdmin = (req, res, next) => {
    try {

        const { error } = ProgrammesModal.validateGetProgramsForAdminData(req.body);

        if (error) return res.status(400).send({ message: error.details[0].message });

        var learning_track_id= req.body.learning_track_id;
        let total_learners=0;
        let active_learners=0;

        var today = CurrentDate.getAsiaKolkataDateTime();
      
        if(req.body.learning_track_id){

        LearningTracksModal.getLearningTrack(learning_track_id).then(learning_track => {
            // learning_track=learning_track[0].toJSON();
        
             ProgrammesModal.getProgrammes(learning_track_id).then(programmes => {

                learning_track.no_of_programs =programmes.length;

                let programes=[];

                async.eachSeries(programmes, function (this_programe, callback1) {

                    CohortSchedulesModal.getCohortScheduleByProgramId(this_programe._id).then(cohort_schedules => {

                        var cohort_ids = cohort_schedules.map(cohort => (cohort._id));
            
                        ProgramApplicationsModel.getApprovedProgramApplicationsCountByProgramId(this_programe._id).then(cohort_students => {
                        
                            total_learners = total_learners + cohort_students.length > 0 ? cohort_students[0].approved_applications_count : 0; 
                        
                            learning_track.total_learners= total_learners;
                
                            var this_programe_details = {
                                programme_id: this_programe._id,
                                learning_track_id: this_programe.learning_track_id,
                                available_date: this_programe.available_date,
                                learning_track_name: this_programe.learning_track_name,
                                start_date: this_programe.start_date,
                                end_date: this_programe.end_date,
                                status: this_programe.status,
                                learners_capacity: this_programe.capacity,
                                product_code: this_programe.product_id,
                                program_display_name: this_programe.program_display_name,
                                program_type: this_programe.program_type ? this_programe.program_type : Constants.PROGRAM_TYPE_LEARNING_TRACK,
                                no_of_learners: cohort_students.length > 0 ? cohort_students[0].approved_applications_count : 0,
                            };

                            programes.push(this_programe_details);
                            learning_track.programes= programes;

                            CohortStudentsModel.getActiveCohortStudentsByProgrameId(cohort_ids, this_programe._id, today).then(active_students => {

                                active_learners = active_learners +  active_students.length 
                                learning_track.active_learners= active_learners;
                
                            callback1();
                    
                            })
                        })
                    })
                
    
            }, function (err1) {
                if (err1) {
                    next(err1);
                }
                else{

                    res.status(200).send({status: 200, result: learning_track})
                    
                }

            
                })

             })

        });

        }
        else{

            ProgrammesModal.getAllProgrammes().then(programmes => {

                let programes=[];

                async.eachSeries(programmes, function (this_programe, callback1) {

                    CohortSchedulesModal.getCohortScheduleByProgramId(this_programe._id).then(cohort_schedules => {

                        var cohort_ids = cohort_schedules.map(cohort => (cohort._id));
                       
                        ProgramApplicationsModel.getApprovedProgramApplicationsCountByProgramId(this_programe._id).then(cohort_students => {
                        
                            var this_programe_details = {
                                programme_id: this_programe._id,
                                learning_track_id: this_programe.learning_track_id,
                                available_date: this_programe.available_date,
                                learning_track_name: this_programe.learning_track_name,
                                start_date: this_programe.start_date,
                                end_date: this_programe.end_date,
                                status: this_programe.status,
                                learners_capacity: this_programe.capacity,
                                product_code: this_programe.product_id,
                                program_display_name: this_programe.program_display_name,
                                program_type: this_programe.program_type ? this_programe.program_type : Constants.PROGRAM_TYPE_LEARNING_TRACK,
                                no_of_learners: cohort_students.length > 0 ? cohort_students[0].approved_applications_count : 0,
                            };

                            programes.push(this_programe_details);
                            
                            callback1();
                    
                        })

                    })    
                
    
            }, function (err1) {
                if (err1) {
                    next(err1);
                }
                else{

                    res.status(200).send({status: 200, result: programes})                
                }

    
                })
            })
        }

    } catch (err) {
        next(err)
    }
}


exports.getProgramDataById = (req, res, next) =>{
    try{
        
        const { error } = ProgrammesModal.validateGetProgramDataById(req.body);

    if (error) return res.status(400).send({ "mesage": error.details[0].message });

    var program_id = req.body.program_id;

        ProgrammesModal.getProgramDetailsByID(program_id).then(program_data => {
            
            if(program_data.length > 0){

                var program = program_data[0];

                var program_info = {
                    _id: program._id,
                    program_id: program.product_id,
                    start_date: program.start_date,
                    end_date: program.end_date,
                    available_date: program.available_date,
                    program_orientation_date: program.program_orientation_date,
                    program_cost: program.program_cost,
                    internal_notes: program.internal_notes,
                    capacity: program.capacity,
                    learning_track_name: program.learning_track_name,
                    learning_track_id: program.learning_track_id !== null ? program.learning_track_id._id : null,
                    status: program.status,
                    program_type: program.program_type,
                    courses: [],
                    installment_details: []
                };

                if(program.installment_details)
                {
                    program_info.installment_details = program.installment_details;
                }


                ProgramApplicationsModel.getProgramApplicationsByProgramID(program_id, req.body.user_id).then(program_applications_data => {

                    if(req.body.user_id){

                    //console.log(program_data[0].payment_date, "payment_date")
                        var date = program_applications_data.length > 0 ? new Date(program_applications_data[0].payment_date) : null;
                       
                        if(date !== null){
                        date.setHours(23, 59, 59, 0);

                        var timestamp = date.getTime();
                        program_info.payment_date = timestamp;

                        }else{

                            program_info.payment_date = null;

                        }
                        
                        
                    }
                    //console.log(program_info.payment_date);

                if(program.learning_track_id !== null){

                    var courses = program.courses;

                    async.eachSeries(courses, function(course, coursesCallback){

                        CohortSchedulesModal.getCohortByID(course.course_id,program._id).then(cohort_details =>{

                            var course_details = {};

                            if(cohort_details.length > 0){

                                var cohort_data = cohort_details[0];

                                course_details.course_id = cohort_data.course_id;
                                course_details.cohort_schedule_id = cohort_data._id;
                                course_details.course_name = cohort_data.course_name;
                                course_details.start_date = cohort_data.start_date;
                                course_details.end_date = cohort_data.end_date;
                                course_details.hard_end_date = cohort_data.course_end_date;
                                course_details.modules = [];

                                ModuleSchedulesModal.getModuleSchedulesByCohort(cohort_data._id).then(modules_data => {
                                    ModulesModel.getCourseModules(course.course_id).then(course_modules => {
                                        
                                        var course_module_ids = course_modules.map(module => (module._id.toString()));
                                        
                                    
                                    if(modules_data.length > 0){


                                        async.eachSeries(modules_data, function(module, modulesCallback){

                                            if(course_module_ids.indexOf(module.module_id._id.toString()) !== -1)
                                            {
                                               

                                                var module_details = {};

                                                module_details.module_id = module.module_id._id;
                                                module_details.module_schedule_id = module._id;
                                                module_details.module_name = module.module_id.module_title ? module.module_id.module_title : Constants.QUIZ_NAME;
                                                module_details.start_date = module.start_date;
                                                module_details.end_date = module.end_date;
                                                module_details.duration = module.module_id.duration;
                                                module_details.duration_units = module.module_id.duration_units;

                                                LessonsModal.getLessonQuizDuration(module.module_id._id, cohort_data.course_id).then(lessonDetails => {
                                                
                                                    if(lessonDetails.length > 0){
                                                        module_details.quiz_duration = lessonDetails[0].quiz_duration;

                                                        course_details.modules.push(module_details);

                                                        modulesCallback();
                                                    }else{
                                                        module_details.quiz_duration = 0;

                                                        course_details.modules.push(module_details);
                                                        modulesCallback();
                                                    }
                                                })

                                            }
                                            else
                                            {
                                                modulesCallback();

                                            }

                                        }, function(err){

                                            program_info.courses.push(course_details);
                                            coursesCallback();

                                        });

                                    }else{

                                        program_info.courses.push(course_details);
                                        coursesCallback();

                                    }
                                })
                                })

                            }else{

                                coursesCallback();

                            }
                        })

                    }, function(err){

                        if(err){
                            next(err)
                        }else{
                            res.status(200).send({ status: 200, mesage: "Program data", data: program_info })
                        }
                    })

                }else{

                    res.status(200).send({ status: 200, mesage: "Program data", data: program_info })

                }
            })

            
            }else{

                res.status(404).send({status: 404,mesage: "No Program found with given program id", data: {}})
                
            }
        })

    }catch(err){
        next(err)
    }
}

exports.getProgramDataId = (req, res, next) => {
    try {

        const { error } = ProgrammesModal.validateGetProgramDataById(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });

        var program_id = req.body.program_id;

        ProgrammesModal.getProgramDataID(program_id).then(program_data => {
            res.status(200).send({ data: program_data })
        })
    } catch (err) {
        next(err)
    }
}

exports.updateProgramStatus = (req, res, next) => {
    try {

        const {error} = ProgrammesModal.validateUpdateProgramStatusData(req.body);
        if (error) return res.status(400).send({"message": error.details[0].message});

        var program_id = req.body.program_id;
        var status = req.body.status;

        ProgrammesModal.updateProgramStatus(program_id, status).then(result => {

            if (result.matchedCount == 1) {

                res.status(200).send({ status: 200, message: "status updated successfully" })
            }
            else {
                res.status(400).send({ status: 400, message: "program not found with given program id" })
            }
        })


    } catch (err) {
        next(err);
    }

}

exports.updateProgramDetails = (req, res, next) => {

    try{

        const { error } = ProgrammesModal.validateUpdateProgramData(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });

        var program_details = req.body;

        ProgrammesModal.updateProgramDetailsById(program_details._id, program_details.available_date, program_details.start_date, program_details.end_date, program_details.capacity, program_details.status, program_details.internal_notes, program_details.program_type, program_details.program_orientation_date).then(program_update_response => {

        updateProgramToSFDC(program_details._id, program_details.start_date, program_details.end_date);

        var courses = program_details.courses;
    
        
        async.eachSeries(courses, (course, courseCallback) =>{

            var start_date = course.modules[0].start_date;
            var end_date = course.modules.slice(-1)[0].end_date;
            let buffer_time;
            ProgramPolicyModel.getProgramPolicyByProgramId(program_details._id).then(program_policy=>{
               
                buffer_time = program_policy.length > 0 ? program_policy[program_policy.length - 1].course_buffer_time : Constants.DEFAULT_COURSE_BUFFER_TIME;
               
            let cohort_expiry_date = new Date(end_date + (buffer_time * 24 * 60 * 60 * 1000)).getTime();
            
           
            
            CohortSchedulesModal.updateCohortDetailsByProgramId(course.cohort_schedule_id,course.course_id,program_details._id,start_date,end_date,course.hard_end_date).then(async cohort_details_update =>{

                if (program_details.program_type && program_details.program_type === Constants.PROGRAM_TYPE_LEARNING_TRACK) {

                    await CohortStudentsModel.updateUserCohortDates(course.cohort_schedule_id, program_details._id, start_date, end_date, cohort_expiry_date).then(userCohortDatesresponse => { });;

                }
                
                    async.eachSeries(course.modules, (module, modulesCallback) =>{
                    ModuleSchedulesModal.updateModuleSchedulesDetails(module.module_id, course.cohort_schedule_id, module.start_date, module.end_date).then(result => {
                        LessonsModal.getModuleLessons(module.module_id).then(module_lessons => {
                            var quiz_lesson_id;
                            async.eachSeries(module_lessons, function (this_lesson, lessonsCallback) {
                               
                                if (this_lesson.title?.trim().toLowerCase().includes(Constants.QUIZ_NAME.toLowerCase())) {
                                    quiz_lesson_id = this_lesson.lesson_id;
                                }
                                lessonsCallback();
                            }, function (err1) {
                                if (err1) {

                                    next(err1);
                                }
                                    if (quiz_lesson_id !== undefined) {
                                        LessonsModal.updateQuizLessonDuration(quiz_lesson_id, module.quiz_duration).then(updateResult => {
                                            modulesCallback();
                                        })
                                    } else {
                                        modulesCallback();
                                    }
                            })
                        });
                    })
                },function(err){
                    if(err){
                        next(err)
                    }
                    courseCallback();
                })
            });
        });

        }, function(err){
            if(err){
                next(err)
            }

            res.status(200).send({ status: 200, message: "Program Details Updated Successfully"})

        })
    })
    }catch(err){
        next(err);
    }
}

exports.addCoursesinPrograms = (req, res, next) => {

    try{

        ProgrammesModal.getAllProgramDetailsWithLearningTrackData().then(programs => {

            async.eachSeries(programs, (program, programsCallBack) =>{

                //console.log(program)

                if(program.learning_track_id != null){

                ProgrammesModal.addCoursesInProgramDetailsById(program._id, program.learning_track_id.courses).then(result => {
                  //  console.log(result);
                    programsCallBack();
                });
            }else{
                programsCallBack();
            }

            }, function(err){
                res.status(200).send({message: "updated successfully"})
            })

        })

    }catch(err){
        next(err);
    }

}


exports.createCustomProgram = async (req, res, next) => {
    try {

        const { error } = ProgrammesModal.validateCustomProgramData(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });

        var product_id;
        var end_date = 1234566;
        var learning_track_name = req.body.program_name;
        var start_date = req.body.start_date;
        var program_display_name;

        LearningTracksModal.getCustomProgramLearningTrack().then(learning_track => {
            if (learning_track.length > 0) {

                let learning_track_info = learning_track[0];


                let learning_track_acronym = learning_track_name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')

                var date = moment();

                var currentDate = date.format('YYYYMMDDHHMMSS');

                product_id = `${currentDate}_${learning_track_acronym}`;

                var display_learning_track_name = learning_track_name.trim().replaceAll(" ", "_");

                var display_start_date = moment(start_date).format('YYYY_MM_DD');

                program_display_name = `ISBOnline_${display_learning_track_name}_${display_start_date}_open`;

                const programData = {
                    learning_track_id: learning_track_info._id,
                    product_id: product_id,
                    start_date: start_date,
                    end_date: end_date,
                    available_date: req.body.available_date,
                    program_orientation_date: req.body.program_orientation_date,
                    capacity: req.body.capacity,
                    program_cost: req.body.program_cost,
                    status: req.body.status,
                    internal_notes: req.body.internal_notes,
                    learning_track_name: learning_track_name,
                    courses: req.body.courses,
                    program_display_name: program_display_name,
                    program_type: req.body.program_type,
                    program_certificate_name: learning_track_name
                };

                ProgrammesModal.saveProgrammes(programData).then(result => {

                    CohortSchedulesController.saveProgramCourseCohorts(result._id, start_date, req.body.available_date, req.body.courses).then(response => {
                        // console.log("response",response)
                        ProgrammesModal.updateProgramEndDate(result._id, response).then(updateResponse => {

                            saveProgramToSFDC(result._id, product_id, learning_track_name, start_date, response, program_cost, program_display_name);

                            res.status(200).send({ status: 200, message: "Program created successfully", data: result })
                        })
                    });

                })

            } else {
                res.status(200).send({ status: 200, message: "Learning Track with given Id is not found" })
            }

        });



    } catch (err) {
        next(err);
    }

}

exports.saveCustomProgram = (req, res, next) => {
    try {

        const { error } = ProgrammesModal.validateCustomCreateProgramData(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });
        ProgrammesModal.getProgrammeByProductId(req.body.program_id).then(programee_details=>{
            if(programee_details.length>0){
                return res.status(200).send({'status':200,'message':'The given program name is already existed'})
            }else{
                var product_id;
                var learning_track_id;
                var program_display_name;
        
                LearningTracksModal.getCustomProgramLearningTrack().then(learning_track => {
                    if (learning_track.length > 0) {
        
                        learning_track_id = learning_track[0]._id;
        
                        let learning_track_acronym = req.body.program_name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
        
                        var date = moment();
        
                        var currentDate = date.format('YYYYMMDDHHMMSS');
        
                        product_id = `${currentDate}_${learning_track_acronym}`;
        
                        var display_learning_track_name = req.body.program_name.trim().replaceAll(" ", "_");
        
                        var display_start_date = moment(req.body.start_date).format('YYYY_MM_DD');
        
                        program_display_name = `ISBOnline_${display_learning_track_name}_${display_start_date}_open`;
        
                        var courses_info = [];
        
                        async.eachSeries(req.body.courses, (course, callback) =>{
        
                            var course_data = {
                                course_id: course.course_id,
                                course_title: course.course_name
                            };
        
                            courses_info.push(course_data);
        
                            callback();
        
                        }, (err) =>{
                            if(err){
                                next(err);
                            }else{
        
                                const programData = {
                                    learning_track_id: learning_track_id,
                                    product_id: req.body.program_id ? req.body.program_id : product_id,
                                    start_date: req.body.start_date,
                                    end_date: req.body.end_date,
                                    available_date: req.body.available_date,
                                    program_orientation_date: req.body.program_orientation_date,
                                    capacity: req.body.capacity,
                                    program_cost: req.body.program_cost,
                                    status: req.body.status,
                                    internal_notes: req.body.internal_notes,
                                    learning_track_name: req.body.program_name,
                                    courses: courses_info,
                                    program_display_name: program_display_name,
                                    program_type: req.body.program_type,
                                    program_certificate_name: req.body.program_name
                                };
        
                                ProgrammesModal.saveProgrammes(programData).then(result => {

                                    var program_result = result;
        
                                    saveProgramToSFDC(result._id, programData.product_id, programData.learning_track_name, programData.start_date, programData.end_date, programData.program_cost, program_display_name);
        
                                    var courses = req.body.courses;
        
                                    async.eachSeries(courses, function (course, coursesCallback) {
        
                                        var course_data = {
                                            course_id: course.course_id,
                                            start_date: course.start_date,
                                            available_date: req.body.available_date,
                                            course_end_date: course.end_date,
                                            end_date: course.end_date,
                                            is_enabled: true,
                                            program_id: result._id,
                                            course_name: course.course_name,
                                            course_cost: course.course_cost,
                                            course_created_date: course.start_date
                                        };
        
                                        CohortSchedulesModal.saveCohort(course_data).then(cohort_save_result => {
        
                                            var modules = [];
        
                                            async.eachSeries(course.modules, function (this_module, modulesCallback) {
        
                                                var this_module_details = {
                                                    module_id: this_module.module_id,
                                                    cohort_schedule_id: cohort_save_result._id,
                                                    module_score: 0,
                                                    start_date: this_module.start_date,
                                                    end_date: this_module.end_date,
                                                    title: this_module.title
                                                };
        
                                                modules.push(this_module_details);
                                                // module lessons
                                                LessonsModal.getModuleLessons(this_module.module_id).then(module_lessons => {
                                                    var lessons = [];
                                                    var quiz_lesson_id;
        
                                                    async.eachSeries(module_lessons, function (this_lesson, lessonsCallback) {
                                                        var this_lesson_details = {};
        
                                                        this_lesson_details.lesson_id = this_lesson.lesson_id;
                                                        this_lesson_details.cohort_schedule_id = cohort_save_result._id;
                                                        this_lesson_details.module_id = this_lesson.module_id;
                                                        this_lesson_details.start_date = this_module.start_date;
                                                        this_lesson_details.end_date = this_module.end_date;
                                                        lessons.push(this_lesson_details);
        
                                                        if (this_lesson.title.includes(Constants.QUIZ_NAME)) {
                                                            quiz_lesson_id = this_lesson.lesson_id;
                                                        }
        
                                                        lessonsCallback();
                                                    }, function (err1) {
                                                        if (err1) {
        
                                                            next(err1);
                                                        }
                                                        LessonsScheduleModel.saveLessons(lessons).then(result => {
        
                                                            if (quiz_lesson_id !== undefined) {
                                                                LessonsModal.updateQuizLessonDuration(quiz_lesson_id, this_module.quiz_duration).then(updateResult => {
                                                                    modulesCallback();
                                                                })
                                                            } else {
                                                                modulesCallback();
                                                            }
        
                                                        });
                                                    })
                                                });
        
                                            }, function (err1) {
                                                if (err1) {
                                                    next(err1);
                                                }
        
                                                ModuleSchedulesModal.saveModuleSchedules(modules).then(result => {
                                                    coursesCallback();
                                                });
        
                                            })
                                        })
                                    }, function (err) {
                                        if (err) {
                                            next(err)
                                        } else {
        
                                            res.status(200).send({ status: 200, message: "Program Created Successfully" , program:program_result})
        
                                        }
                                    })
        
                                })
                            }
                        });
                    } else {
                        res.status(404).send({ status: 404, message: "Learning Track with given Id is not found" })
                    }
        
                });
            }
        })

    } catch (err) {
        next(err);
    }
}


exports.getCoursesDetailsForProgram = (req, res, next) => {
    try{

        const { error } = ProgrammesModal.validateCoursesData(req.body);

        if (error) return res.status(400).send({ "mesage": error.details[0].message });

        var courses = [];

        async.eachSeries(req.body.courses, (course_id, coursesCallback) => {

            var course_data = {
                course_id: course_id,
            };

            CoursesModel.getCourseDetails(course_id).then(course_result => {

                if (course_result == null || course_result == undefined) {
                    coursesCallback();
                }
                else {

                    course_data.course_name = course_result.course_title;
                    course_data.course_cost = course_result.course_cost;
                    course_data.modules = [];

                    ModulesModel.getCourseModules(course_id).then(course_modules => {

                        async.eachSeries(course_modules, function (this_module, modulesCallback) {

                            var this_module_details = {};

                            this_module_details.module_id = this_module._id;
                            this_module_details.module_name = this_module.module_title ? this_module.module_title : "Quiz";
                            this_module_details.duration = this_module.duration;
                            this_module_details.duration_units = this_module.duration_units;

                            course_data.modules.push(this_module_details);

                            modulesCallback();

                        }, function (err1) {
                            if (err1) {
                                next(err1);
                            }
                            courses.push(course_data);
                            coursesCallback();
                        })
                    })
                }
            })

        }, (err) => {
            if (err) {
                next(err);
            }

            res.status(200).send({ status: 200, message: "Courses Data", data: courses })

        })

    }catch(err){
        next(err);
    }
}


exports.findUniqueProgramCode = (req, res, next) => {
    try{

        const {error} = ProgrammesModal.validateProgramCode(req.body);
        if (error) return res.status(400).send({ "message": error.details[0].message });

        var program_code = req.body.program_code;
       
        ProgrammesModal.getProgrammeByProductId(program_code).then(result => {

            if(result.length>0){

                res.status(200).send({ status: 200, message: "program already exists with the given program_code", data: result })

            }
            else{

                res.status(200).send({ status: 200, message: "program doesn't exists with the given program_code"})
            }
  

        })

    }catch(err){
        next(err);
    }
}


async function saveProgramToSFDC(program_id, program_code, program_name, start_timestamp, end_timestamp, program_cost, program_display_name){

    var start_date = moment(start_timestamp).format('DD/MM/YYYY');

    var end_date = moment(end_timestamp).format('DD/MM/YYYY');

    var program_data = {
        programme_id: program_id,
        programme_code: program_code,
        terms: 1,
        programme_name: program_name,
        start_date: start_date,
        end_date: end_date,
        program_cost: program_cost,
        program_display_name: program_display_name
    };

    SFDCController.saveProgramDetailsToSFDC(program_data);
    
}

async function updateProgramToSFDC(program_id, start_timestamp, end_timestamp) {

    var start_date = moment(start_timestamp).format('DD/MM/YYYY');

    var end_date = moment(end_timestamp).format('DD/MM/YYYY');

    var program_data = {
        programme_id: program_id,
        start_date: start_date,
        end_date: end_date
    };

    SFDCController.saveProgramDetailsToSFDC(program_data);

}