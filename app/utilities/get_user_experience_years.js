
function getUserExperienceYears(experience){

    switch(experience){
        case 1:
            return "0-1 year";
        case 2:
            return "2-3 years";
        case 4:
            return "4-5 years";
        case 6:
            return "6-7 years";
        case 8:
            return "8-10 years";
        case 13:
            return "11-15 years";
        case 18:
            return "16-20 years";
        case 20:
            return "20+ years";
        default:
            return "0-1 year"                                
    }
}

exports.getUserExperienceYears = getUserExperienceYears;