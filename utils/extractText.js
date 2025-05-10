const Tesseract = require('tesseract.js');

async function extractTextFromImage(imagePath) {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    console.log(text.trim());
    
    return text.trim();
}

module.exports = { extractTextFromImage };
