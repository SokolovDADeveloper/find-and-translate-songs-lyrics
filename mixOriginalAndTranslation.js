function mixOriginalAndTranslated(originalText, translatedText) {
    const originalTextArr = originalText.split('\n');
    const translatedTextArr = translatedText.split('\n');
    const mixedTextArr = [];

    for (let i = 0; i < originalTextArr.length; i++) {
        mixedTextArr.push(originalTextArr[i] + '\n');
        mixedTextArr.push(translatedTextArr[i] + '\n' || '');
    }

    return mixedTextArr.join('');
}

module.exports = mixOriginalAndTranslated;