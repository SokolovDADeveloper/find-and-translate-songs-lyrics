const translate = require('@vitalets/google-translate-api');

async function translateLyrics(text) {
    try {
        const result = await translate(text, {from: 'en', to: 'ru'});
        return result.text;
    } catch (e) {
        console.warn ( "translateLyrics error:\n", e );
        return false;
    }

}

module.exports = translateLyrics;

//////////////////////////////////////
if (require.main === module) {
    test();
}

async function test() {
    const getLyricsOrigin = require('./getLyricsOrigin');
    const trackID = "474722";
    const liricOrigin = await getLyricsOrigin(trackID);
    await translateLyrics(liricOrigin);
}