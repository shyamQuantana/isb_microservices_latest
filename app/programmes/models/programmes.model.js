
const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("../../../config/db").mongoose;
const Schema = mongoose.Schema;
const CurrentDate = require('../../utilities/get_current_date');
const Constants = require('../../../config/constants');

const ProgrammesSchema = new Schema({

    learning_track_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'learningtracks'
    },
    product_id: {
        type: String,
        required: true,
    },
    start_date: {
        type: Number,
        required: true,
    },
    end_date: {
        type: Number,
        required: true,
    },
    program_orientation_date: {
        type: Number,
        required: true,
    },
    available_date: {
        type: Number,
        required: true,
    },
    program_cost: {
        type: Number,
        required: true,
    },
    internal_notes: {
        type: String,
    },
    learning_track_name: {
        type: String,
    },
    capacity: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        default: Constants.PROGRAM_PUBLIC_STATUS,
    },
    program_display_name:{
        type: String, 
    },
    courses:[
        {
            course_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Courses'
            },
            course_title: {
                type: String,
            },
            _id: false
        }
    ],

    program_type: {
        type: Number,
        required: true,
    
    },
    available_platform: {
        type: [String],
        default: [Constants.ISBO_PLATFORM_NAME]

    },
    course_certificate_template_image: {
        type: String,
        default: ""
    },
    program_certificate_template_image: {
        type: String,
        default: ""
    },
    program_certificate_name: {
        type: String,
        default: this.learning_track_name
    },
    installment_details:[
        {
            payment_name: {
                type:String,
                default:Constants.EMI_TYPE_DEPOSIT
            },
            payment_amount: {
                type: Number,
            },
            pay_by_date: {
                type: Number
            },
            _id: false
        }
    ],
    created_date: {
        type: Number,
        default: function () {
            return CurrentDate.getCurrentDateTime()
        }
    },
    updated_date: {
        type: Number,
        default: function () {
            return CurrentDate.getCurrentDateTime()
        }
    },
}, { collection: "programmes" });

const Programmes = mongoose.model('Programmes', ProgrammesSchema);

exports.Programmes = this.Programmes;



exports.saveProgrammes = (program_data) => {
    const ProgrammesObj = new Programmes(program_data);
    return ProgrammesObj.save();
}


exports.updateProgramEndDate = (program_id, end_date) => {
    return Programmes.updateOne({ _id: mongoose.Types.ObjectId(program_id) },{$set: {end_date: end_date}})
}


exports.getProgrammesList = (learning_track_id) => {
    return Programmes.aggregate([{ $match: { learning_track_id: mongoose.Types.ObjectId(learning_track_id), status: Constants.PROGRAM_PUBLIC_STATUS, available_date: { $lte: CurrentDate.getCurrentDateTime() }} }])
}
exports.getAllProgrammesList = (learning_track_id) => {
    return Programmes.aggregate([{ $match: { learning_track_id: mongoose.Types.ObjectId(learning_track_id), status: Constants.PROGRAM_PUBLIC_STATUS,} }])
}

exports.getProgramDetailsByID = (program_id) => {
    return Programmes.find({ _id: mongoose.Types.ObjectId(program_id), status: Constants.PROGRAM_PUBLIC_STATUS, }).populate('learning_track_id')
}
exports.getProgramDataID = (program_id) => {
    return Programmes.findOne({ _id: mongoose.Types.ObjectId(program_id), status: Constants.PROGRAM_PUBLIC_STATUS, })
}

exports.getProgramDetailsByProductID = (product_id) => {
    return Programmes.find({ product_id: product_id, status: Constants.PROGRAM_PUBLIC_STATUS }).populate('learning_track_id')
}

function validateData(data) {
    const schema = Joi.object({
        learning_track_id: Joi.objectId().required(),
        product_id: Joi.string().allow(null),
        start_date: Joi.date().timestamp().required(),
        end_date: Joi.date().timestamp().allow(null),
        available_date: Joi.date().timestamp().required(),
        capacity: Joi.number().required(),
        program_cost: Joi.number().allow(null),
        status: Joi.number().allow(null),
        internal_notes: Joi.string().trim().required(),
        learning_track_name: Joi.string().allow(null),
        program_type: Joi.number().required(),
        program_orientation_date: Joi.date().timestamp().required()
    });
    return schema.validate(data);
}

