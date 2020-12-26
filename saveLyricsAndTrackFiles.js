const fs = require("fs");
const settigs = require('./settings.json');

function saveLyricsAndTrackFiles(fileName, liryc) {

    const targetDir = settigs.directoryTarget;
    const fullFileName = settigs.directoryTracksSourse + "\\" + fileName;

    fs.copyFileSync(fullFileName, `${targetDir}\\${fileName}`);

    fs.writeFile( targetDir + "\\" + _removeExtensionFile(fileName) + ".txt", liryc, (err) => {
        if (err) console.log(err);
    });

    function _removeExtensionFile(str){
        return str.substr(0, str.lastIndexOf('.')) || str;
    }
}

module.exports = saveLyricsAndTrackFiles;





