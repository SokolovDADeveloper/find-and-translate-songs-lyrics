const axios = require('axios');
const settings = require('./settings.json');
const BASE_URI = "https://music.yandex.ru/handlers/track.jsx?track=";

async function getLyricsOrigin(trackID) {
    try {
        const {data} = await axios.get(`${BASE_URI}${trackID}`);
        if(data && data.lyric && data.lyric[0] && data.lyric[0].fullLyrics) {

            return isLyricsOriginLanguageMatchSettings(data) ? data.lyric[0].fullLyrics : false;

        } else {
            return false;
        }
    }
    catch (e) {
        console.warn ( e );
    }
}

function isLyricsOriginLanguageMatchSettings (data) {
    if ( data.lyric[0].textLanguage && data.lyric[0].textLanguage === settings.liricOriginLanguage ) {
        return true;
    }
}

module.exports = getLyricsOrigin;

//////////////////////////////////////
if (require.main === module) {
    test("474722"); // yes lyryc
    ///test("33631595");
    ///test("33630577"); /// lyric false
    ///test("1596556"); // lyric france
}

async function test(trackID) {
    const lyricsOriginOrigin = await getLyricsOrigin(trackID);
    console.log ( "lyricsOriginOrigin: \n", lyricsOriginOrigin );
}