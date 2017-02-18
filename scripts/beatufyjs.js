/**
 *  递归调用jsbeautify美化源码
 */
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const paths = argv._;

function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}

function exists(path) {
    return fs.existsSync(path);
}


function beautify(file) {
    const command = `./node_modules/js-beautify/js/bin/js-beautify.js --config ../.jsbeautifyrc -P -E -j -a ${file} -r`;
    child_process.exec(command, (error, msg) => {
        console.info(msg.replace('\\n', ''));
    });
}

function read(beautifyPath) {
    for (let pathName of beautifyPath) {
        pathName = path.resolve(process.cwd(), pathName);
        if (isFile(pathName)) {
            beautify(pathName);
        } else {
            let files = fs.readdirSync(pathName);
            files = files.map((file)=>{
                return pathName + '/' + file;
            });
            read(files);
        }
    }
}

read(paths);
