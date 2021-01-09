const NodeRSA = require('node-rsa')
const fs = require('fs');

function decrypt(stdio) {
    const options = {};
    stdio.question('Please enter the data.\n', (ans) => {
        options.data = (ans !== '') ? ans : '';
        stdio.question('Please enter the encoding method.(default: utf-8)\n', (ans) => {
            options.encoding = (ans !== '') ? ans : 'utf-8';
            stdio.question('Please enter the filename.(default: private.pem)\n', (ans) => {
                options.path = (ans !== '') ? ans : 'private.pem';
                if (validator(options))
                    decryptRSA(options);
                else
                    process.exit(1);
            });
        });
    });
}
function validator({ data, path, encoding }) {
    return true;
}
function decryptRSA({ data, path, encoding }) {
    fs.readFile(`./Key/${path}`, function (err, _key) {
        var key = new NodeRSA(_key);
        let output = key.decrypt(data, encoding);
        console.log(output);
        process.exit(0);
    });
}

module.exports = decrypt;