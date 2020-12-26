const cheerio = require('cheerio');
const axios = require('axios');

async function getTrackID(fileName) {

    const correctNameTrack = trackNameMutationForSearch(fileName);

    ///console.log ( "correctNameTrack = ", correctNameTrack );

    const data = await findTrackOnYandexMusic(correctNameTrack);

    if(!data) return;

    const resultSearch = await parseData(data);

    ///console.log ( "resultSearch = ", resultSearch );

    if(resultSearch) {
        const isExactResult = compareResultSearch(resultSearch.trackName, correctNameTrack);

        if(isExactResult) {
            const trackID = getTrackIDFromHref(resultSearch.href);
            ///console.log ( "trackID = ", trackID );
            return trackID;
        }

    }

    return false;
}

function trackNameMutationForSearch(trackName) {

    var newTrackName = _removeExtensionFile(trackName);
    newTrackName = _removeSeparator(newTrackName);
    return newTrackName.toUpperCase();

    function _removeExtensionFile(str){
        return str.substr(0, str.lastIndexOf('.')) || str;
    }

    function _removeSeparator(str){
        return str.replace(" - ", " ");
    }
}

async function findTrackOnYandexMusic(trackName) {
    const query = createQuery(trackName);
    try {
        const response = await axios.get(query, {timeout : 2000});
        if(response.data === undefined) {
            console.warn ( "Query " + query + "return: " + response );
            return false;
        } else {
            return response.data;
        }

        } catch (error) {
        console.warn ( error );
    }


    function createQuery(trackName) {
        const trackNameForQuery = encodeURIComponent(trackName).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
        const query = `https://music.yandex.ru/search?text=${trackNameForQuery}&type=tracks`;
        return query;
    }
}

async function parseData(html) {
    const $ = cheerio.load(html);
    const tracks = $('.d-track__overflowable-wrapper');
    const firstTrack = tracks[0];
    const a = $('.d-track__name > a', firstTrack);
    const href = a.attr( 'href' ) || '';
    const onlyTrackName = a.text().toUpperCase() || '';
    const artistName = $(".d-track__artists", firstTrack).text().toUpperCase() || '';
    const trackName = `${artistName} ${onlyTrackName}`;

    if(href && trackName) {
        return {
            href,
            trackName
        }
    } else {
        return false;
    }

}

function compareResultSearch(findedTrackName, correctNameTrack) {
    const words_findedTrackName = findedTrackName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, "").split(" ");

    return words_findedTrackName.every(word_finded => {
        return correctNameTrack.includes(word_finded);
    });

}

function getTrackIDFromHref(href) {
    return href.split('/').pop();
}

module.exports = getTrackID;

//////////////////////////////////////
if (require.main === module) {
    test();
}

async function test(){
    const tracksForTest = ["Madonna Кку-Ку", "Argus, Ascent - Whisper.mp3", "Amy Lee - Lockdown (feat. Dave Eggar).mp3"];

    for (const track of tracksForTest) {

        const correctNameTrack = trackNameMutationForSearch(track);

        ///console.log ( "correctNameTrack = ", correctNameTrack );

        const res = await findTrackOnYandexMusic(correctNameTrack);

        const resultSearch = await parseData(res.data);

        ///console.log ( "resultSearch = ", resultSearch );

        if(resultSearch) {
            const isExactResult = compareResultSearch(resultSearch.trackName, correctNameTrack);

            if(isExactResult) {
                const trackID = getTrackIDFromHref(resultSearch.href);
                ///console.log ( "trackID = ", trackID );
            }

        }

    }




}