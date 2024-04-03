// const CoursePolicyModel = require();
const UserTrackingModel = require('../user_tracking/models/user_tracking.model')
const CohortScheduleModel = require('../cohort_schedules/models/cohort_schedule.model');
const Constants = require('../../config/constants');
const async = require('async');

exports.getQuizRetakeAttempts = (course_id, user_id, cohort_schedule_id, lesson_id, lesson_elements) => {

    return new Promise((resolve, reject) => {

        let max_no_of_quiz_attempts = Constants.DEFAULT_QUIZ_ATTEMPTS_COUNT;

        CohortScheduleModel.getCohortDetailsWithProgramPloicy(cohort_schedule_id).then(cohortWithPolicyInfo => {

            let total_questions_in_lesson = 0;

            max_no_of_quiz_attempts = (cohortWithPolicyInfo.length > 0 && cohortWithPolicyInfo[0].policy && cohortWithPolicyInfo[0].policy.length > 0 && cohortWithPolicyInfo[0].policy[0].allowed_quiz_attempts) ? cohortWithPolicyInfo[0].policy[0].allowed_quiz_attempts : max_no_of_quiz_attempts;

            async.eachSeries(lesson_elements, (eachElement, elementCallBack) => {

                if (eachElement.activity_id) {

                    total_questions_in_lesson++;
                    elementCallBack();

                } else {

                    async.eachSeries(eachElement.children, function (inner_activity, activitiesCallback) {
                        if (inner_activity.activity_id) {

                            total_questions_in_lesson++;
                            activitiesCallback();

                        } else {

                            activitiesCallback();

                        }
                    }, async function (err) {

                        elementCallBack();

                    })

                }

            }, (err) => {
                if (err) {

                    resolve({
                        max_no_of_quiz_attempts: max_no_of_quiz_attempts,
                        quiz_attempted_by_user: 0
                    });

                } else {

                    UserTrackingModel.checkAtleastOneTimeAttempted(course_id, user_id, cohort_schedule_id, lesson_id).then(count => {

                        if (count === total_questions_in_lesson) {
                            UserTrackingModel.getCountOfQuizAttempted(course_id, user_id, cohort_schedule_id, lesson_id).then(user_tracking => {
                                resolve({
                                    max_no_of_quiz_attempts: max_no_of_quiz_attempts,
                                    quiz_attempted_by_user: user_tracking.length > 0 ? user_tracking[0].quiz_attempted_by_user : 0
                                });
                            })
                        }
                        else {

                            resolve({
                                max_no_of_quiz_attempts: max_no_of_quiz_attempts,
                                quiz_attempted_by_user: 0
                            });
                        }
                    })

                }
            })
        })
    })
}