function validateGetProgramsData(data) {
    const schema = Joi.object({
        learning_track_id: Joi.objectId().required(),
    });
    return schema.validate(data);
}

function validateGetProgramDataById(data) {
    const schema = Joi.object({
        program_id: Joi.objectId().required(),
        user_id: Joi.string().allow(null),
    });
    return schema.validate(data);
}

function validateUpdateProgramData(data) {
    const schema = Joi.object({
        _id: Joi.objectId().required(),
        program_id: Joi.string().allow(null),
        start_date: Joi.date().timestamp().allow(null),
        end_date: Joi.date().timestamp().allow(null),
        available_date: Joi.date().timestamp().allow(null),
        internal_notes: Joi.string().allow(null),
        capacity: Joi.number().allow(null),
        courses: Joi.array().required(),
        program_cost: Joi.number().allow(null),
        status: Joi.number().allow(null),
        program_type: Joi.number().allow(null),
        program_orientation_date: Joi.date().timestamp().required()
    }).unknown({ allow: true });;
    return schema.validate(data);
}

function validateCreateProgramData(data) {
    const schema = Joi.object({
        program_id: Joi.string().allow(null),
        learning_track_id: Joi.objectId().required(),
        start_date: Joi.date().timestamp().required(),
        end_date: Joi.date().timestamp().required(),
        available_date: Joi.date().timestamp().required(),
        internal_notes: Joi.string().allow(null),
        capacity: Joi.number().required(),
        courses: Joi.array().required(),
        status: Joi.number().allow(null),
        program_type: Joi.number().required(),
        program_orientation_date: Joi.date().timestamp().required()
    });
    return schema.validate(data);
}

function validateCustomProgramData(data) {
    const schema = Joi.object({
        product_id: Joi.string().allow(null),
        start_date: Joi.date().timestamp().required(),
        end_date: Joi.date().timestamp().allow(null),
        available_date: Joi.date().timestamp().required(),
        capacity: Joi.number().required(),
        program_cost: Joi.number().required(),
        status: Joi.number().allow(null),
        internal_notes: Joi.string().trim().required(),
        program_name: Joi.string().required(),
        courses: Joi.array().required(),
        program_type: Joi.number().required(),
        program_orientation_date: Joi.date().timestamp().required()
    });
    return schema.validate(data);
}

function validateCustomCreateProgramData(data) {
    const schema = Joi.object({
        program_id: Joi.string().allow(null),
        start_date: Joi.date().timestamp().required(),
        end_date: Joi.date().timestamp().required(),
        available_date: Joi.date().timestamp().required(),
        internal_notes: Joi.string().allow(null),
        capacity: Joi.number().required(),
        courses: Joi.array().required(),
        program_cost: Joi.number().required(),
        program_name: Joi.string().required(),
        status: Joi.number().allow(null),
        program_type: Joi.number().required(),
        program_orientation_date: Joi.date().timestamp().required()
    });
    return schema.validate(data);
}

function validateCoursesData(data) {
    const schema = Joi.object({
        courses: Joi.array().required(),
    });
    return schema.validate(data);
}

function validateGetProgramApplicationsData(data) {
    const schema = Joi.object({
        program_id: Joi.objectId().allow(null),
        learning_track_id: Joi.objectId().allow(null),
    }).unknown({ allow: true });
    return schema.validate(data);
}

function validateGetProgramsForAdminData(data) {
    const schema = Joi.object({
        learning_track_id: Joi.objectId().allow(null),
    }).unknown({ allow: true });
    return schema.validate(data);
}

exports.validate = validateData;
exports.validateUpdateProgramData = validateUpdateProgramData;
exports.validateGetProgramsData = validateGetProgramsData;
exports.validateGetProgramDataById = validateGetProgramDataById;
exports.validateCreateProgramData = validateCreateProgramData;
exports.validateCustomProgramData = validateCustomProgramData;
exports.validateCustomCreateProgramData = validateCustomCreateProgramData;
exports.validateCoursesData = validateCoursesData;
exports.validateGetProgramApplicationsData = validateGetProgramApplicationsData;
exports.validateGetProgramsForAdminData = validateGetProgramsForAdminData;

