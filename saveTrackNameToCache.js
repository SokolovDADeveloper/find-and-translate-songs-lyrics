const fs = require("fs");
const {cacheFilePath} = require('./settings')

function saveTrackNameToCache(TrackName) {

    const data = {
        lastTrackChecked: TrackName
    };

    fs.writeFile(cacheFilePath, JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
        }
     })
}

module.exports = saveTrackNameToCache;