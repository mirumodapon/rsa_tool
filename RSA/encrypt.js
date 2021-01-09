const NodeRSA = require('node-rsa')
const fs = require('fs');

function encrypt(stdio) {
    const options = {};
    stdio.question('Please enter the data.\n', (ans) => {
        options.data = (ans !== '') ? ans : '';
        stdio.question('Please enter the encoding method.(default: base64)\n', (ans) => {
            options.encoding = (ans !== '') ? ans : 'base64';
            stdio.question('Please enter the filename.(default: public.pem)\n', (ans) => {
                options.path = (ans !== '') ? ans : 'public.pem';
                if (validator(options))
                    encryptRSA(options);
                else
                    process.exit(1);
            });
        });
    });
}
function validator({ data, path, encoding }) {
    return true;
}
function encryptRSA({ data, path, encoding }) {
    fs.readFile(`./Key/${path}`, function (err, _key) {
        var key = new NodeRSA(_key);
        let ouptut = key.encrypt(data, encoding);
        console.log(ouptut);
        process.exit(0);
    });
}

module.exports = encrypt;