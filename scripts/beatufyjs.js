/**
 *  递归调用jsbeautify美化源码
 */
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

for (let arg of process.argv.splice(2)) {
    let pathName = path.join(process.cwd(), arg);
    const command = `./node_modules/js-beautify/js/bin/js-beautify.js --config ../.jsbeautifyrc -P -E -j -a ${pathName} -r`;
    if (isFile(path.join(process.cwd(), arg))) {
        child_process.exec(command, function(error, msg) {
            console.log(msg.replace('\\\\n', ''));
        });
    } else {
        read_dir(pathName);
    }
}

function read_dir(dir) {
    let files = fs.readdirSync(dir);
    for (let file of files) {
        let pathName = path.join(dir, file);
        if (isFile(pathName)) {
            const command = `./node_modules/js-beautify/js/bin/js-beautify.js --config ../.jsbeautifyrc -P -E -j -a ${pathName} -r`;
            child_process.exec(command, function(error, msg) {
                console.log(msg.replace('\\\\n', ''));
            });
        } else {
            read_dir(pathName);
        }
    }
}

function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}

function exists(path) {
    return fs.existsSync(path) || path.existsSync(path);
}
