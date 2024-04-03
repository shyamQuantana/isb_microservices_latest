const ActivityModel = require('../activities/models/activities.model.js');
const PeerResponseModel = require('../peer_response/models/peer_responses.model');
const Constants = require('../../config/constants.js');

const async = require('async');


let defaultShortAnswerPeerResponses = [
    {
        "user_answer": "Hello you are seeing this because nobody took the course yet",
        "first_name": "Hemanth",
        "last_name": "Reddy",
        "city": "Hyderabad"
    },
    {
        "user_answer": "This is just another response followed by first one",
        "first_name": "Priya",
        "last_name": "Reddy",
        "city": "Hyderabad"
    },
    {
        "user_answer": "This is the last dummy response",
        "first_name": "Murari",
        "last_name": "Reddy",
        "city": "Mumbai"
    }
];

// let defaultShortAnswerPeerResponses = [];


async function getPeerResponsesData(question_type, activity_id, is_short_answer, user_answer) {
    switch (question_type) {
        case Constants.MULTIPLE_CHOICE:
            return new Promise((resolve, reject) => {
                try {
                    PeerResponseModel.getMultipleChoiceData(activity_id).then(dataResponse => {
                        if (dataResponse.length > 0) {
                            getActivityAndSendResponseInOrder(activity_id, dataResponse[0].data[0]).then(data => {
                                resolve(data.length !== 0 ? data : []);
                            });
                        } else {
                            ActivityModel.getActivityEmptyPeerResponse(activity_id).then(response => {
                                if(response.length > 0){
                                counts = getDefaultRandomPeerResponsePercentage(response[0].data[0].labels.length - 1)
                                let peerResponse = response[0].data;
                                if (counts.length > 0) {
                                    peerResponse[0].counts = counts;
                                }
                                resolve(peerResponse);
                            }else{
                                resolve([])
                            }
                            })
                        }
                    });
                } catch (e) {
                    ActivityModel.getActivityEmptyPeerResponse(activity_id).then(response => {
                        if(response.length > 0){
                        counts = getDefaultRandomPeerResponsePercentage(response[0].data[0].labels.length - 1)
                        let peerResponse = response[0].data;
                        if (counts.length > 0) {
                            peerResponse[0].counts = counts;
                        }
                        resolve(peerResponse);
                    }else{
                        resolve([])
                    }
                    })
                }
            });
        case Constants.CHECK_ALL_THAT_APPLY:
            return new Promise((resolve, reject) => {
                try {
                    PeerResponseModel.getMultipleChoiceData(activity_id).then(dataResponse => {
                        if (dataResponse.length > 0) {
                            getActivityAndSendResponseInOrder(activity_id, dataResponse[0].data[0]).then(data => {
                                resolve(data.length !== 0 ? data : []);
                            });
                        } else {
                            ActivityModel.getActivityEmptyPeerResponse(activity_id).then(response => {
                                if(response.length > 0){
                                counts = getDefaultRandomPeerResponsePercentage(response[0].data[0].labels.length - 1)
                                let peerResponse = response[0].data;
                                if (counts.length > 0) {
                                    peerResponse[0].counts = counts;
                                }
                                resolve(peerResponse);
                            }else{
                                    resolve([])
                            }
                            })
                        }
                    });
                } catch (e) {
                    ActivityModel.getActivityEmptyPeerResponse(activity_id).then(response => {
                        if(response.length > 0){
                        counts = getDefaultRandomPeerResponsePercentage(response[0].data[0].labels.length - 1)
                        let peerResponse = response[0].data;
                        if (counts.length > 0) {
                            peerResponse[0].counts = counts;
                        }
                        resolve(peerResponse);
                    }else{
                        resolve([])
                    }
                    })
                }
            });
        case Constants.ORDERING:
            return new Promise((resolve, reject) => {
                PeerResponseModel.orderingTypeResponseData(activity_id).then(dataResponse => {
                    if (dataResponse.length > 0) {
                        getActivityAndSendResponseInOrder(activity_id, dataResponse[0].data[0]).then(data => {
                            resolve(data.length !== 0 ? data : []);
                        });
                    } else {
                        ActivityModel.getActivityEmptyPeerResponse(activity_id).then(response => {
                            if(response.length > 0){
                            counts = getDefaultRandomPeerResponsePercentage(response[0].data[0].labels.length - 1)

                            let responseData = {
                                ids: response[0].data[0].ids,
                                labels: response[0].data[0].labels,
                                counts: [],
                                total_count: 0
                            };
                            let countsData = [];
                            for (let i = 0; i < response[0].data[0].counts.length; i++) {
                                countsData.push({
                                    position: i,
                                    count: counts.length > 0 ? counts[i] : response[0].data[0].counts[i]
                                });
                            }
                            for (let i = 0; i < response[0].data[0].ids.length; i++) {
                                responseData.counts.push(countsData);
                            }
                            resolve(responseData.length !== 0 ? responseData : []);
                        }else{
                            resolve([])
                        }
                        })
                    }
                });
            });
        case Constants.SHORT_ANSWER:
            return new Promise((resolve, reject) => {
                try {
                    PeerResponseModel.getPeerResponsesActivityData(activity_id).then(dataResponse => {
                        if (dataResponse.length > 0) {
                            let arrayResponse = [...new Set(dataResponse[0].options_data)];
                            var randArray = chooseRandom(arrayResponse,
                                arrayResponse.length > Constants.PEER_RESPONSE_SHORT_ANSWER_COUNT ? Constants.PEER_RESPONSE_SHORT_ANSWER_COUNT : arrayResponse.length, user_answer,
                            )
                            resolve(randArray);
                        } else {
                            /* tempararly disable the short answer peer response */
                            // resolve(defaultShortAnswerPeerResponses);
                            resolve([]);
                        }
                    });
                } catch (e) {
                    resolve([]);
                }
            })
        case Constants.MULTI_INPUT:
            return new Promise((resolve, reject) => {
                try {
                    if (is_short_answer) {
                        PeerResponseModel.getMultipleChoiceData(activity_id).then(dataResponse => {
                            if (dataResponse.length > 0) {
                                getActivityAndSendResponseInOrder(activity_id, dataResponse[0].data[0]).then(data => {
                                    resolve(data.length !== 0 ? data : []);
                                });
                            } else {
                                ActivityModel.getActivityEmptyPeerResponse(activity_id).then(response => {
                                    if(response.length > 0){
                                    counts = getDefaultRandomPeerResponsePercentage(response[0].data[0].labels.length - 1)
                                    let peerResponse = response[0].data;
                                    if (counts.length > 0) {
                                        peerResponse[0].counts = counts;
                                    }
                                    resolve(peerResponse);
                                }else{
                                    resolve([])
                                }
                                })
                            }
                        });
                    } else {
                        PeerResponseModel.getPeerResponsesActivityData(activity_id).then(dataResponse => {
                            if (dataResponse !== undefined && dataResponse.length > 0) {
                                let arrayResponse = [...new Set(dataResponse[0].options_data)];
                                var randArray = chooseRandom(arrayResponse,
                                    arrayResponse.length > Constants.PEER_RESPONSE_SHORT_ANSWER_COUNT ? Constants.PEER_RESPONSE_SHORT_ANSWER_COUNT : arrayResponse.length, user_answer
                                )
                                resolve(randArray);
                            } else {
                                resolve(defaultShortAnswerPeerResponses);
                            }
                        });
                    }

                } catch (e) {
                    if (is_short_answer) {
                        ActivityModel.getActivityEmptyPeerResponse(activity_id).then(response => {
                            if(response.length > 0){
                            counts = getDefaultRandomPeerResponsePercentage(response[0].data[0].labels.length - 1)
                            let peerResponse = response[0].data;
                            if (counts.length > 0) {
                            peerResponse[0].counts = counts;
                            }
                            resolve(peerResponse);
                        }else{
                            resolve([])
                        }
                        })
                    } else {
                        resolve(defaultShortAnswerPeerResponses);
                    }
                }
            })
        default:
            resolve([]);

    }
}

