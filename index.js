const readline = require('readline');

const stdio = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const GENERATOR = 'A';
const ENCRYPT = 'B';
const DECRYPT = 'C';

console.log('A: generator rsa key');
console.log('B: encrypt');
console.log('C: decrypt');
stdio.question(
    'Choose a option...\n',
    (ans) => {
        switch (ans) {
            case GENERATOR:
                require('./RSA/generator')(stdio);
                break;
            case ENCRYPT:
                require('./RSA/encrypt')(stdio);
                break;
            case DECRYPT:
                require('./RSA/decrypt')(stdio);
                break;
            default:
                console.log('Can not find the option.');
                process.exit(1);
        }
    }
);