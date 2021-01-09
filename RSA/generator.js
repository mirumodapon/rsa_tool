const NodeRSA = require('node-rsa')
const fs = require('fs')

function generator(stdio) {
    const options = {};
    stdio.question('Please enter the bit length.(default: 512)\n', (ans) => {
        options.bitLength = (ans !== '') ? ans : '512';
        stdio.question('Please enter the encryption scheme.(default: pkcs1)\n', (ans) => {
            options.encryptionScheme = (ans !== '') ? ans : 'pkcs1';
            stdio.question('Please enter the output type.(default: pem)\n', (ans) => {
                options.outputType = (ans !== '') ? ans : 'pem';
                if (validator(options))
                    generatorRSA(options);
                else
                    process.exit(1);
            });
        });
    });
}
function validator({ bitLength, encryptionScheme, outputType }) {
    return true;
}
function generatorRSA({ bitLength, encryptionScheme, outputType }) {
    const key = new NodeRSA({ b: bitLength }, encryptionScheme);

    const privateKey = key.exportKey(`${encryptionScheme}-private-${outputType}`);
    const publicKey = key.exportKey(`${encryptionScheme}-public-${outputType}`);

    fs.writeFile(`./Key/public.${outputType}`, publicKey, (err) => {
        if (err) throw err;
        console.log('公鑰已儲存！');
        fs.writeFile(`./Key/private.${outputType}`, privateKey, (err) => {
            if (err) throw err;
            console.log('私鑰已儲存！');
            process.exit(0);
        });
    });


    return;
}

module.exports = generator;