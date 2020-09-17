const conversion = require('./conversion');

/******************************************
 Conversion methods
******************************************/

//words to numbers
function convertWords(str) {
    conversion.wordToNumbers.forEach(e => {
        str = str.replace(e.re, e.cb);
    });

    return str.includes(" ") || str.includes("-") ? str : parseFloat(str) || str;
}

//Log error on invalid input
function logE(a) {
    console.error(new Error(`WORD-TO-NUMBERS: "${a}" is an invalid input. Expected string.`));
    return a;
}

/******************************************
    I/O handling
******************************************/

module.exports = function(a) {
    var f;

    //invoke conversion method based on input type
    switch (typeof a) {
        case 'string':
            f = convertWords;
            break;
            
        default:
            f = logE;
            break;

    };

    //output
    return f(a);
}