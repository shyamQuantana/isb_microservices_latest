exports.upperCase = (mySentence) => {
    var sentence = mySentence.trim();
    return sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());;
}