
let LessonsModel = require('../lessons/models/lessons.model');
const ActivitiesModel = require('../activities/models/activities.model.js');
const Constants = require('../../config/constants');
const ModulesModel = require('../modules/models/modules.model.js');
const ModuleController = require('../modules/controllers/modules.controller.js');
const async = require('async');

const SLAModel = require('../social_learning_activities/models/social_learning_activities.model');
const GroupsModel = require('../groups/models/groups.models');
const UtilitiesV2 = require('../v2/utilities/scores_utility');
const ProgramPolicyModel = require('../program_policy/models/program_policy.model.js');

async function getLessonTotalScore(this_lesson) {

    return new Promise((resolve, reject) => {

        var totalLessonScore = 0;
        var is_module_quiz = false;

        let lesson_id = this_lesson._id;

        if (this_lesson.lesson_ref == Constants.COURSE_TYPE) {

            var entity_id = this_lesson.course_id;
            var entity_type = this_lesson.lesson_ref;


        }
        else if (this_lesson.lesson_ref == Constants.MODULE_TYPE) {

            var entity_id = this_lesson.module_id;
            var entity_type = this_lesson.lesson_ref;

        }
        else {

            var entity_id = this_lesson._id;
            var entity_type = this_lesson.lesson_ref;

        }

        //if module quiz comes it's title is usually "Quiz"
        is_module_quiz = (this_lesson.lesson_title.toLowerCase().includes(Constants.QUIZ_NAME.toLowerCase())) ? true : false;

        ActivitiesModel.getAllActivitiesbyEntity(entity_id, entity_type).then(lesson_activities => {

            getProgramStartedAfterJanuaryStatus(lesson_id).then(program_start_status => {

                async.eachSeries(lesson_activities, function (this_activity, callback2) {


                    if (this_activity.entity_type === Constants.MODULE_ACTIVITY_ENTITY_TYPE) {

                        totalLessonScore = totalLessonScore + Constants.MODULE_ASSESSMENT_ACCURACY_SCORE + Constants.MODULE_ASSESSMENT_ATTEMPTING_SCORE;
                        callback2();

                    } else if (this_activity.entity_type === Constants.LESSON_ACTIVITY_ENTITY_TYPE) {

                        if (this_activity.activity_json_sub_type === Constants.SHORT_ANSWER) {

                            let short_answer_accuracy = program_start_status ? Constants.LESSON_SHORT_ANSWER_ZERO_SCORE : Constants.LESSON_KNOWLEDGE_CHECK_ACCURACY_SCORE;

                            totalLessonScore = totalLessonScore + Constants.LESSON_KNOWLEDGE_CHECK_ATTEMPTING_SCORE + short_answer_accuracy;

                            if (is_module_quiz) {

                                totalLessonScore = totalLessonScore + 1;

                            }

                            callback2();

                        } else {

                            totalLessonScore = totalLessonScore + Constants.LESSON_KNOWLEDGE_CHECK_ATTEMPTING_SCORE + Constants.LESSON_KNOWLEDGE_CHECK_ACCURACY_SCORE;
                            if (is_module_quiz) {
                                totalLessonScore = totalLessonScore + 1;
                            }

                            callback2();

                        }

                    } else {
                        totalLessonScore = totalLessonScore + Constants.FINAL_COURSE_ASSESSMENT_ACCURACY_SCORE + Constants.FINAL_COURSE_ASSESSMENT_ATTEMPTING_SCORE;
                        callback2();
                    }


                }, function (err2) {

                    if (err2) {
                        resolve(0);
                    }
                    else {
                        resolve(totalLessonScore);
                    }

                })
            })

        })

    });
}

