const numbers = require('./../lib/numbers.json');


/******************************************
 Conversion Stages formatted as array of stage objects

 E.g.
 {
     "re": // Regular Expression
     "cb": // Callback function to supply replacement for regex match. 
 }

******************************************/


//Words to Numbers Conversion Stages
const wordToNumbers = [
    {
        // replace number words with digits
        "re": new RegExp("\\b\\w+\\b", "gi"),
        "cb": (m) => numbers[m.toLowerCase()] || m 
    },
    {
        //concat x hundred, refactor to thousands if required
        "re": new RegExp("(?:((?:\\b(\\d)0\\b(?:\\s|-)){0,1}(\\b\\d\\b)(?:\\s|-))|(?:(?:\\b(\\d)(\\d)\\b)(?:\\s|-)){0,1})\\b00\\b", "g"),
        "cb": (m, m1, m2, m3, m4, m5) => {
            if (!m1 && !m2 && !m3 && !m4 && !m5) {
                m1 = true;
                m2 = false;
                m3 = "1";
            };
            if (m1) {
                if (m2) {
                    if (m3 == "0") {
                        return m2 + " 000";
                    } else {
                        return m2 + " 000 " + m3 + "00";
                    }
                } else {
                    return m3 + "00";
                }
            } else {
                if (m5 == "0") {
                    return m4 + " 000";
                } else {
                    return m4 + " 000 " + m5 + "00";
                }
            }
        } 
    },
    {
        //concat x thousand, million etc.
        "re": new RegExp("(?:(\\b[1-9]\\d\\d\\b)(?:\\s|-)(?:and(?:\\s|-)){0,1}){0,1}(?:(\\b[1-9]\\d\\b)(?:\\s|-)){0,1}(?:([1-9])(?:\\s|-)){0,1}(\\b0{3,}\\b)", "g"),
        "cb": (m, m1, m2, m3, m4) => ((parseInt(m1 || 0) + parseInt(m2 || 0) + parseInt(m3 || 0)) * (parseInt("1" + m4))) || "1" + m4
    },
    {
        //add ... X million X thousand X hundred together
        "re": new RegExp("(?:(\\b\\d{34,36}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{31,33}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{28,30}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{25,27}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{22,24}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{19,21}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{16,18}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{13,15}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{10,12}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{7,9}\\b)(?:\\s|-){0,1}){0,1}(?:(\\b\\d{4,6}\\b)(?:\\s|-){0,1}){0,1}(\\b\\d{3}\\b){0,1}", "g"),
        "cb": (m, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12) => {
            var total = parseInt(m1 || 0) + parseInt(m2 || 0) + parseInt(m3 || 0) + parseInt(m4 || 0) + parseInt(m5 || 0) + parseInt(m6 || 0) + parseInt(m7 || 0) + parseInt(m8 || 0) + parseInt(m9 || 0) + parseInt(m10 || 0) + parseInt(m11 || 0) + parseInt(m12 || 0);
            if (total) {
                if (m.slice(-1) == " ") {
                    total += " ";
                }
                return total;
            } else {
                return m;
            }
        }
    },
    {
        //Add tens and ones together
        "re": new RegExp("(\\b\\d\\d\\b)(?:\\s|-)(\\b\\d\\b)", "g"),
        "cb": (m, m1, m2) => parseInt(m1 || 0 ) + parseInt(m2 || 0)
    },
    {
        //add together hundreds+ with ones/tens when joined with AND
        "re": new RegExp("(\\b\\d{3,}\\b)\\sand\\s(\\b\\d{1,2}\\b)", "g"),
        "cb": (m, m1, m2) => parseInt(m1 || 0 ) + parseInt(m2 || 0)
    },
    {
        //Convert decimals
        "re": new RegExp("(\\b\\d+\\b)\\spoint\\s((?:\\b\\d\\b(?:\\s)*)+)", "gi"),
        "cb": (m, m1, m2) => m.slice(-1) == " " ? `${m1}.${m2.replace(/\s/g, "")} ` : `${m1}.${m2.replace(/\s/g, "")}`
    },
    {
        //Convert "Zero"
        "re": new RegExp("\\bzero\\b", "gi"),
        "cb": (m) => "0"
    }
];

module.exports.wordToNumbers = wordToNumbers;