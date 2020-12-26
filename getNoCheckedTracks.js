const getAllFilesFromDirectories = require('./getAllFilesFromDirectories');
const settigs = require('./settings.json');
const lastTrackChecked = require('./Cache/cache.json').lastTrackChecked;

function getNoCheckedTracks(){
    const allTracks = getAllFilesFromDirectories(settigs.directoryTracksSourse);
    return defineNoCheckedTracksPart(allTracks);
}

function defineNoCheckedTracksPart(allTracks){
    const indexTrack = allTracks.indexOf(lastTrackChecked);
    if ( indexTrack >= 0 ) {
        return allTracks.slice(indexTrack, allTracks.length - 1)
    } else {
        return allTracks;
    }
}

module.exports = getNoCheckedTracks;

//////////////////////////////////////
if (require.main === module) {
    test();
}

function test(){
    const noCheckedTracks = getNoCheckedTracks();
    const partTracks = noCheckedTracks.slice(20, 30);
    console.log ( "partTracks = ", partTracks );
}