exports.getCourseTotalScore = (course_id, program_id, user_id) => {

    return new Promise((resolve, reject) => {

        ProgramPolicyModel.getProgramPolicyByProgramId(program_id).then(async program_policy => {
            //console.log(program_id ,program_policy);

        if(program_policy.length > 0)
        {

            var totalCourseScore = await UtilitiesV2.getCourseTotalScore(course_id, program_id, user_id, program_policy[0]);
            //console.log("totalCourseScore:",totalCourseScore);
            resolve(totalCourseScore);

                
        }
        else
        {

        LessonsModel.getLessonsbyCourse(course_id).then(course_lessons => {

            //console.log("course_lessons:",course_lessons.length);
            var totalCourseScore = 0;

            var assigned_sla_score = 0;
            var max_sla_score = 0;
            let sla_module_id;
            var course_moduels = [];

            async.eachSeries(course_lessons, function (this_lesson, callback1) {

                lesson_id = this_lesson._id;

                course_moduels.push(this_lesson.module_id.toString())

                if (this_lesson.lesson_title.toLowerCase().includes(Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase())) {

                    SLAModel.getSLADataByLessonId(this_lesson.module_id, program_id).then(slaData => {

                        if (slaData.length > 0) {

                            var sla_id = slaData[0]._id;

                            GroupsModel.getUserRoleBasedOnSlaIdandUserId(sla_id, user_id).then(RoleData => {

                                if (RoleData.length > 0) {

                                    let sla_lesson_role_data = this_lesson.lesson_title.toLowerCase().split("-");

                                    let sla_lesson_role = sla_lesson_role_data[sla_lesson_role_data.length - 1].trim();

                                    if (sla_lesson_role.toLowerCase() === RoleData[0].role_info.name.toLowerCase()) {

                                        getLessonTotalScore(this_lesson).then(lessonScore => {

                                            assigned_sla_score = assigned_sla_score + lessonScore;

                                            max_sla_score = max_sla_score + lessonScore;

                                            totalCourseScore = totalCourseScore + lessonScore + Constants.SOCIAL_LEARNING_ATTENDANCE_SCORE;
                                            callback1();

                                        })


                                    } else {

                                        callback1();

                                        // if (this_lesson.lesson_title.trim().toLowerCase() === Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) {
                                            
                                        //     getLessonTotalScore(this_lesson).then(lessonScore => {

                                        //         assigned_sla_score = assigned_sla_score + lessonScore;

                                        //         totalCourseScore = totalCourseScore + lessonScore + Constants.SOCIAL_LEARNING_ATTENDANCE_SCORE;
                                        //         callback1();

                                        //     })

                                        // } else {

                                        //     if (this_lesson.lesson_title.trim().toLowerCase().includes(Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) && this_lesson.lesson_title.trim().toLowerCase() !== Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) {

                                        //         getLessonTotalScore(this_lesson).then(lessonScore => {

                                        //             max_sla_score = max_sla_score + lessonScore;

                                        //             callback1();

                                        //         })

                                        //     } else {

                                        //         callback1();
                                        //     }

                                        // }
                                    }

                                } else {

                                    if (this_lesson.lesson_title.trim().toLowerCase() === Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) {
                                        getLessonTotalScore(this_lesson).then(lessonScore => {

                                            assigned_sla_score = assigned_sla_score + lessonScore;

                                            totalCourseScore = totalCourseScore + lessonScore + Constants.SOCIAL_LEARNING_ATTENDANCE_SCORE;
                                            sla_module_id = this_lesson.module_id;
                                            callback1();

                                        })

                                    } else {

                                        if (this_lesson.lesson_title.trim().toLowerCase().includes(Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) && this_lesson.lesson_title.trim().toLowerCase() !== Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) {

                                            getLessonTotalScore(this_lesson).then(lessonScore => {

                                                if (sla_module_id !== undefined && (sla_module_id.valueOf() === this_lesson.module_id.valueOf())) {

                                                    max_sla_score = max_sla_score + lessonScore;

                                                }

                                                sla_module_id = undefined;

                                                callback1();

                                            })

                                        } else {

                                            callback1();
                                        }

                                    }

                                }

                            })

                        } else {

                            if (this_lesson.lesson_title.trim().toLowerCase() === Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) {

                                getLessonTotalScore(this_lesson).then(lessonScore => {

                                    assigned_sla_score = assigned_sla_score + lessonScore;

                                    totalCourseScore = totalCourseScore + lessonScore + Constants.SOCIAL_LEARNING_ATTENDANCE_SCORE;
                                    sla_module_id = this_lesson.module_id;
                                    callback1();

                                })

                            } else {

                                if (this_lesson.lesson_title.trim().toLowerCase().includes(Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) && this_lesson.lesson_title.trim().toLowerCase() !== Constants.SOCIAL_LEARNING_ACTIVITY_NAME.toLowerCase()) {

                                    getLessonTotalScore(this_lesson).then(lessonScore => {

                                        if (sla_module_id !== undefined && (sla_module_id.valueOf() === this_lesson.module_id.valueOf())) {

                                            max_sla_score = max_sla_score + lessonScore;

                                        }

                                        sla_module_id = undefined;

                                        callback1();

                                    })

                                } else {

                                    callback1();
                                }

                            }

                        }

                    });
                } else {

                    getLessonTotalScore(this_lesson).then(lessonScore => {

                        totalCourseScore = totalCourseScore + lessonScore;

                        if (this_lesson.lesson_title.toLowerCase().includes(Constants.INTEGRATIVE_THINKING_ACTIVITY_NAME.toLowerCase())) {

                            getITALessonBonusPoints(this_lesson._id).then(bonus_points => {

                                totalCourseScore = totalCourseScore + bonus_points;

                                callback1();

                            });

                        }else{

                            callback1();

                        }
                    })
                }

            }, function (err1) {

                if (err1) {
                    resolve(0)
                }
                else {

                    let modules = [...new Set(course_moduels)];

                    var total_module_bonus = modules.length * Constants.MODULE_COMPLETION_BONUS_SCORE;

                    totalCourseScore = totalCourseScore - assigned_sla_score + max_sla_score + total_module_bonus;

                    resolve(totalCourseScore);

                }

            })

        })

        }

        })
    });

}