chooseRandom = (arr, num, user_answer) => {
    const randomArray = [];
    for (let i = 0; i < num;) {
        const random = Math.floor(Math.random() * arr.length);
        if (randomArray.indexOf(arr[random]) !== -1) {
            continue;
        };

        if (typeof(user_answer) === "string") {
            if (arr[random].user_answer?.toLowerCase() !== user_answer?.toLowerCase()) {
                randomArray.push(arr[random]);
            }
        } else {
            randomArray.push(arr[random]);
        }
        i++;
    };
    return randomArray;
};

function getDefaultRandomPeerResponsePercentage(max_length) {
    let sum = 100
    const numbers = []
    const counts = []
    for (let i = 0; i < max_length; i++) {
        const randomNumber = Math.floor(Math.random() * sum)
        sum -= randomNumber < 0 ? 0 : randomNumber
        numbers.push(randomNumber < 0 ? 0 : randomNumber)
        counts.push(randomNumber < 0 ? "0%" : randomNumber.toString() + "%")
    }
    numbers.push(sum)
    counts.push(sum.toString() + "%")
    return counts;
    // return [];
}


function getActivityAndSendResponseInOrder(activity_id, data) {
    return new Promise((resolve, reject) => {
        ActivityModel.getActivityData(activity_id).then(response => {
            let idsData = [];
            let labelsData = [];
            let countsData = [];
            async.eachSeries(response.activity_json.choices, (choice, callback) => {
                let index = data.ids.indexOf(choice.id)
                idsData.push(data.ids[index]);
                labelsData.push(data.labels[index]);
                countsData.push(data.counts[index]);
                callback();
            }, function (err) {
                let orderedData = {
                    ids: idsData,
                    labels: labelsData,
                    counts: countsData,
                    total_count: data.total_count
                };
                resolve([orderedData]);
            })
        })
    });

}


exports.getPeerResponseData = getPeerResponsesData;
