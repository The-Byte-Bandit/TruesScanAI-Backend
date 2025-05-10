const Tesseract = require('tesseract.js');

async function extractText(imagePath) {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
        console.log(text.trim());
    return text.trim();
}

module.exports = { extractText };
