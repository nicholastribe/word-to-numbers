# Word to Numbers

Convert written numbers into digits.

Supports written integers or decimals between 0 to 999,999,999,999,999.

Additional language support [coming soon](./roadmap.md).

## Installation
```bash
npm install word-to-numbers
```
## Usage
```javascript
const wordToNum = require('word-to-numbers');


wordToNum("one"); // 1

wordToNum("three point one four one six"); // 3.1416

wordToNum("FIFTY-FIFTY"); // "50-50"

wordToNum("The answer is Forty-Two"); // "The answer is 42"

wordToNum("The odds are three thousand seven hundred and twenty to one!"); // "The odds are 3720 to 1!"

wordToNum("fifty trillion and three") // 50000000000003
```
