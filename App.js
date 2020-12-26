const getTrackIDFromYandexMusic = require('./getTrackIDFromYandexMusic');
const getLyricsOrigin = require('./getLyricsOrigin');
const translateLyrics = require('./translateLyrics');
const getNoCheckedTracks = require('./getNoCheckedTracks');
const mixOriginalAndTranslated = require('./mixOriginalAndTranslation');
const saveLyricsAndTrackFiles = require('./saveLyricsAndTrackFiles');
const saveTrackNameToCache = require('./saveTrackNameToCache');

const tracks = getNoCheckedTracks();

function* getTrack(tracks) {
    yield* tracks;
}

var track = getTrack(tracks);

var timeoutID  = setInterval( () => {
    const Track = track.next();
    ///console.log ( "Track = ", Track );
    findLyricsOnYandexMusic(Track).catch(err => console.error(err));
} , 5000);

async function findLyricsOnYandexMusic(Track) {

    if(Track.done === true) {
        clearTimeout(timeoutID);
        return;
    }

    const trackName = Track.value.split('\\').pop();
    const trackID = await getTrackIDFromYandexMusic(trackName);
    if (!trackID) {
        console.warn ( "Not find trackID for trackName ", trackName );
        return;
    }
    const liricOrigin = await getLyricsOrigin(trackID);
    if (liricOrigin) {
        const translatedLirycs = await translateLyrics(liricOrigin);
        if (translatedLirycs) {
            const mixedLyric = mixOriginalAndTranslated(liricOrigin, translatedLirycs);
            saveLyricsAndTrackFiles(trackName, mixedLyric);
            saveTrackNameToCache(Track.value);
            console.log ( "saved ", trackName );
        }

    }

}