exports.getCourseTotalScoreByCourseId = (course_id) => {

    return new Promise((resolve, reject) => {

        ModulesModel.getCourseModules(course_id).then(course_modules_data => {

            var totalCourseScore = 0;

            var course_moduels = [];

            async.eachSeries(course_modules_data, function (this_module, moduleCallBack) {

                var this_module_id = this_module._id;

                course_moduels.push(this_module._id.toString());

                ModuleController.getModuleTotalScoreByCourse(this_module_id).then(moduleMaxScore => {

                    totalCourseScore = totalCourseScore + moduleMaxScore;

                    moduleCallBack();

                })
                

            }, function (err1) {

                if (err1) {
                    resolve(0)
                }
                else {

                    let modules = [...new Set(course_moduels)];

                    var total_module_bonus = modules.length * Constants.MODULE_COMPLETION_BONUS_SCORE;

                    totalCourseScore = totalCourseScore + total_module_bonus;

                    resolve(totalCourseScore);

                }

            })

        })
    });

}

async function getProgramStartedAfterJanuaryStatus (lesson_id) {

    return new Promise((resolve, reject) => {
        try {

            LessonsModel.getProgramStartDateByLessonId(lesson_id).then(program_start_info => {

                if (program_start_info.length > 0) {

                    if (program_start_info[0].start_date >= Constants.JANUARY_TIMESTAMP_FOR_POINTS) {

                        resolve(true);

                    } else {

                        resolve(false);

                    }

                } else {

                    resolve(false);

                }
            })

        } catch (err) {

            resolve(false);

        }
    })

}

async function getITALessonBonusPoints(lesson_id) {

    return new Promise((resolve, reject) => {
        try {

            LessonsModel.getProgramStartDateByLessonId(lesson_id).then(program_start_info => {

                if (program_start_info.length > 0) {

                    if (program_start_info[0].start_date >= Constants.JANUARY_TIMESTAMP_FOR_POINTS) {

                        resolve(Constants.ITA_ATTENDANCE_POINTS);

                    } else {

                        resolve(Constants.LESSON_SHORT_ANSWER_ZERO_SCORE);

                    }

                } else {

                    resolve(Constants.LESSON_SHORT_ANSWER_ZERO_SCORE);

                }
            })

        } catch (err) {

            resolve(Constants.LESSON_SHORT_ANSWER_ZERO_SCORE);

        }
    })

}

exports.getLessonTotalScore = getLessonTotalScore;
exports.getProgramStartedAfterJanuaryStatus = getProgramStartedAfterJanuaryStatus;
exports.getITALessonBonusPoints = getITALessonBonusPoints;
