const Tesseract = require('tesseract.js');

async function extractText(imagePath) {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    return text.trim();
}

module.exports = { extractText };
