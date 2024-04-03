const fs = require('fs');
const { json } = require('stream/consumers');
const { StringDecoder } = require('string_decoder');

fs.readFile('/Users/vishalkumar/Downloads/isbonline_server/data/course1/_hierarchy.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    //   console.log(data);

    var jsonObject = JSON.parse(data);
    //   console.log(jsonObject);

    // console.log("***********************************************************************************************");


    runTree(jsonObject);

});

//this is not tested yet
function openFile(fileID) {
    let fileURL = '/Users/vishalkumar/Downloads/isbonline_server/data/course1/' + fileID + '.json';
    //open file 
    fs.readFile(fileURL, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

    });
    //parse the file

    //return the object

    return (jsonObject);


}
function runTree(jsonParent) {
    var htmlString = "";

    // console.log(jsonParent);
    // console.log(jsonParent.children);
    var jsonChildren = jsonParent.children;

    jsonChildren.forEach(child => {
        //

        // if(typeof child.children !== 'undefined'){
        //     runTree(child);

        // }

        if (child.children) {
      
            runTree(child);

        }
        else {
            // console.log(child);
        }
        //if .children exists, then recurse into runTree();

        //if we have a valid idref - then open file
        // fil
    });
    return htmlString;
}

function renderQuestion() {
    return "<h4>Question</h4>";
}
function renderParagraph() {
    return "<p>variable</p>"
}

