const assert = require('assert');
const wordToNum = require('../wordToNumbers');
const numbers = require('../lib/numbers.json');

function c(i, t, a) {
    var o = wordToNum(i);
    var r;
    if (a) {
        r = typeof o == t && RegExp(a.re, "g").test(o);
        console.log(`-----------------------------\nTEST: Checking that "${i}" returns a ${t} and ${a.des}\nOUTPUT: ${o}\nRESULT: ${r}\n-----------------------------`);
    } else {
        r = typeof o == t;
        console.log(`-----------------------------\nTEST: Checking that "${i}" returns a ${t}\nOUTPUT: ${o}\nRESULT: ${r}\n-----------------------------`);
    }
    return r;
}

Object.keys(numbers).forEach(n => {
    assert.ok(c(n, "number"));
    assert.ok(c(`${n} is a number`, "string", {re: '\\d', des: `contains a number`}));
    assert.ok(c(`${n} point one four one five`, "number"));
})