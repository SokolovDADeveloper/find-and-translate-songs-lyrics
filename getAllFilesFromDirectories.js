const fs = require('fs');

function getExistDirectories (dirs) {
    const existDirs = dirs.map(_checkExistDirectorySync).filter(Boolean);
    return existDirs;

    function _checkExistDirectorySync(dirPath) {
        try {
            fs.statSync(dirPath);
        } catch(e) {
            console.warn ( `Directory "${dirPath}" not found!` );
            return;
        }

        return dirPath;
    }
};

function isFile (fileName) {
    return fs.lstatSync(fileName).isFile()
};

function getAllFilesFromDir (dirPath) {
    const files = fs.readdirSync(dirPath).map(fileName => {
     return `${dirPath}\\${fileName}`}).filter(isFile);
    return files;
};

module.exports = function getAllFilesFromDirectories(directoriesPaths){

    const existDirs = getExistDirectories(directoriesPaths);

    return existDirs.reduce((acc, dirPath) => {
        return acc.concat( getAllFilesFromDir(dirPath))
    },[]);
}


//////////////////////////////////////////////////
if (require.main === module) {
    test();
}

function test(){
    const existDirs = getExistDirectories(directoriesPaths);
    const allFilesFromDir = existDirs.reduce((acc, dirPath) => {
        return acc.concat( getAllFilesFromDir(dirPath))
    },[]);
    console.log ( "allFilesFromDir: ", allFilesFromDir);
}

