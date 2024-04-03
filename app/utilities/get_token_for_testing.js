let Constants = require('../../config/constants');
let jwt =require('jsonwebtoken');

exports.getAdminToken = (role) => {
    const mockAdminUser = [                                                                                                                                               
        {
            _id: "642561e7c3211cb4bdec94c0",
            email: "varun.t@quantana.in",
            role: Constants.ADMIN_ROLE
        },
        {
            email: "shabaspasha.sk@quantana.in",
            _id: "642561e7c3211cb4bdec92c0",
            role: Constants.PROGRAM_MANAGEMENT_ROLE
        },
        {
            email: "abc@quantana.in",
            _id: "6481e2ab15cd0edda3027037",
            role: Constants.ENROLLMENT_MANAGER_ROLE
        }
    ]

    let id = mockAdminUser.filter(user => user.role === role).map(user => user._id);

    token = jwt.sign({ _id: id, role: role}, Constants.ACCESS_TOKEN, {expiresIn: '7d'} )
    return token;
}

exports.getUserToken = (platform) => {
    const mockUser = [                                                                                                                                               
        {
            _id: "642561e7c3211cb4bdec94c0",
            platform: Constants.ISBO_PLATFORM_NAME
        },
        {
            _id: "642561e7c3211cb4bdec92c0",
            platform: Constants.ISBX_PLATFORM_NAME
        },
        // {
        //     _id: "6481e2ab15cd0edda3027037",
        //     platform: Constants.ENROLLMENT_MANAGER_ROLE
        // }
    ]

    let id = mockUser.filter(user => user.platform === platform).map(user => user._id);

    token = jwt.sign({ _id: id, platform: platform }, Constants.ACCESS_TOKEN, {expiresIn: '7d'} )
    
    let refresh_token= jwt.sign({_id: id}, Constants.REFRESH_TOKEN, {expiresIn:'7d'} )

    return {token,  refresh_token};
}