exports.getProgrammes = (learning_track_id) => {
    return Programmes.find({ learning_track_id: learning_track_id})
}


exports.getAllProgrammes = () => {
    return Programmes.find({ })
}

exports.getAllActiveProgrammes = () => {
    const CurrentDate = Date.now();
    return Programmes.find({})
}

exports.updateProgramStatus = (program_id, status) => {

    return Programmes.updateOne({_id:program_id},
        { $set: { status: status }});
    
}


exports.updateProgramDetailsById = (program_id, available_date, start_date, end_date, capacity, status, internal_notes, program_type, program_orientation_date) => {

    return Programmes.updateOne({ _id: mongoose.Types.ObjectId(program_id) },
        { $set: { status: status, available_date: available_date, start_date: start_date, end_date: end_date, capacity: capacity, status: status, internal_notes: internal_notes, program_type: program_type, program_orientation_date: program_orientation_date }});
    
}
exports.getProgramManagerPrograms = (program_ids, date) => {

    return Programmes.find({
        _id: { $in: program_ids }, 
        status: Constants.PROGRAM_PUBLIC_STATUS,
     });
}

exports.getProgramManagerAllPrograms = (date) => {

    return Programmes.aggregate([{
        $match: {
            $and: [
                {
                    end_date: {
                        $gte: date
                    }
                }
            ],
            status: Constants.PROGRAM_PUBLIC_STATUS,
        }
    }, {
            $sort: {
                _id: -1
            }
        }]);
    }

exports.getProgramManagerAllProgramsData = (date) => {

    return Programmes.aggregate([{
        $match: {
            status: Constants.PROGRAM_PUBLIC_STATUS,
        }
    }, {
        $sort: {
            _id: -1
        }
    }]);
}
exports.getProgrammesById = (program_id) => {
    return Programmes.find({ _id: program_id})
}

exports.getAllProgramDetailsWithLearningTrackData = () => {
    return Programmes.find({ status: Constants.PROGRAM_PUBLIC_STATUS }).populate('learning_track_id')
}

exports.addCoursesInProgramDetailsById = (program_id, courses) => {

    return Programmes.updateOne({ _id: mongoose.Types.ObjectId(program_id) },
        { $set: { courses: courses } });

}

exports.getProgramsforCourseUpdate = (course_id,current_date) => {

    return Programmes.find({ "courses.course_id": course_id, 
        end_date: { $gte: current_date }, status: Constants.PROGRAM_PUBLIC_STATUS
});
  
         
}

exports.getProgrammesByProductId = (product_id) => {
    return Programmes.find({ product_id: product_id})
}


exports.getAllProgramsForSFDC = () => {
    return Programmes.aggregate([{
        $match: {}
    }, {
        $project: {
            _id: 0,
            program_id: '$_id',
            product_id: 1,
            start_date: {
                $toDate: {
                    "$toLong": "$start_date"
                }
            },
            end_date: {
                $toDate: {
                    "$toLong": "$end_date"
                }
            },
            available_date: {
                $toDate: {
                    "$toLong": "$available_date"
                }
            },
            program_cost: 1,
            learning_track_name: 1
        }
    }]);
}


exports.getProgramDataByProductIDForSFDC = (product_id) => {
    return Programmes.aggregate([
        { $match: {
            product_id: product_id
        } },
        {
            $project: {
                _id: 0,
                program_id: '$_id',
                product_id: 1,
                start_date: {
                    $toDate: {
                        "$toLong": "$start_date"
                    }
                },
                end_date: {
                    $toDate: {
                        "$toLong": "$end_date"
                    }
                },
                available_date: {
                    $toDate: {
                        "$toLong": "$available_date"
                    }
                },
                program_cost: 1,
                learning_track_name: 1
            }
        }]);
}

exports.getProgrammeByProductId = (program_code) => {
    return Programmes.find({ product_id: program_code})
}

exports.getAllCustomPrograms = (learning_track_id) => {
    return Programmes.find({ learning_track_id: mongoose.Types.ObjectId(learning_track_id) }) 
}

exports.updateCustomProgramCourseIDWhenCourseUpdating = (learning_track_id, old_course_id, course_id, course_title) => {
    return Programmes.updateMany(
        { 'courses.course_id': mongoose.Types.ObjectId(old_course_id), learning_track_id: mongoose.Types.ObjectId(learning_track_id) }, {
        '$set': {
            'courses.$.course_id': course_id,
            'courses.$.course_title': course_title
        }
    })
}

exports.updateProgramCourseIDWhenCourseUpdating = (program_id, old_course_id, course_id, course_title) => {
    return Programmes.updateOne(
        { _id: mongoose.Types.ObjectId(program_id), 'courses.course_id': mongoose.Types.ObjectId(old_course_id) }, {
        '$set': {
            'courses.$.course_id': course_id,
            'courses.$.course_title': course_title
        }
    })
}

exports.getProgramsStarted = (start_date, end_date) => {

    return Programmes.aggregate([{
        $match: {
            $and: [
                {
                    start_date: {
                        $lte: start_date
                    }
                },
                {
                    end_date: {
                        $gte: end_date
                    }
                }
            ],
            status: Constants.PROGRAM_PUBLIC_STATUS,
        }
    }, {
        $sort: {
            _id: -1
        }
    }])

}

exports.getProgramWithProgramPolicy = (product_id) => {

    return Programmes.aggregate(
        [
            {
                $match: {
                    product_id: product_id,
                },
            },
            {
                $lookup: {
                    from: "programpolicy",
                    localField: "_id",
                    foreignField: "program_id",
                    as: "program_policy",
                },
            },
            {
                '$project': {
                    'id': '$_id',
                    'program_type': '$program_type',
                    '_id': 0,
                    'program_policy': '$program_policy'
                }
            }
        ]
    );
}

exports.getProgramsByCourseId = (course_id) => {
    return Programmes.find({ "courses.course_id": course_id });
  };

exports.getISBXTeacherMappedPrograms = (program_ids) => {

    return Programmes.find({
        _id: { $in: program_ids },
        status: Constants.PROGRAM_PUBLIC_STATUS,
    });
    
}

exports.getProgramDetailsWithProgramPolicy = (program_id) => {

    return Programmes.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(program_id),
                },
            },
            {
                $lookup: {
                    from: "programpolicy",
                    localField: "_id",
                    foreignField: "program_id",
                    as: "program_policy",
                },
            },
            {
                '$project': {
                    'course_certificate_template_image': 0,
                    'program_certificate_template_image': 0,
                    'available_platform': 0,
                    'internal_notes': 0,
                    'program_cost': 0,
                    'available_date': 0,
                    'capacity': 0,
                }
            }
        ]
    );
}

exports.getProgrammesListByLearningTrakAndProgramId = (learning_track_id,program_id) => {
    return Programmes.aggregate([{ $match: { learning_track_id: mongoose.Types.ObjectId(learning_track_id), _id: mongoose.Types.ObjectId(program_id), status: Constants.PROGRAM_PUBLIC_STATUS, available_date: { $lte: CurrentDate.getCurrentDateTime() } } }])
}
function validateGetProgramsDataForLearningTrak(data) {
    const schema = Joi.object({
        program_id: Joi.objectId().required(),
        learning_track_id: Joi.objectId().required(),
    });
    return schema.validate(data);
}
exports.validateGetProgramsDataForLearningTrak = validateGetProgramsDataForLearningTrak;

function validateUpdateProgramStatusData(data) {
    const schema = Joi.object({
        program_id: Joi.objectId().required(),
        status: Joi.number().valid(Constants.PROGRAM_PUBLIC_STATUS, Constants.PROGRAM_PRIVATE_STATUS, Constants.PROGRAM_UNLISTED_STATUS).required()
    })
    return schema.validate(data);
}

exports.validateUpdateProgramStatusData=validateUpdateProgramStatusData;



function validateProgramCode(data) {
    const schema = Joi.object({
        program_code: Joi.string().trim().required(),
    })
    return schema.validate(data);
}
exports.validateProgramCode= validateProgramCode;